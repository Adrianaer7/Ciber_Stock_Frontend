import { useState, useContext, useEffect } from "react"
import Rubro from "./Rubro"
import Proveedor from "./Proveedor"
import { generarFecha, hoy } from "../../helpers"
import productoContext from "../../context/productos/productoContext"
import authContext from "../../context/auth/authContext"
import Swal from "sweetalert2"
import compraContext from "../../context/historial/compras/compraContext"

const Formulario = ({productoEditar}) => {

    const AuthContext = useContext(authContext)
    const {modo, usuario} = AuthContext

    const CompraContext = useContext(compraContext)
    const {traerCompras} = CompraContext

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
        valorDeVentaConocidos,
        valorDeVentaEfectivo,
        valorDeVentaTarjeta,
        limpiarPrecioVenta, 
        precioVenta,
        traerDolarAPI, 
        traerDolarBD,
    } = productosContext
   
    const [valoresR, setValoresR] = useState("")    //contiene lo que voy escribiendo en rubro
    const [valoresP, setValoresP] = useState("")    //contiene lo que voy escribiendo en proveedor
    const [rubroSelect, setRubroSelect] = useState(productoEditar?.rubro ?? "")
    const [proveedorSelect, setProveedorSelect] = useState(productoEditar?.proveedor ?? "")
    const [valorFaltante, setValorFaltante] = useState(productoEditar?.añadirFaltante ?? false)
    const [cantidad, setCantidad] = useState("")
    const desdeForm = true  //con esto me aseguro que los datos que envio para agregar producto/compra o editar producto/compra, vienen desde el formulario, y no se editan en el listado

    const [producto, setProducto] = useState({
        nombre: productoEditar?.nombre ?? "",
        modelo: productoEditar?.modelo ?? "",
        marca: productoEditar?.marca ?? "",
        codigo: productoEditar?.codigo ?? "",
        barras: productoEditar?.barras ?? "",
        valor_dolar_compra: productoEditar?.valor_dolar_compra ?? "",
        precio_venta: productoEditar?.precio_venta ?? 0,
        precio_venta_conocidos: productoEditar?.precio_venta_conocidos ?? 0,
        precio_venta_efectivo: productoEditar?.precio_venta_efectivo ?? 0,
        precio_venta_tarjeta: productoEditar?.precio_venta_tarjeta ?? 0,
        precio_compra_dolar: productoEditar?.precio_compra_dolar ?? "",
        precio_compra_peso: productoEditar?.precio_compra_peso ?? "",
        rubro: productoEditar?.rubro ?? "",
        proveedor: productoEditar?.proveedor ?? "",
        todos_proveedores: productoEditar?.todos_proveedores ?? [],
        fecha_compra: productoEditar?.fecha_compra ?? hoy ?? "",
        disponibles: productoEditar?.disponibles ?? "",
        rentabilidad: productoEditar?.rentabilidad ?? "",
        notas: productoEditar?.notas ?? "",
        faltante: productoEditar?.faltante ?? false,
        limiteFaltante: productoEditar?.limiteFaltante ?? "",
        añadirFaltante: productoEditar?.añadirFaltante ?? false
    })
    const {nombre, marca, modelo, codigo, barras, rubro, precio_venta, precio_venta_conocidos, precio_venta_efectivo, precio_venta_tarjeta, precio_compra_dolar, fecha_compra, precio_compra_peso, valor_dolar_compra, proveedor, todos_proveedores, disponibles, rentabilidad, notas, faltante, limiteFaltante, añadirFaltante} = producto
    

    //hago un get a todas estas colecciones para tenerlos en este componente
    useEffect(() => {
        if(usuario) {   //solo hace estos get cuando exista el usuario
            traerDolarBD()
            traerDolarAPI()
            traerRubros()
            traerProveedores()
            traerCompras()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usuario, productos])    //cuando cambie cualquiera de las 2 se ejecuta el useefect
    
    useEffect(() => {
        if(usuario) {
            traerProductos()
        }
    }, [usuario])


    //cada vez que cambie el producto seleccionado me vacia el input de precio sugerido
    useEffect(() => {
        limpiarPrecioVenta()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productoSeleccionado])
    
   

    //cada vez que escriba en los inputs se realiza el calculo aprox para el precio de la venta
    useEffect(() => {
        precioVenta(valor_dolar_compra, precio_compra_dolar, precio_compra_peso, rentabilidad)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valor_dolar_compra, precio_compra_dolar, precio_compra_peso, rentabilidad])


    useEffect(() => {
        producto.proveedor = proveedorSelect
    }, [proveedorSelect])
    useEffect(() => {
        producto.proveedor = valoresP
    }, [valoresP])



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
    
    
    const onChangeRubroInput = e => {
        setValoresR(e.target.value.toUpperCase())
    }
    const onChangeRubroSelect = e => {
        setRubroSelect(e.target.value.toUpperCase())
    }
    if(valoresR && !rubroSelect) {
        producto.rubro = valoresR
    }
    if(rubroSelect && !valoresR) {
        producto.rubro = rubroSelect
    }
    
    const onChangeProveedorInput = e => {
        setValoresP(e.target.value.toUpperCase())
    }
    const onChangeProveedorSelect = e => {
        setProveedorSelect(e.target.value.toUpperCase())
    }
    if(valoresP && !proveedorSelect) {
        producto.proveedor = valoresP
     }
    if(proveedorSelect && !valoresP) {
        producto.proveedor = proveedorSelect
    } 

    if(valorFaltante) {
        producto.añadirFaltante = true
    } else {
        producto.añadirFaltante = false
    }

    if(!valor_dolar_compra || !rentabilidad && precio_compra_peso) {
        producto.precio_venta = 0
        producto.precio_venta_conocidos = 0
        producto.precio_venta_efectivo = 0
        producto.precio_venta_tarjeta = 0
    }
    if(!valor_dolar_compra || !rentabilidad && precio_compra_dolar) {
        producto.precio_venta = 0
        producto.precio_venta_conocidos = 0
        producto.precio_venta_efectivo = 0
        producto.precio_venta_tarjeta = 0
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
            if(rubroSelect && valoresR) {
                Swal.fire({
                    icon: 'error',
                    title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                    html: `${modo ? '<p style="color:white">Ingrese 1 solo <b>rubro</b> a la vez.</p>' : '<p style="color:#545454">Ingrese un solo <b>rubro</b> a la vez.</p>'}`,
                    background: `${modo ? "rgb(31 41 55)" : "white"}`,
                })
                return
            }
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

        const cantidadCambiada = Number(cantidad)
        if(cantidad < 0 || isNaN(cantidad) || !Number.isInteger(cantidadCambiada) ) {  //verifico si es numero entero con isInteger
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">La <b>cantidad</b> de productos a ingresar debe ser un número entero mayor a 0.</p>' : '<p style="color:#545454">La <b>cantidad</b> de productos a ingresar debe ser un número entero mayor a 0.</p>'}`,
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
        
        //validar el nuevo proveedor. Esto lo hago para que no se vacíe el campo en caso de que haya algun error de backend
        if(valoresP) {  //si tiene algo el input de proveedor
            if(proveedorSelect && valoresP) {
                Swal.fire({
                    icon: 'error',
                    title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                    html: `${modo ? '<p style="color:white">Ingrese 1 solo <b>proveedor</b> a la vez.</p>' : '<p style="color:#545454">Ingrese un solo <b>proveedor</b> a la vez.</p>'}`,
                    background: `${modo ? "rgb(31 41 55)" : "white"}`,
                })
                return
            }

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

            const boolean = producto.todos_proveedores.map(provider => provider === proveedor ? true : false)
            const prov = boolean.includes(true)
            if(!prov || prov.length === 0) {
                producto.todos_proveedores.push(valoresP)
            }
                
            
        }
        if(proveedorSelect) {
            const boolean = producto.todos_proveedores.map(provider => provider === proveedor ? true : false)
            const prov = boolean.includes(true)
            if(!prov || prov.length === 0) {
                producto.todos_proveedores.push(proveedorSelect)
            }
            
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
            if(cantidad) {
                producto.disponibles = cantidad
            }
            if(valorDeVenta) {
                producto.precio_venta = valorDeVenta
                producto.precio_venta_conocidos = valorDeVentaConocidos
                producto.precio_venta_efectivo = valorDeVentaEfectivo
                producto.precio_venta_tarjeta = valorDeVentaTarjeta
            }
            agregarProducto(producto, cantidad, desdeForm)
            setCantidad("")
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
                precio_venta_conocidos: "",
                precio_venta_efectivo: "",
                precio_venta_tarjeta: "",
                precio_compra_dolar: "", 
                fecha_compra: hoy, 
                precio_compra_peso: "", 
                valor_dolar_compra: "", 
                rentabilidad: "", 
                notas: "",
                faltante: false,
                limiteFaltante: "",
                añadirFaltante: false
                })
            setValoresR("")
            setValoresP("")
            traerProductos()
            alertaNuevoCorrecto()
        } else {
            //si hay que editar
            if(cantidad && disponibles) {
                producto.disponibles = Number(producto.disponibles) + Number(cantidad)
            } else {
                if(cantidad && !disponibles) {
                    producto.disponibles = Number(cantidad)
                }
            }
            if(valorDeVenta) {
                producto.precio_venta = valorDeVenta
                producto.precio_venta_conocidos = valorDeVentaConocidos
                producto.precio_venta_efectivo = valorDeVentaEfectivo
                producto.precio_venta_tarjeta = valorDeVentaTarjeta
            }
            producto._id = productoEditar._id
            editarProducto(producto, cantidad, desdeForm)
            setCantidad("")
            setProveedorSelect(producto.proveedor)
            setValoresP("")
            traerProductos()
            alertaEditarCorrecto()
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
                                <label htmlFor="rubro" className="text-gray-800 dark:text-gray-300 font-bold ">Rubros</label>

                            </div>
                            <div className="flex">
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className={` mt-2  block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300`}
                                    id="rubro"
                                    placeholder="Cables"
                                    name="rubro"
                                    value={valoresR}
                                    onChange={onChangeRubroInput}
                                />
                                <select  
                                    onChange={onChangeRubroSelect} 
                                    value={rubroSelect} 
                                    className="uppercase text-center mt-2 ml-4 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                >
                                    <option value="" className="uppercase"> -- Seleccione --</option>
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
                            <div className="grid grid-cols-9">
                                <label htmlFor="cantidad" className="text-gray-800 dark:text-gray-300 font-bold text-center col-span-1">N°</label>
                                <label htmlFor="proveedor" className="text-gray-800 dark:text-gray-300 font-bold text-left col-span-4">Proveedor</label>
                                <label htmlFor="selectp" className="text-gray-800 dark:text-gray-300 font-bold text-right col-span-4">Proveedores</label>
                            </div>
                            <div className="grid grid-cols-9">
                                <input
                                    type="tel"
                                    autoComplete="off"
                                    className={`text-center mt-2 block col-span-1 p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300`}
                                    id="cantidad"
                                    name="cantidad"
                                    value={cantidad}
                                    onChange={e => setCantidad(e.target.value)}
                                />
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className={` mt-2 ml-1 col-span-4 block  p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300`}
                                    id="proveedor"
                                    placeholder="MercadoLibre"
                                    name="proveedor"
                                    value={valoresP}
                                    onChange={onChangeProveedorInput}
                                />
                                
                                <select 
                                    id="selectp" 
                                    className="uppercase text-center mt-2 ml-1 block col-span-4 p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                    value={proveedorSelect} 
                                    onChange={onChangeProveedorSelect} 
                                >
                                    <option value="" className="uppercase">-- Seleccione --</option>
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
                                onChange={onChangeNumeros}
                            />
                        </div>
                            <div className="mb-4">
                                <div className="grid grid-cols-4">
                                    <label htmlFor="precio_venta" className="text-gray-800  dark:text-gray-300 font-bold  "> al ingreso</label>
                                    <label htmlFor="precio_venta_conocidos" className="text-gray-800  dark:text-gray-300 font-bold  "> conocidos </label>
                                    <label htmlFor="precio_venta_efectivo" className="text-gray-800  dark:text-gray-300 font-bold  "> efectivo </label>
                                    <label htmlFor="precio_venta_tarjeta" className="text-gray-800  dark:text-gray-300 font-bold  "> tarjeta </label>
                                </div>
                                <div className="grid grid-cols-4 gap-1">
                                    <input
                                        type="tel"
                                        autoComplete="off"
                                        className="mt-2  block w-full p-3 pr-0 hover:cursor-pointer  justify-end rounded-md font-bold text-red-600 bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                        id="precio_venta"
                                        placeholder="$0"
                                        name="precio_venta"
                                        value={  valorDeVenta > 0 ? valorDeVenta :  precio_venta}
                                        readOnly={true}
                                        
                                    />
                                    <input
                                        type="tel"
                                        autoComplete="off"
                                        className="mt-2  block w-full p-3 pr-0 hover:cursor-pointer  justify-end rounded-md font-bold text-red-600 bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                        id="precio_venta_conocidos"
                                        placeholder="$0"
                                        name="precio_venta_conocidos"
                                        value={ valorDeVentaConocidos > 0 ? valorDeVentaConocidos : precio_venta_conocidos}
                                        readOnly={true}
                                        
                                    />
                                    <input
                                        type="tel"
                                        autoComplete="off"
                                        className="mt-2  block w-full p-3 pr-0 hover:cursor-pointer  justify-end rounded-md font-bold text-red-600 bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                        id="precio_venta_efectivo"
                                        placeholder="$0"
                                        name="precio_venta_efectivo"
                                        value={ valorDeVentaEfectivo > 0 ? valorDeVentaEfectivo : precio_venta_efectivo}
                                        readOnly={true}
                                        
                                    />
                                    <input
                                        type="tel"
                                        autoComplete="off"
                                        className="mt-2  block w-full p-3 pr-0 hover:cursor-pointer  justify-end rounded-md font-bold text-red-600 bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                        id="precio_venta_tarjeta"
                                        placeholder="$0"
                                        name="precio_venta_tarjeta"
                                        value={ valorDeVentaTarjeta > 0 ? valorDeVentaTarjeta : precio_venta_tarjeta}
                                        readOnly={true}
                                        
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
                                <label htmlFor="limiteFaltante" className="text-gray-800  dark:text-gray-300 font-bold  ">Añadir como faltante cuanto llegue a: </label>
                            </div>  
                            <div className="flex gap-4">          
                                <input
                                    type="button"
                                    className={`w-2/4 lg:w-1/4 rounded-md mt-2 block p-3 hover:cursor-pointer ${valorFaltante ? "bg-blue-200" : "bg-gray-400 "}`}
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

