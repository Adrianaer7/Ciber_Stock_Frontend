import { useState, useContext, useEffect } from "react"
import Rubro from "./Rubro"
import Proveedor from "./Proveedor"
import { hoy } from "../../helpers"
import productoContext from "../../context/productos/productoContext"
import authContext from "../../context/auth/authContext"
import Swal from "sweetalert2"

const Formulario = ({productoEditar}) => {

  
    const AuthContext = useContext(authContext)
    const {usuario} = AuthContext

    const productosContext = useContext(productoContext)
    const { 
        productoSeleccionado, 
        productos, 
        agregarProducto, 
        agregarRubro, 
        agregarProveedor, 
        editarProducto, 
        mensajeCodigo, 
        mensajeRubro, 
        mensajeProveedor, 
        traerProductos, 
        traerRubros, 
        rubros, 
        proveedores, 
        traerProveedores, 
        valorDeVenta, 
        limpiarPrecioVenta, 
        precioVenta,
        traerDolarAPI, 
        traerDolarBD,
    } = productosContext
   
    const [valoresR, setValoresR] = useState("")    //contiene lo que voy escribiendo en rubro
    const [valoresP, setValoresP] = useState("")    //contiene lo que voy escribiendo en proveedor
    const [escribiendoR, setEscribiendoR] = useState(false)   //cuando escribo pasa a true
    const [escribiendoP, setEscribiendoP] = useState(false)   //cuando escribo pasa a true
    const [rubroSelect, setRubroSelect] = useState(productoEditar ? productoEditar.rubro : "")
    const [proveedorSelect, setProveedorSelect] = useState(productoEditar ? productoEditar.proveedor : "")
    const [valorFaltante, setValorFaltante] = useState(productoEditar ? productoEditar.añadirFaltante : false)
    const [msj, setMsj] = useState({
        nombre: "",
        codigo: "",
        valor_dolar_compra: "",
        precio_compra_dolar: "",
        precio_compra_peso: "",
        rentabilidad: "",
        dosPrecios: "",
        precio_venta: "",
        disponibles: "",
        valor_dolar_compra: "",
        limiteFaltante: "",
    })
    const [producto, setProducto] = useState({
        nombre: productoEditar?.nombre ?? "",
        modelo: productoEditar?.modelo ?? "",
        marca: productoEditar?.marca ?? "",
        codigo: productoEditar?.codigo ?? "",
        rubro: productoEditar?.rubro ?? "",
        valor_dolar_compra: productoEditar?.valor_dolar_compra ?? "",
        precio_venta: productoEditar?.precio_venta ?? "",
        precio_compra_dolar: productoEditar?.precio_compra_dolar ?? "",
        precio_compra_peso: productoEditar?.precio_compra_peso ?? "",
        fecha_compra: productoEditar?.fecha_compra ?? hoy,
        proveedor: productoEditar?.proveedor ?? "",
        disponibles: productoEditar?.disponibles ?? "",
        rentabilidad: productoEditar?.rentabilidad ?? "",
        notas: productoEditar?.notas ?? "",
        faltante: productoEditar?.faltante ?? false,
        limiteFaltante: productoEditar?.limiteFaltante ?? "",
        añadirFaltante: productoEditar?.añadirFaltante ?? false
    })
    const {nombre, marca, modelo, codigo, rubro, precio_venta, precio_compra_dolar, fecha_compra, precio_compra_peso, valor_dolar_compra, proveedor, disponibles, rentabilidad, notas, limiteFaltante, añadirFaltante} = producto
    
    //hago un get a todos los productos, a la API de dolar y a la bd de dolar
    useEffect(() => {
        if(usuario) {
            traerProductos()
            traerDolarBD()
            traerDolarAPI()
        }
    }, [usuario])

   
    //hago get a los rubros y proveedores cuando se agregue o cambie la lista de todos los productos
    useEffect(() => {
        if(usuario) {
            traerRubros()
            traerProveedores()
        }
    },[usuario])

    //cada vez que cambie el producto seleccionado me vacia el input de precio sugerido
    useEffect(() => {
        limpiarPrecioVenta()
    }, [productoSeleccionado])
    
    //se fija si en el state de filtrando hay algo, es porque se está escribiendo
    useEffect(() => {
        if(valoresR) {
            setEscribiendoR(true)
        } else {
            setEscribiendoR(false)
        }
    }, [valoresR])

    useEffect(() => {
        if(valoresP) {
            setEscribiendoP(true)
        } else {
            setEscribiendoP(false)
        }
    }, [valoresP])

    //cada vez que escriba en los inputs se realiza el calculo aprox para el precio de la venta
    useEffect(() => {
        precioVenta(precio_compra_dolar, valor_dolar_compra, rentabilidad, precio_compra_peso)
    }, [producto])

    const onChange = e => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value,
        })
    }
    
    //Al escribir, escribiendo pasa a true, se vacia el select y se deshabilita. 
    //Envio lo que escribo al state de valores, y lo que está en valores lo envio al state de producto. Al hacer submit vacio el state de valores, entonces el input queda vacio
    const onChangeRubroInput = e => {
        setValoresR(e.target.value.toUpperCase())
    }
    if(valoresR) {
        producto.rubro = valoresR
    }
    //Si no estoy escribiendo, el select está habilitado y su valor por default es vacio. 
    //Como es vacio, muestra el primer option disponible. El primer option no tiene value. 
    //Si existen rubros creados los muestra como options. 
    //Si selecciono un option, el onchange envia el option seleccionado al state de rubroSelect, el input se deshabilita vacia y deshabilita el input. 
    //Al hacer submit, envio el dato del state rubroSelect a el state producto y vacío rubroSelect. 
    //Luego de crear el producto el value del select consulta si estoy escribiendo, como no escribo, toma el valor de rubroSelect, como está vacío, muestra el primer option.
    const onChangeRubroSelect = e => {
        setRubroSelect(e.target.value)
    }
    //vacío el input si el select tiene algo
    if(rubroSelect) {
        producto.rubro = ""
    }

    const onChangeProveedorInput = e => {
        setValoresP(e.target.value.toUpperCase())
    }
    if(valoresP) {
       producto.proveedor = valoresP
    }

    const onChangeProveedorSelect = e => {
        setProveedorSelect(e.target.value)
    }
    if(proveedorSelect) {
        producto.proveedor = ""
    }

    if(valorFaltante) {
        producto.añadirFaltante = true
    } else {
        producto.añadirFaltante = false
    }

    const alertaNuevoCorrecto = () => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El producto se guardó correctamente.',
            showConfirmButton: false,
            timer: 1500
        })
    }
    const alertaEditarCorrecto = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'El producto se modificó correctamente.',
            showConfirmButton: false,
            timer: 1500
        })
    }

    //! ENVIAR FORMULARIO
    const onSubmit = e => {
        e.preventDefault()
        //Validar nombre
        if(nombre === ""){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                html: 'El <b>nombre</b> es obligatorio.',
              })
            return
        }
        //valido codigo
        if(isNaN(codigo)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                html: 'El <b>código</b> debe ser un número.',
              })
            return
        }
        if(!codigo) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                html: 'El <b>código</b> es obligatorio.',
              })
            return
        }
        if (codigo.toString().length !== 3) {   //lo convierto a string para calcular su tamaño
            Swal.fire({
                icon: 'error',
                title: 'Error',
                html: 'El <b>código</b> debe ser de 3 dígitos.',
              })
            return
        }
        const codigoCambiado = parseInt(codigo)
        if(Number.isInteger(codigoCambiado)) {
            console.log(typeof codigoCambiado, typeof codigo)
            return
        }
        //Validar precio del dolar
        if(!valor_dolar_compra) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                html: 'El <b>precio del dolar</b> es obligatorio.',
              })
            return
        } else {
            if(isNaN(valor_dolar_compra) || valor_dolar_compra < 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    html: 'El <b>precio del dolar</b> debe ser un número mayor a 0.',
                  })
                return
            }
        }
        
        //validar valor compra dolar
        if(isNaN(precio_compra_dolar) || precio_compra_dolar < 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                html: 'El <b>precio de compra en USD</b> debe ser mayor a 0.',
              })
            return
        }
        //validar valor compra peso
        if(isNaN(precio_compra_peso) || precio_compra_peso < 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                html: 'El <b>precio de compra en ARS</b> debe ser mayor a 0',
              })
            return
        }
        //validar rentabilidad
        if(isNaN(rentabilidad) || rentabilidad < 0 || rentabilidad > 100) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                html: 'La <b>rentabilidad</b> tiene que ser entre 0 y 100',
              })
            return
        }  
        //validar los 2 input juntos del precio
        if(precio_compra_dolar && precio_compra_peso) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ingrese un tipo de moneda a la vez',
              })
            return
        }
        //Validar el precio de venta
        if(isNaN(precio_venta) || precio_venta < 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                html: 'El <b>precio de venta</b> debe ser mayor a 0.',
              })
            return
        }
        //Validar stock
        if(isNaN(disponibles) || disponibles < 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                html: 'La <b>disponibilidad</b> debe ser mayor a 0.',
              })
            return
        }

        if(isNaN(limiteFaltante) || limiteFaltante < 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                html: 'Los <b>faltantes</b> deben ser mayor a 0.',
              })
            return
        } 
        
        
        //si seleccione el rubro, lo mando al state
        if(rubroSelect) {
            producto.rubro = rubroSelect
        }
        if(proveedorSelect) {
            producto.proveedor = proveedorSelect
        }
        //si el input de rubro tiene algo, envio el rubro
        if(valoresR) {  
            agregarRubro(rubro)
        }
        //si el input de proveedores tiene algo, envio el proveedor
        if(valoresP) {  
            agregarProveedor(proveedor)
        }

        
        //si es nuevo producto
        if(!productoEditar) {
            agregarProducto(producto)   

            setRubroSelect("")
            setProveedorSelect("")
            setProducto({
                nombre: "",
                marca: "", 
                modelo: "", 
                codigo: "", 
                rubro: "", 
                precio_venta: "", 
                precio_compra_dolar: "", 
                fecha_compra: hoy, 
                precio_compra_peso: "", 
                valor_dolar_compra: "", 
                proveedor: "", 
                disponibles: "", 
                rentabilidad: "", 
                notas: "",
                faltante: false,
                limiteFaltante: "",
                añadirFaltante: false
                })
            setValoresR("")
            setValoresP("")
            alertaNuevoCorrecto()
        } else {
            //si hay que editar
            producto._id = productoEditar._id
            editarProducto(producto)
            alertaEditarCorrecto()
        }

    }


    return (
        <>
            
            <h1 className={`${productoEditar ? "text-green-600 dark:text-green-700" : "text-blue-900"} font-black text-4xl  dark:text-blue-300 text-center`}>{productoEditar ? "Editar Producto": "Agregar Producto"}</h1>
            <p className="mt-3 text-center text-black dark:text-gray-50">Llena los siguientes campos para {productoEditar ? "Editar" : "Agregar"} Un producto</p>
            <div className='bg-white dark:bg-gray-900 mt-10 px-5 py-10 rounded-md shadow-md xl:w-auto 2xl:w-11/12 mx-auto  '>
                <h1 className='text-gray-600 dark:text-white font-bold text-xl uppercase text-center'></h1>
                
                <form 
                    className="mt-10"
                    onSubmit={onSubmit}
                >
                    <div className="grid  md:grid-cols-1 lg:grid-cols-2 lg:gap-4 ">

                        <div className="mb-4">
                            <div className="flex justify-between">
                                <label htmlFor="nombre" className="text-gray-800 dark:text-gray-300 font-bold font ">Nombre *</label>
                                {msj.nombre && <p className="text-xs my-auto bg-red-700 rounded-lg uppercase text-white pl-2 pr-2">{msj.nombre}</p>}
                            </div>
                            <input
                                type="text"
                                autoComplete="off"
                                className="mt-2 uppercase block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="nombre"
                                placeholder="Ej. Pendrive 8Gb 3.0"
                                name="nombre"
                                value={nombre}
                                onChange={onChange}
                            />
                            
                        </div>
                        <div className="mb-4">
                            <label htmlFor="marca" className="text-gray-800 dark:text-gray-300 font-bold font ">Marca</label>
                            <input
                                type="text"
                                autoComplete="off"
                                className="mt-2 uppercase block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="marca"
                                placeholder="Ej. Kingston"
                                name="marca"
                                value={marca}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="modelo" className="text-gray-800 dark:text-gray-300 font-bold ">Modelo</label>
                            <input
                                type="text"
                                autoComplete="off"
                                className="mt-2 uppercase block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="modelo"
                                placeholder="DTKN/64GB"
                                name="modelo"
                                value={modelo}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between">
                                <label htmlFor="codigo" className="text-gray-800 dark:text-gray-300 font-bold">Código *</label>
                                {msj.codigo && <p className="text-xs my-auto bg-red-700 rounded-lg uppercase text-white pl-2 pr-2">{msj.codigo}</p>}
                                {mensajeCodigo && <p className="text-xs my-auto bg-red-700 rounded-lg uppercase text-white pl-2 pr-2">{mensajeCodigo}</p>}

                            </div>
                            <input  
                                type="text"
                                autoComplete="off"
                                className=" mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="codigo"
                                placeholder="123"
                                name="codigo"
                                value={codigo}
                                onChange={onChange}
                            />
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between">
                                <label htmlFor="rubro" className="text-gray-800 dark:text-gray-300 font-bold ">Rubro</label>
                                {mensajeRubro && <p className="text-xs my-auto bg-red-700 rounded-lg uppercase text-white pl-2 pr-2">{mensajeRubro}</p>}
                            </div>
                            <div className="flex">
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className={`${rubroSelect && "hover:cursor-not-allowed"} mt-2  block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300`}
                                    id="rubro"
                                    placeholder="Cables"
                                    name="rubro"
                                    value={valoresR}
                                    disabled={rubroSelect && true}
                                    onChange={onChangeRubroInput}
                                />
                                <select  onChange={onChangeRubroSelect} value={escribiendoR ? "" : rubroSelect} disabled={escribiendoR && true} className="uppercase text-center mt-2 ml-4 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300">
                                    <option value="" className="uppercase"> rubros</option>
                                    {Object.keys(rubros).length > 0  && (
                                        <>
                                            {rubros.map((rubro, i) => (
                                                <Rubro
                                                    key={i}
                                                    rubro={rubro}
                                                />
                                            ))}
                                        </>
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between">
                                <label htmlFor="proveedor" className="text-gray-800 dark:text-gray-300 font-bold ">Proveedor</label>
                                {mensajeProveedor && <p className="text-xs my-auto bg-red-700 rounded-lg uppercase text-white pl-2 pr-2">{mensajeProveedor}</p>}
                            </div>
                            <div className="flex">
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className={`${proveedorSelect && "hover:cursor-not-allowed"} mt-2  block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300`}
                                    id="proveedor"
                                    placeholder="MercadoLibre"
                                    name="proveedor"
                                    value={valoresP}
                                    disabled={proveedorSelect && true}
                                    onChange={onChangeProveedorInput}
                                />
                                <select  onChange={onChangeProveedorSelect} value={escribiendoP ? "" : proveedorSelect} disabled={escribiendoP && true} className="uppercase text-center mt-2 ml-4 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300">
                                    <option value="" className="uppercase"> proveedores</option>
                                    {Object.keys(proveedores).length > 0  ? (
                                        <>
                                            {proveedores.map((proveedor, i) => (
                                                <Proveedor
                                                    key={i}
                                                    proveedor={proveedor}
                                                />
                                            ))}
                                        </>
                                    ) : null}
                                </select>
                            </div>
                        </div>     

                        <div className="mb-4">
                            <div className="flex justify-between">
                                <label htmlFor="valor_dolar_compra" className="text-gray-800 dark:text-gray-300 font-bold font ">Precio dolar *</label>
                                {msj.valor_dolar_compra && <p className="text-xs my-auto bg-red-700 rounded-lg uppercase text-white pl-2 pr-2">{msj.valor_dolar_compra}</p>}
                            </div>
                            <input
                                type="text"
                                step="any"
                                autoComplete="off"
                                className="mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="valor_dolar_compra"
                                placeholder="$112"
                                name="valor_dolar_compra"
                                value={valor_dolar_compra}
                                onChange={onChange}
                            />
                        </div>                 
                        <div className="mb-4">
                            <div className="flex justify-between">
                                <label htmlFor="precio_compra_dolar" className="text-gray-800 dark:text-gray-300 font-bold font ">Precio compra en USD</label>
                                {msj.precio_compra_dolar && <p className="text-xs my-auto bg-red-700 rounded-lg uppercase text-white pl-2 pr-2">{msj.precio_compra_dolar}</p>}
                            </div>                            
                            <input
                                type="text"
                                autoComplete="off"
                                className="mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="precio_compra_dolar"
                                placeholder="$28,84"
                                name="precio_compra_dolar"
                                value={precio_compra_dolar}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between">
                                <label htmlFor="precio_compra_peso" className="text-gray-800 dark:text-gray-300 font-bold font ">Precio compra en AR$</label>
                                {msj.precio_compra_peso && <p className="text-xs my-auto bg-red-700 rounded-lg uppercase text-white pl-2 pr-2">{msj.precio_compra_peso}</p>}
                                {msj.dosPrecios && <p className="text-xs my-auto bg-red-700 rounded-lg uppercase text-white pl-2 pr-2">{msj.dosPrecios}</p>}
                            </div>                          
                            <input
                                type="text"
                                autoComplete="off"
                                className="mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="precio_compra_peso"
                                placeholder="$1250"
                                name="precio_compra_peso"
                                value={precio_compra_peso}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between">
                                <label htmlFor="rentabilidad" className="text-gray-800 dark:text-gray-300 font-bold font ">Rentabilidad</label>
                                {msj.rentabilidad && <p className="text-xs my-auto bg-red-700 rounded-lg uppercase text-white pl-2 pr-2">{msj.rentabilidad}</p>}
                            </div>                            
                            <input
                                type="text"
                                autoComplete="off"
                                className="mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="rentabilidad"
                                placeholder="40%"
                                name="rentabilidad"
                                value={rentabilidad}
                                onChange={onChange}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="mb-4">
                                <div className="flex justify-between">
                                    <label htmlFor="precio_venta" className="text-gray-800  dark:text-gray-300 font-bold  ">Precio de venta</label>
                                    {msj.precio_venta && <p className="text-xs my-auto bg-red-700 rounded-lg uppercase text-white pl-2 pr-2">{msj.precio_venta}</p>}
                                </div>                                 
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className="mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                    id="precio_venta"
                                    placeholder="$ 10.000"
                                    name="precio_venta"
                                    value={precio_venta}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="mb-4 justify-items-end">
                                <label htmlFor="valorDeVenta" className="text-gray-800 dark:text-gray-300 font-bold text-right block ">Sugerido</label>
                                    <input
                                        type="text"
                                        autoComplete="nope"
                                        className="mt-2 block w-full p-3 pr-0 hover:cursor-pointer text-right justify-end rounded-md font-bold text-red-600 bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                        id="valorDeVenta"
                                        name="valorDeVenta"
                                        defaultValue={valorDeVenta}
                                        readOnly={true}
                                        onClick={() => navigator.clipboard.writeText(`${valorDeVenta}`)}  //al tocar copiar enlace se crea un portapapeles con el link
                                    />                                
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="fecha_compra" className="text-gray-800 dark:text-gray-300 font-bold ">Fecha de compra</label>
                            <input
                                type="date"
                                autoComplete="off"
                                className="mt-2 block w-full p-3 appearance-none rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="fecha_compra"
                                placeholder="fecha_compra"
                                name="fecha_compra"
                                value={fecha_compra}
                                onChange={onChange}
                            />
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between">
                                <label htmlFor="disponibles" className="text-gray-800  dark:text-gray-300 font-bold  ">Disponibles</label>
                                {msj.disponibles && <p className="text-xs my-auto bg-red-700 rounded-lg uppercase text-white pl-2 pr-2">{msj.disponibles}</p>}
                            </div>                             
                            <input
                                type="text"
                                autoComplete="off"
                                className="mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="disponibles"
                                placeholder="4 UNIDADES"
                                name="disponibles"
                                value={disponibles}
                                onChange={onChange}
                            />
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between">
                                <label htmlFor="limiteFaltante" className="text-gray-800  dark:text-gray-300 font-bold  ">Añadir como faltante cuanto llegue a: </label>
                                {msj.limiteFaltante && <p className="text-xs my-auto bg-red-700 rounded-lg uppercase text-white pl-2 pr-2">{msj.limiteFaltante}</p>}
                            </div>  
                            <div className="flex gap-4">          
                                <input
                                    type="button"
                                    className={`w-2/4 rounded-md mt-2 block p-3 ${valorFaltante ? "bg-blue-200" : "bg-gray-400 "}`}
                                    onClick={() => setValorFaltante(!valorFaltante)}
                                    value={valorFaltante ? "Si"  : "No"}
                                >
                                </input>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className={` ${!valorFaltante && "hover:cursor-not-allowed"} mt-2 block w-full p-3 text-right rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300`}
                                    id="limiteFalante"
                                    placeholder="2 UNIDADES"
                                    name="limiteFaltante"
                                    value={limiteFaltante}
                                    onChange={onChange}
                                    disabled={!valorFaltante}
                                />
                            </div>                                    
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="notas" className="text-gray-800 dark:text-gray-300 font-bold ">Notas</label>
                        <textarea
                            className=" mt-2 block w-full h-48 p-3 rounded-md  bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                            id="notas"
                            placeholder="Ingresa tu notas"
                            name="notas"
                            value={notas}
                            onChange={onChange}
                        />
                    </div>
                    <input
                        type="submit"
                        value={productoEditar ? "Editar producto" : "Agregar producto"}
                        className={`${productoEditar ? "bg-green-600 dark:bg-green-800" : "bg-blue-800  dark:bg-blue-500"} mt-5 w-full  p-3 text-white uppercase font-bold text-lg rounded-md cursor-pointer`}
                    />
                </form>
            </div>
        </>
    )
}

export default Formulario

