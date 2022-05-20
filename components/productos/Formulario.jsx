import { useState, useContext, useEffect } from "react"
import Rubro from "./Rubro"
import Proveedor from "./Proveedor"
import { hoy } from "../../helpers"
import productoContext from "../../context/productos/productoContext"
import authContext from "../../context/auth/authContext"
import Swal from "sweetalert2"
import compraContext from "../../context/historial/compras/compraContext"

const Formulario = ({productoEditar}) => {

    const AuthContext = useContext(authContext)
    const {modo, usuario} = AuthContext

    const CompraContext = useContext(compraContext)
    const {compras, compraDeProducto, traerCompras} = CompraContext

    const productosContext = useContext(productoContext)
    const { 
        productos,
        productoSeleccionado, 
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
    const [cantidadCompra, setCantidadCompra] = useState("")

    const [producto, setProducto] = useState({
        nombre: productoEditar?.nombre ?? "",
        modelo: productoEditar?.modelo ?? "",
        marca: productoEditar?.marca ?? "",
        codigo: productoEditar?.codigo ?? "",
        barras: productoEditar?.barras ?? "",
        valor_dolar_compra: productoEditar?.valor_dolar_compra ?? "",
        precio_venta: productoEditar?.precio_venta ?? "",
        precio_compra_dolar: productoEditar?.precio_compra_dolar ?? "",
        precio_compra_peso: productoEditar?.precio_compra_peso ?? "",
        rubro: productoEditar?.rubro ?? "",
        proveedor: productoEditar?.proveedor ?? "",
        fecha_compra: productoEditar?.fecha_compra ?? hoy ?? "",
        disponibles: productoEditar?.disponibles ?? "",
        rentabilidad: productoEditar?.rentabilidad ?? "",
        notas: productoEditar?.notas ?? "",
        faltante: productoEditar?.faltante ?? false,
        limiteFaltante: productoEditar?.limiteFaltante ?? "",
        añadirFaltante: productoEditar?.añadirFaltante ?? false
    })
    const {nombre, marca, modelo, codigo, barras, rubro, precio_venta, precio_compra_dolar, fecha_compra, precio_compra_peso, valor_dolar_compra, proveedor, disponibles, rentabilidad, notas, limiteFaltante} = producto
    
    //estos 3 useEffect validan desde la bd por si falla algun dato en el state cuando valide desde el submit
    useEffect(() => {
        if(mensajeCodigo) {
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">El <b>codigo</b> ya esta ingresado.</p>' : '<p style="color:#545454">El <b>codigo</b> ya esta ingresado.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
              })
            return
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mensajeCodigo])
    useEffect(() => {
        if(mensajeRubro) {
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">El <b>codigo</b> ya esta ingresado.</p>' : '<p style="color:#545454">El <b>codigo</b> ya esta ingresado.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
              })
            return
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mensajeRubro])
    useEffect(() => {
        if(mensajeProveedor) {
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">El <b>codigo</b> ya esta ingresado.</p>' : '<p style="color:#545454">El <b>codigo</b> ya esta ingresado.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
              })
            return
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mensajeProveedor])

    //hago un get a todas estas colecciones para tenerlos en este componente
    useEffect(() => {
        if(usuario) {   //solo hace estos get cuando exista el usuario
            traerProductos()
            traerDolarBD()
            traerDolarAPI()
            traerRubros()
            traerProveedores()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usuario, productos])    //cuando cambie cualquiera de las 2 se ejecuta el useefect
    



    //cada vez que cambie el producto seleccionado me vacia el input de precio sugerido
    useEffect(() => {
        limpiarPrecioVenta()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [producto])

    useEffect(() => {
        if(usuario) {
            traerCompras()
        }
        if(productoEditar) {
            if(compras.length > 0) {

                compras.map(compra => {
                    if(compra.idProducto == productoEditar._id) {
                        productos.map(product => {
                            const compraId = compra.idProducto
                            if(compraId == product._id) {
                                if(product.disponibles === 0 || product.disponibles === null && producto.disponibles > 0) {
                                    setCantidadCompra(disponibles)
                                } else {
                                    setCantidadCompra("")
                                }
                                if(product.disponibles > 0 && producto.disponibles > 0 && product.disponibles < producto.disponibles) {
                                    let resta = producto.disponibles - product.disponibles
                                    setCantidadCompra(resta)
                                }
                            }
                        })
                    }
                })
            } else {
                productos.map(product => {
                    const idProduct = product._id
                    if(idProduct == productoEditar._id) {
                        if(product.disponibles === 0 || product.disponibles === null && producto.disponibles > 0) {
                            setCantidadCompra(disponibles)
                        } else {
                            setCantidadCompra("")
                        }
                        if(product.disponibles > 0 && producto.disponibles > 0 && product.disponibles < producto.disponibles) {
                            let resta = producto.disponibles - product.disponibles
                            setCantidadCompra(resta)
                        }
                    }
                })
            }
        } else {
            setCantidadCompra(disponibles)
        }
        
    }, [disponibles])

    const onChange = e => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value,
        })
    }

    const onChangeNumeros = e => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value.replace(",", "."),
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
            title: `${modo ? '<h3 style="color:white">Se creó el producto correctamente</h3>' : '<h3 style="color:#545454">Se creó el producto correctamente</h3>'}`,
            showConfirmButton: false,
            timer: 1500,
            background: `${modo ? "rgb(31 41 55)" : "white"}`,
        })
    }
    const alertaEditarCorrecto = () => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${modo ? '<h3 style="color:white">Se modificó el producto correctamente</h3>' : '<h3 style="color:#545454">Se modificó el producto correctamente</h3>'}`,
            showConfirmButton: false,
            timer: 1500,
            background: `${modo ? "rgb(31 41 55)" : "white"}`,
        })
    }

    //! ENVIAR FORMULARIO
    const onSubmit = e => {
        e.preventDefault()
        //Validar nombre
        if(nombre === ""){
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">El <b>nombre</b> es obligatorio.</p>' : '<p style="color:#545454">El <b>nombre</b> es obligatorio.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
              })
            return
        }
        //valido codigo. Esto lo hago para que no se vacíe el campo en caso de que haya algun error de backend
        if(productos) { //si existe algun producto creado, hago un recorrido
            const boolean = productos.map(producto => producto.codigo == codigo ? true : false )
            const contiene = boolean.includes(true) //si existe el codigo del formulario en un producto ya creado guardo un true
            const productoeditar = productoEditar?.codigo   //en caso de que el producto sea a editar, guardo su codigo

            if(contiene && productoeditar !== codigo) { //si el codigo del form es igual al de algun producto que no estoy editando muestro error. Si es un producto editado, ignora esta linea y se valida el campo
                Swal.fire({
                    icon: 'error',
                    title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                    html: `${modo ? '<p style="color:white">El <b>codigo</b> ya esta ingresado.</p>' : '<p style="color:#545454">El <b>codigo</b> ya esta ingresado.</p>'}`,
                    background: `${modo ? "rgb(31 41 55)" : "white"}`,
                  })
                return
            }
        }
        //convierto el valor del state a numero
        const codigoCambiado = Number(codigo)
        if(!codigo || codigo < 1 || isNaN(codigo) || !Number.isInteger(codigoCambiado) ) {  //verifico si es numero entero con isInteger
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">El <b>código</b> debe ser un número entero mayor a 0.</p>' : '<p style="color:#545454">El <b>código</b> debe ser un número entero mayor a 0.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
              })
            return
        }
        if(codigo.length > 3) {
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">El <b>código</b> debe ser un número menor a 4 dígitos</p>' : '<p style="color:#545454">El <b>código</b> debe ser un número menor a 4 dígitos</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
              })
            return
        }
       
      //validar el nuevo rubro. Esto lo hago para que no se vacíe el campo en caso de que haya algun error de backend
      if(valoresR) {  //si tiene algo el input de rubro
        if(rubros) {    //si hay algun rubro creado
            const boolean = rubros.map(rubro => rubro.nombre == valoresR ? true : false )   //recorro el state de rubros
            const contiene = boolean.includes(true) //devuelvo si existe un rubro con el mismo nombre
            if(contiene) {  //lanzo el error en ese caso
                Swal.fire({
                    icon: 'error',
                    title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                    html: `${modo ? '<p style="color:white">El <b>rubro</b> ya está ingresado.</p>' : '<p style="color:#545454">El <b>rubro</b> ya está ingresado.</p>'}`,
                    background: `${modo ? "rgb(31 41 55)" : "white"}`,
                })
                return
            } 
        }
    }
        //si seleccione el rubro, lo mando al state
        if(rubroSelect) {
            producto.rubro = rubroSelect
        }

        //validar el nuevo proveedor. Esto lo hago para que no se vacíe el campo en caso de que haya algun error de backend
        if(valoresP) {  //si tiene algo el input de proveedor
            if(proveedores) {    //si hay algun proveedor creado
                const boolean = proveedores.map(proveedor => proveedor.nombre == valoresP ? true : false )   //recorro el state de proveedores
                const contiene = boolean.includes(true) //devuelvo si existe un proveedor con el mismo nombre
                if(contiene) {  //lanzo el error en ese caso
                    Swal.fire({
                        icon: 'error',
                        title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                        html: `${modo ? '<p style="color:white">El <b>proveedor</b> ya está ingresado.</p>' : '<p style="color:#545454">El <b>proveedor</b> ya está ingresado.</p>'}`,
                        background: `${modo ? "rgb(31 41 55)" : "white"}`,
                    })
                    return
                }
            }  
        }
        if(proveedorSelect) {
            producto.proveedor = proveedorSelect
        }

        //Validar precio del dolar
        if(!valor_dolar_compra) {
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">El <b>precio del dolar </b> es obligatorio.</p>' : '<p style="color:#545454">El <b>precio del dolar </b> es obligatorio.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
              })
            return
        } else {
            if(isNaN(valor_dolar_compra) || valor_dolar_compra < 1) {
                Swal.fire({
                    icon: 'error',
                    title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                    html: `${modo ? '<p style="color:white">El <b>precio del dolar</b> debe ser 1 como mínimo.</p>' : '<p style="color:#545454">El <b>precio del dolar</b> debe ser 1 como mínimo.</p>'}`,
                    background: `${modo ? "rgb(31 41 55)" : "white"}`,
                  })
                return
            }
        }
            
        
        //validar valor compra dolar
        if(isNaN(precio_compra_dolar) || precio_compra_dolar < 0) {
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">El <b>precio de compra en USD</b> debe ser un número entero mayor a 0.</p>' : '<p style="color:#545454">El <b>precio de compra en USD</b> debe ser un número entero mayor a 0.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
              })
            return
        }
        //validar valor compra peso
        if(isNaN(precio_compra_peso) || precio_compra_peso < 0) {
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">El <b>precio de compra en ARS</b> debe ser un número entero mayor a 0.</p>' : '<p style="color:#545454">El <b>precio de compra en ARS</b> debe ser un número entero mayor a 0.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
              })
            return
        }

        //validar los 2 input juntos del precio
        if(precio_compra_dolar && precio_compra_peso) {
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">Solo se puede ingresar un tipo de moneda en la compra.</p>' : '<p style="color:#545454">Solo se puede ingresar un tipo de moneda en la compra.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
              })
            return
        }

        //validar rentabilidad
        if(isNaN(rentabilidad) || rentabilidad < 0) {
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">La <b>rentabilidad</b> tiene que ser mayor a 0.</p>' : '<p style="color:#545454">La <b>rentabilidad</b> tiene que ser mayor a 0.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
              })
            return
        }  
        
        //Validar el precio de venta
        if(isNaN(precio_venta) || precio_venta < 0) {
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">El <b>precio de venta</b> debe ser mayor a 0.</p>' : '<p style="color:#545454">El <b>precio de venta</b> debe ser mayor a 0.</p>'}`,

                background: `${modo ? "rgb(31 41 55)" : "white"}`,
              })
            return
        }
        //Validar stock
        const disponibleCambiado = Number(disponibles)
        if(disponibles < 0 || isNaN(disponibles) || !Number.isInteger(disponibleCambiado)) {
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">La <b>disponibilidad</b> debe ser un número entero mayor a 0.</p>' : '<p style="color:#545454">El <b>disponibilidad</b> debe ser un número entero mayor a 0.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
              })
            return
        }

        //validar numero de faltantes
        const limiteFaltanteCambiado = Number(limiteFaltante)
        if( limiteFaltante < 0 || isNaN(limiteFaltante) || !Number.isInteger(limiteFaltanteCambiado)) {
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">Los <b>faltantes</b> debe ser un número entero mayor a 0.</p>' : '<p style="color:#545454">Los <b>faltantes</b> debe ser un número entero mayor a 0.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
              })
            return
        } 
        

        //si no se cumple ninguna condicion que le puse arriba, y tampoco está vacio el input, lo envio a la bd
        if(valoresP) {
            agregarProveedor(proveedor)
        }
        //si no se cumple ninguna condicion que le puse arriba, y tampoco está vacio el input, lo envio a la bd
        if(valoresR) {
            agregarRubro(rubro)
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
                barras: "",
                rubro: "",
                proveedor: "",
                precio_venta: "", 
                precio_compra_dolar: "", 
                fecha_compra: hoy, 
                precio_compra_peso: "", 
                valor_dolar_compra: "", 
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
            if(cantidadCompra) {
                compraDeProducto(producto, parseInt(cantidadCompra))
            }
        }
    }

    return (
        <>
            <h1 className={`${productoEditar ? "text-green-600 dark:text-green-700" : "text-blue-900"} font-black text-3xl sm:text-4xl  dark:text-blue-300 text-center`}>{productoEditar ? "Editar Producto": "Agregar Producto"}</h1>
            <p className="mt-3 text-center text-black dark:text-gray-50">Llena los siguientes campos para {productoEditar ? "editar" : "agregar"} un producto</p>
            <div className='bg-white dark:bg-gray-900 mt-10 px-5 pt-1 pb-5 rounded-md shadow-md xl:w-auto 2xl:w-11/12 mx-auto  '>
                <h1 className='text-gray-600 dark:text-white font-bold text-xl uppercase text-center'></h1>
                
                <form 
                    className="mt-10"
                    onSubmit={onSubmit}
                >
                    <div className="grid lg:grid-cols-2 xl:grid-cols-2 lg:gap-2 xl:gap-4 ">
                        <div className="mb-4">
                            <div className="flex justify-between">
                                <label htmlFor="nombre" className="text-gray-800 dark:text-gray-300 font-bold font ">Nombre *</label>
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

                            </div>
                            <input  
                                type="tel"
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
                                <label htmlFor="barras" className="text-gray-800 dark:text-gray-300 font-bold">Código de barras</label>

                            </div>
                            <input  
                                type="tel"
                                autoComplete="off"
                                className=" mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="barras"
                                placeholder="893247539457"
                                name="barras"
                                value={barras}
                                onChange={onChange}
                            />
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between">
                                <label htmlFor="rubro" className="text-gray-800 dark:text-gray-300 font-bold ">Rubro</label>
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
                            <div className="grid grid-cols-3">
                                <label htmlFor="proveedor" className="text-gray-800 dark:text-gray-300 font-bold text-left">Proveedor</label>
                                <label htmlFor="proveedor" className="text-gray-800 dark:text-gray-300 font-bold text-center">N°</label>
                                <label htmlFor="proveedor" className="text-gray-800 dark:text-gray-300 font-bold text-right">Proveedores</label>
                            </div>
                            <div className="grid grid-cols-9">
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className={`${proveedorSelect && "hover:cursor-not-allowed"} mt-2 col-span-4 block  p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300`}
                                    id="proveedor"
                                    placeholder="MercadoLibre"
                                    name="proveedor"
                                    value={valoresP}
                                    disabled={proveedorSelect && true}
                                    onChange={onChangeProveedorInput}
                                />
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className={` mt-2 ml-1 block col-span-1 p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300`}
                                    id="numero"
                                    placeholder="1"
                                    name="numero"
                                />
                                
                                <select  onChange={onChangeProveedorSelect} value={escribiendoP ? "" : proveedorSelect} disabled={escribiendoP && true} className="uppercase text-center mt-2 ml-1 block col-span-4 p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300">
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
                            </div>
                            <input
                                type="tel"
                                step="any"
                                autoComplete="off"
                                className="mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="valor_dolar_compra"
                                placeholder="$112"
                                name="valor_dolar_compra"
                                value={valor_dolar_compra}
                                onChange={onChangeNumeros}
                            />
                        </div>                 
                        <div className="mb-4">
                            <div className="flex justify-between">
                                <label htmlFor="precio_compra_dolar" className="text-gray-800 dark:text-gray-300 font-bold font ">Precio compra en USD</label>
                            </div>                            
                            <input
                                type="tel"
                                autoComplete="off"
                                className="mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="precio_compra_dolar"
                                placeholder="$28,84"
                                name="precio_compra_dolar"
                                value={precio_compra_dolar}
                                onChange={onChangeNumeros}
                            />
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between">
                                <label htmlFor="precio_compra_peso" className="text-gray-800 dark:text-gray-300 font-bold font ">Precio compra en AR$</label>
                            </div>                          
                            <input
                                type="tel"
                                autoComplete="off"
                                className="mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="precio_compra_peso"
                                placeholder="$1250"
                                name="precio_compra_peso"
                                value={precio_compra_peso}
                                onChange={onChangeNumeros}
                            />
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between">
                                <label htmlFor="rentabilidad" className="text-gray-800 dark:text-gray-300 font-bold font ">Rentabilidad</label>
                            </div>                            
                            <input
                                type="tel"
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
                                </div>                                 
                                <input
                                    type="tel"
                                    autoComplete="off"
                                    className="mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                    id="precio_venta"
                                    placeholder="$ 10.000"
                                    name="precio_venta"
                                    value={precio_venta}
                                    onChange={onChangeNumeros}
                                />
                            </div>
                            <div className="mb-4 justify-items-end">
                                <label htmlFor="valorDeVenta" className="text-gray-800 dark:text-gray-300 font-bold text-right block ">Sugerido</label>
                                    <input
                                        type="tel"
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
                            </div>                             
                            <input
                                type="tel"
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
                            </div>  
                            <div className="flex gap-4">          
                                <input
                                    type="button"
                                    className={`w-2/4 lg:w-1/4 rounded-md mt-2 block p-3 ${valorFaltante ? "bg-blue-200" : "bg-gray-400 "}`}
                                    onClick={() => setValorFaltante(!valorFaltante)}
                                    value={valorFaltante ? "Si"  : "No"}
                                >
                                </input>
                                <input
                                    type="tel"
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
                        className={`${productoEditar ? "bg-green-600 active:bg-green-700 dark:bg-green-800 dark:active:bg-green-900" : "bg-blue-800 active:bg-blue-900 dark:bg-blue-500 dark:active:bg-blue-600"} mt-5 w-full  p-3 text-white uppercase font-bold text-lg rounded-md cursor-pointer`}
                    />
                </form>
            </div>
        </>
    )
}

export default Formulario

