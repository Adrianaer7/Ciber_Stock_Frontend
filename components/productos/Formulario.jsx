import { useState, useContext, useEffect } from "react"
import Image from "next/image"
import productoContext from "../../context/productos/productoContext"
import authContext from "../../context/auth/authContext"
import proveedorContext from "../../context/proveedores/proveedorContext"
import compraContext from "../../context/historial/compras/compraContext"
import rubroContext from "../../context/rubros/rubroContext"
import { hoy } from "../../helpers"
import Swal from "sweetalert2"
import iniciarSocket from "../../config/socket.config"
import mostarAlerta from "../../config/alerts"

const Formulario = ({ productoEditar }) => {
    const AuthContext = useContext(authContext)
    const { modo, usuario, token } = AuthContext

    const CompraContext = useContext(compraContext)
    const { traerCompras } = CompraContext

    const ProveedorContext = useContext(proveedorContext)
    const { traerProveedores, proveedores } = ProveedorContext

    const RubroContext = useContext(rubroContext)
    const { rubros, traerRubros } = RubroContext

    const productosContext = useContext(productoContext)
    const {
        productos,
        codigos,
        agregarProducto,
        editarProducto,
        traerProductos,
        traerCodigos,
        valorDeVenta,
        precioVenta,
        traerDolarBD,
    } = productosContext

    const [proveedorSelect, setProveedorSelect] = useState(productoEditar?.proveedor ?? "") //dejo el select del formulario cargado con el ultimo proveedor
    const [proveedoresIguales, setProveedoresIguales] = useState([])    //guardo los proveedores que sean iguales a los que hay en todos_proveedores
    const [valorFaltante, setValorFaltante] = useState(productoEditar?.añadirFaltante ?? false)
    const [cantidad, setCantidad] = useState("")
    const [visible, setVisible] = useState(productoEditar?.visibilidad ?? true) //boton para que el producto se vea o no en el listado
    const [image, setImage] = useState({})
    const desdeForm = true  //con esto me aseguro que los datos que envio para agregar producto/compra o editar producto/compra, vienen desde el formulario, y no se editan en el listado
    let formData
    const formatoImagen = ["image/jpg", "image/jpeg", "image/png", "image/webp", "image/avif"]

    const [producto, setProducto] = useState({
        nombre: productoEditar?.nombre ?? "",
        marca: productoEditar?.marca ?? "",
        modelo: productoEditar?.modelo ?? "",
        codigo: productoEditar?.codigo ?? "",
        barras: productoEditar?.barras ?? "",
        rubro: productoEditar?.rubro ?? "",
        rubroValor: productoEditar?.rubroValor ?? "",
        proveedor: productoEditar?.proveedor ?? "",
        todos_proveedores: productoEditar?.todos_proveedores ?? [],
        precio_venta: productoEditar?.precio_venta ?? 0,
        precio_venta_conocidos: productoEditar?.precio_venta_conocidos ?? 0,
        precio_venta_efectivo: productoEditar?.precio_venta_efectivo ?? 0,
        precio_venta_tarjeta: productoEditar?.precio_venta_tarjeta ?? 0,
        precio_venta_ahoraDoce: productoEditar?.precio_venta_ahoraDoce ?? 0,
        precio_venta_cuotas: productoEditar?.precio_venta_cuotas ?? 0,
        precio_compra_dolar: productoEditar?.precio_compra_dolar ?? "",
        precio_compra_peso: productoEditar?.precio_compra_peso ?? "",
        valor_dolar_compra: productoEditar?.valor_dolar_compra ?? "",
        factura: productoEditar?.factura ?? "",
        garantia: productoEditar?.garantia ?? "",
        fecha_compra: productoEditar?.fecha_compra ?? hoy ?? "",
        disponibles: productoEditar?.disponibles ?? "",
        imagen: productoEditar?.imagen ?? "",
        notas: productoEditar?.notas ?? "",
        faltante: productoEditar?.faltante ?? false,
        limiteFaltante: productoEditar?.limiteFaltante ?? "",
        añadirFaltante: productoEditar?.añadirFaltante ?? false,
        visibilidad: productoEditar?.visibilidad ?? true
    })
    const { nombre, marca, modelo, codigo, barras, rubro, rubroValor, precio_venta, precio_venta_conocidos, precio_venta_efectivo, precio_venta_tarjeta, precio_compra_dolar, fecha_compra, precio_compra_peso, valor_dolar_compra, proveedor, todos_proveedores, factura, garantia, disponibles, notas, faltante, limiteFaltante, añadirFaltante, imagen } = producto


    useEffect(() => {
        if (usuario) {
            traerDolarBD()
            traerProveedores()
            traerCodigos()
            traerCompras()
            traerRubros()
            traerProductos()
            const socket = iniciarSocket(token);
            socket.on('product-updated', () => {
                traerDolarBD()
                traerProveedores()
                traerCodigos()
                traerCompras()
                traerRubros()
                traerProductos()
            });
            socket.on('rubros-updated', () => {
                traerRubros()
            });
            return () => {
                socket.disconnect(); // Desconectar al desmontar
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])




    //cada vez que escriba en los inputs se realiza el calculo aprox para el precio de la venta
    useEffect(() => {
        precioVenta(valor_dolar_compra, precio_compra_dolar, precio_compra_peso, rubroValor)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valor_dolar_compra, precio_compra_dolar, precio_compra_peso, rubroValor])

    //lo que vaya selecciondo con el select lo pongo en el producto, cuando cargue el componente, el select carga lo que haya en producto
    useEffect(() => {
        producto.proveedor = proveedorSelect
    }, [proveedorSelect])



    useEffect(() => {
        producto.visibilidad = visible
    }, [visible])

    //guardar en el state los proveedores que tengan mismo id que los de todos_proveedores
    useEffect(() => {
        if (productoEditar) {
            if (proveedores.length > 0) {
                const todos = proveedores.filter(provider => producto.todos_proveedores.includes(provider._id))
                if (todos) {
                    setProveedoresIguales(todos)
                }
            }
        }
    }, [productos, todos_proveedores]) //se ejecuta al cargar los productos, cuando se modifica, y cuando quito y/o agrego proveedores al producto

    const eliminarProveedor = e => {
        const noEliminados = todos_proveedores.filter(todos => todos !== e) //traigo todos los distintos al que elimine
        setProducto({
            ...producto,
            todos_proveedores: noEliminados,    //los coloco aca
        })
        if (noEliminados.length > 0) {
            setProveedorSelect(noEliminados[noEliminados.length - 1])    //si tengo historial con algun proveedor, en el select pongo el ultimo
        } else {
            setProveedorSelect("")  //sino dejo el select vacio
        }
    }

    const onChange = e => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value,
        })
    }

    const onChangeRubro = e => {
        const rubroEncontrado = rubros.find(rubro => rubro.nombre == e.target.value)
        if (rubroEncontrado) {
            setProducto({
                ...producto,
                rubro: rubroEncontrado.nombre,
                rubroValor: rubroEncontrado.rentabilidad
            })
        } else {
            setProducto({
                ...producto,
                rubro: "",
                rubroValor: ""
            })
        }
    }

    const onChangeNumeros = e => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value.replace(",", "."),
        })
    }


    const onChangeProveedorSelect = e => {
        setProveedorSelect(e.target.value)
    }

    if (valorFaltante) {
        producto.añadirFaltante = true
    } else {
        producto.añadirFaltante = false
    }

    if (!valor_dolar_compra || !rubro && precio_compra_peso) {
        producto.precio_venta = 0
        producto.precio_venta_conocidos = 0
        producto.precio_venta_efectivo = 0
        producto.precio_venta_tarjeta = 0
    }
    if (!valor_dolar_compra || !rubro && precio_compra_dolar || !precio_compra_dolar) {
        producto.precio_venta = 0
        producto.precio_venta_conocidos = 0
        producto.precio_venta_efectivo = 0
        producto.precio_venta_tarjeta = 0
    }

    const convertirAnumero = () => {
        producto.codigo = Number(codigo)
        producto.rubroValor = Number(rubroValor)
        producto.precio_compra_dolar = Number(precio_compra_dolar)
        producto.precio_compra_peso = Number(precio_compra_peso)
        producto.valor_dolar_compra = Number(valor_dolar_compra)
        producto.limiteFaltante = Number(limiteFaltante)
        producto.disponibles = Number(disponibles)
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
    const onSubmit = async e => {
        e.preventDefault()
        //Validar nombre
        if (nombre === "") {
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">El <b>nombre</b> es obligatorio.</p>' : '<p style="color:#545454">El <b>nombre</b> es obligatorio.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
            })
            return
        }

        //convierto el valor del state a numero
        const codigoCambiado = Number(codigo)
        if (!codigo || codigo < 1 || isNaN(codigo) || !Number.isInteger(codigoCambiado)) {
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">El <b>código</b> debe ser un número entero mayor a 0.</p>' : '<p style="color:#545454">El <b>código</b> debe ser un número entero mayor a 0.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
            })
            return
        }
        if (codigo.length > 3) {
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">El <b>código</b> debe ser un número menor a 4 dígitos</p>' : '<p style="color:#545454">El <b>código</b> debe ser un número menor a 4 dígitos</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
            })
            return
        }
        if (productos) { //si existe algun producto creado, hago un recorrido
            const productoIgual = productos.find(producto => producto.codigo == codigoCambiado) //obtengo solo el producto que tenga el mismo codigo que el que ingreso del form
            if (productoIgual) {    //si existe algun producto con ese codigo
                let id = productoIgual._id
                if (id !== productoEditar?._id) {  //si el id del producto no coincide con el del producto actual, es que quiero asignar un codigo que ya está ingresado
                    Swal.fire({
                        icon: 'error',
                        title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                        html: `${modo ? '<p style="color:white">Nro. de artículo ya asignado.</p>' : '<p style="color:#545454">Nro. de artículo ya asignado.</p>'}`,
                        background: `${modo ? "rgb(31 41 55)" : "white"}`,
                    })
                    return
                }
            }

        }

        const cantidadCambiada = Number(cantidad)
        if (cantidad < 0 || isNaN(cantidad) || !Number.isInteger(cantidadCambiada)) {
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">La <b>cantidad</b> de productos a ingresar debe ser un número entero mayor a 0.</p>' : '<p style="color:#545454">La <b>cantidad</b> de productos a ingresar debe ser un número entero mayor a 0.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
            })
            return
        }

        //si no existe el precio de venta, no exijo el valor del dolar
        if (valorDeVenta > 0 && !valor_dolar_compra) {
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">El <b>precio del dolar </b> es obligatorio.</p>' : '<p style="color:#545454">El <b>precio del dolar </b> es obligatorio.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
            })
            return
        } else {
            if (precioVenta > 0) {
                if (isNaN(valor_dolar_compra) || valor_dolar_compra < 1) {
                    Swal.fire({
                        icon: 'error',
                        title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                        html: `${modo ? '<p style="color:white">El <b>precio del dolar</b> debe ser 1 como mínimo.</p>' : '<p style="color:#545454">El <b>precio del dolar</b> debe ser 1 como mínimo.</p>'}`,
                        background: `${modo ? "rgb(31 41 55)" : "white"}`,
                    })
                    return
                }
            }
        }


        //validar valor compra dolar
        if (isNaN(precio_compra_dolar) || precio_compra_dolar < 0) {
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">El <b>precio de compra en USD</b> debe ser un número entero mayor a 0.</p>' : '<p style="color:#545454">El <b>precio de compra en USD</b> debe ser un número entero mayor a 0.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
            })
            return
        }
        //validar valor compra peso
        if (isNaN(precio_compra_peso) || precio_compra_peso < 0) {
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">El <b>precio de compra en ARS</b> debe ser un número entero mayor a 0.</p>' : '<p style="color:#545454">El <b>precio de compra en ARS</b> debe ser un número entero mayor a 0.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
            })
            return
        }

        //validar los 2 input juntos del precio
        if (precio_compra_dolar && precio_compra_peso) {
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">Solo se puede ingresar un tipo de moneda en la compra.</p>' : '<p style="color:#545454">Solo se puede ingresar un tipo de moneda en la compra.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
            })
            return
        }


        //Validar el precio de venta
        if (isNaN(precio_venta) || precio_venta < 0) {
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
        if (limiteFaltante < 0 || isNaN(limiteFaltante) || !Number.isInteger(limiteFaltanteCambiado)) {
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">Los <b>faltantes</b> debe ser un número entero mayor a 0.</p>' : '<p style="color:#545454">Los <b>faltantes</b> debe ser un número entero mayor a 0.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
            })
            return
        }

        if (proveedorSelect) {
            const proveedorIgual = producto.todos_proveedores.find(provider => provider === proveedorSelect) //busca un proveedor agregado al producto que sea igual al que tengo en el select
            if (!proveedorIgual) {   //si no es igual, lo agrega
                producto.todos_proveedores = [...producto.todos_proveedores, proveedorSelect]
            }

        }

        if (image.name) {

            const imagenValida = formatoImagen.includes(image.type)
            if (imagenValida) {
                formData = new FormData()
                formData.append("archivo", image)
                producto.imagen = image.name
            } else {
                Swal.fire({
                    icon: 'error',
                    title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                    html: `${modo ? '<p style="color:white">La <b>imagen</b> debe ser <b>jpg/jpeg/png/webp/avif</b></p>' : '<p style="color:#545454">La <b>imagen</b> debe ser <b>jpg/jpeg/png/webp/avif</b></p>'}`,
                    background: `${modo ? "rgb(31 41 55)" : "white"}`,
                })
                return
            }
        }

        try {
            //si es nuevo producto
            convertirAnumero()


            if (!productoEditar) {
                if (cantidad) {
                    producto.disponibles = Number(cantidad)
                } else {
                    producto.disponibles = 0
                }
                if (valorDeVenta) {
                    producto.precio_venta = Number(valorDeVenta)
                }

                const error = await agregarProducto(producto, cantidad, desdeForm, formData)
                if (error) return mostarAlerta(error, modo)
                setCantidad("")
                setImage({})
                setProveedorSelect("")
                setProducto({
                    nombre: "",
                    marca: "",
                    modelo: "",
                    codigo: "",
                    barras: "",
                    rubro: "",
                    rubroValor: "",
                    proveedor: "",
                    todos_proveedores: [],
                    precio_venta: 0,
                    precio_venta_conocidos: 0,
                    precio_venta_efectivo: 0,
                    precio_venta_tarjeta: 0,
                    precio_venta_ahoraDoce: 0,
                    precio_venta_cuotas: 0,
                    precio_compra_dolar: 0,
                    fecha_compra: hoy,
                    precio_compra_peso: 0,
                    valor_dolar_compra: 0,
                    factura: "",
                    garantia: "",
                    imagen: "",
                    notas: "",
                    faltante: false,
                    limiteFaltante: "",
                    añadirFaltante: false,
                    visibilidad: true
                })
                setVisible(true)
                traerProductos()
                await traerCodigos()
                alertaNuevoCorrecto()

            } else {

                //si hay que editar
                if (cantidad && disponibles) {   //si ya hay stock y quiero agregar mas
                    producto.disponibles = Number(producto.disponibles) + Number(cantidad)
                } else {
                    if (cantidad && !disponibles) {  //si no hay stock
                        producto.disponibles = Number(cantidad)
                    }
                }

                if (valorDeVenta) {
                    producto.precio_venta = valorDeVenta
                }

                producto._id = productoEditar._id
                producto.creado = new Date(producto.creado)
                const error = await editarProducto(producto, cantidad, desdeForm, formData)
                if (error) return mostarAlerta(error, modo)
                setCantidad("")
                setImage({})
                setProveedorSelect(producto.proveedor)
                traerProductos()
                await traerCodigos()
                alertaEditarCorrecto()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h1 className={`${productoEditar ? "text-green-600 dark:text-green-700" : "text-blue-900"} font-black text-3xl sm:text-4xl  dark:text-blue-300 text-center`}>{productoEditar ? "Editar Producto" : "Agregar Producto"}</h1>
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
                                list="nombres"
                                className="mt-2 uppercase block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="nombre"
                                placeholder="Ej. Pendrive 8Gb 3.0"
                                name="nombre"
                                autoFocus={true}
                                value={nombre}
                                onChange={onChange}
                            />
                            <datalist id="nombres">
                                {productos.map(producto => producto.nombre !== productoEditar?.nombre &&
                                    <option key={producto._id} value={producto.nombre}></option>
                                )}
                            </datalist>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="marca" className="text-gray-800 dark:text-gray-300 font-bold font ">Marca</label>
                            <input
                                type="text"
                                autoComplete="off"
                                list="marcas"
                                className="mt-2 uppercase block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="marca"
                                placeholder="Ej. Kingston"
                                name="marca"
                                value={marca}
                                onChange={onChange}
                            />
                            <datalist id="marcas">
                                {productos.map(producto => producto.marca !== "" && producto.marca !== productoEditar?.marca &&
                                    <option key={producto._id} value={producto.marca}></option>
                                )}
                            </datalist>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="modelo" className="text-gray-800 dark:text-gray-300 font-bold ">Modelo</label>
                            <input
                                type="text"
                                autoComplete="off"
                                list="modelos"
                                className="mt-2 uppercase block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="modelo"
                                placeholder="DTKN/64GB"
                                name="modelo"
                                value={modelo}
                                onChange={onChange}
                            />
                            <datalist id="modelos">
                                {productos.map(producto => producto.modelo !== "" && producto.marca !== productoEditar?.marca &&
                                    <option key={producto._id} value={producto.modelo}></option>
                                )}
                            </datalist>
                        </div>

                        <div className="mb-4">
                            <div className="flex gap-1">
                                <div className="w-1/5">
                                    <label htmlFor="codigo" className="text-gray-800 dark:text-gray-300 font-bold ">Código</label>
                                    <select
                                        onChange={onChange}
                                        className="uppercase text-center w-full  mt-2 block p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                        name="codigo"
                                        value={codigo}
                                    >
                                        <option value={codigo ? codigo : ""} className="uppercase hidden">{codigo ? codigo : "Vacío"}</option>
                                        <option value="" className="uppercase">Vacío</option>
                                        {codigos.map((code, i) => <option value={code} key={i}>{code}</option>)}

                                    </select>
                                </div>
                                <div className="w-4/5 ">
                                    <label htmlFor="barras" className="text-gray-800 dark:text-gray-300 font-bold ">Cod. barras</label>
                                    <input
                                        type="tel"
                                        autoComplete="off"
                                        className=" mt-2  p-3 uppercase w-full rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                        id="barras"
                                        placeholder="893247539457"
                                        name="barras"
                                        value={barras}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </div>



                        <div className="mb-4 flex flex-row gap-1">
                            <div className="basis-1/2">
                                <label htmlFor="garantia" className="text-gray-800 dark:text-gray-300 font-bold font ">Garantía</label>
                                <input
                                    type="text"
                                    step="any"
                                    autoComplete="off"
                                    className="mt-2 block w-full p-3 uppercase rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                    id="garantia"
                                    placeholder="2 meses"
                                    name="garantia"
                                    value={garantia}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="basis-1/2">
                                <label htmlFor="factura" className="text-gray-800 dark:text-gray-300 font-bold font ">Nro. factura compra</label>
                                <input
                                    type="text"
                                    step="any"
                                    autoComplete="off"
                                    className="mt-2 block w-full p-3 uppercase rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                    id="factura"
                                    placeholder="0014-232322"
                                    name="factura"
                                    value={factura}
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        <div className="mb-4 flex flex-row gap-1">
                            <div className="basis-1/2">
                                <label htmlFor="valor_dolar_compra" className="text-gray-800 dark:text-gray-300 font-bold font ">Cotizacion U$S</label>
                                <input
                                    type="tel"
                                    autoComplete="off"
                                    className="mt-2 block w-full p-3 uppercase rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                    id="valor_dolar_compra"
                                    placeholder="$130"
                                    name="valor_dolar_compra"
                                    value={valor_dolar_compra}
                                    onChange={onChangeNumeros}
                                />
                            </div>
                            <div className="basis-1/2">
                                <label htmlFor="precio_compra_dolar" className="text-gray-800 dark:text-gray-300 font-bold font ">Precio compra dolar</label>
                                <input
                                    type="tel"
                                    autoComplete="off"
                                    className="mt-2 block w-full p-3 uppercase rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                    id="precio_compra_dolar"
                                    placeholder="$20.23"
                                    name="precio_compra_dolar"
                                    value={precio_compra_dolar}
                                    onChange={onChangeNumeros}
                                />
                            </div>
                        </div>
                        <div className="mb-4 flex flex-row gap-1">
                            <div className="basis-1/2">

                                <label htmlFor="precio_compra_peso" className="text-gray-800 dark:text-gray-300 font-bold font ">Precio compra AR$</label>
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
                            <div className="basis-1/2">
                                <label htmlFor="precio_venta" className="text-gray-800  dark:text-gray-300 font-bold  "> Precio de venta</label>
                                <input
                                    type="tel"
                                    autoComplete="off"
                                    className="mt-2 block w-full p-3 font-black rounded-md bg-gray-50 text-red-600 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-red-600 hover:cursor-pointer focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                    id="precio_venta"
                                    placeholder="$0"
                                    name="precio_venta"
                                    value={`$ ${valorDeVenta}`}
                                    readOnly={true}

                                />
                            </div>
                        </div>


                        <div className="mb-4 flex flex-row gap-3">
                            <div className="basis-1/2">
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
                            <div className="basis-1/2">

                                <label htmlFor="limiteFaltante" className="text-gray-800  dark:text-gray-300 font-bold  ">Añadir como faltante a las: </label>
                                <div className="flex gap-1">
                                    <input
                                        type="button"
                                        className={`w-2/4 lg:w-1/4 rounded-md mt-2 block p-3 hover:cursor-pointer ${valorFaltante ? "bg-blue-200" : "bg-gray-400 "}`}
                                        onClick={() => setValorFaltante(!valorFaltante)}
                                        value={valorFaltante ? "Si" : "No"}
                                    >
                                    </input>
                                    <input
                                        type="tel"
                                        autoComplete="off"
                                        className={` ${!valorFaltante && "hover:cursor-not-allowed"} mt-2 block w-full p-3  rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300`}
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

                        <div>
                            <div className="grid grid-cols-9">
                                <label htmlFor="cantidad" className="text-gray-800 dark:text-gray-300 font-bold  col-span-1 col-start-1">Cant.</label>
                                <label htmlFor="selectp" className="text-gray-800 dark:text-gray-300 font-bold  col-span-4 col-start-2 col-end-4">Proveedores</label>
                                <label htmlFor="rubro" className="text-gray-800 dark:text-gray-300 font-bold  col-span-4 col-start-6 col-end-9">Rubro</label>
                            </div>
                            <div className="grid grid-cols-9 gap-1">
                                <div className="col-span-1">
                                    <input
                                        type="tel"
                                        autoComplete="off"
                                        className={`text-center mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300`}
                                        id="cantidad"
                                        name="cantidad"
                                        value={cantidad}
                                        onChange={e => setCantidad(e.target.value)}
                                    />
                                </div>

                                <div className="col-span-4">
                                    <select
                                        id="selectp"
                                        className="uppercase text-center mt-2 w-full block col-span-4 p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                        value={proveedorSelect} //tomo el valor de proveedor, si no existe se modifica con el option
                                        onChange={onChangeProveedorSelect}
                                    >
                                        <option value="" className="uppercase">-- Seleccione --</option>
                                        {proveedores.length ? (
                                            <>
                                                {proveedores.map((proveedor, i) => (
                                                    <option key={i} value={proveedor._id}>{`${proveedor.empresa} (${proveedor.nombre})`}</option>  //el option envia el id al proveedorselect
                                                ))}
                                            </>
                                        ) : null}
                                    </select>
                                    {todos_proveedores.length ? (
                                        <>
                                            <ul>
                                                {proveedoresIguales.map((proveedor, i) => (
                                                    <div className="flex " key={i}>
                                                        <li

                                                            className="uppercase  mt-2 ml-1 block px-2 rounded-md  bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                                        >
                                                            {`${proveedor.empresa} (${proveedor.nombre})`}
                                                        </li>
                                                        <button

                                                            type="button"
                                                            className="uppercase text-center mt-2 ml-1 block px-2 text-gray-600  h-50 rounded-full bg-gray-50 hover:bg-gray-200 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                                            value={proveedor._id}
                                                            onClick={e => eliminarProveedor(e.target.value)}
                                                        >
                                                            X
                                                        </button>
                                                    </div>
                                                ))}

                                            </ul>
                                        </>
                                    ) : null}
                                </div>
                                <div className="col-span-4">

                                    <select
                                        onChange={onChangeRubro}
                                        className="uppercase text-center mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                        name="rubro"
                                        value={rubro}
                                    >
                                        <option value="">--Seleccione--</option>
                                        {rubros.length ? (
                                            rubros.map((rubro, i) => (
                                                <option key={i} value={rubro.nombre} >{`${rubro.nombre} ${rubro.rentabilidad}%`}</option>
                                            ))
                                        ) : null}

                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="modelo" className="text-gray-800 dark:text-gray-300 font-bold ">Visibilidad</label>
                            <input
                                type="button"
                                className={`w-full rounded-md mt-2 block p-3 hover:cursor-pointer ${visible ? "bg-blue-200" : "bg-gray-400 "}`}
                                onClick={() => setVisible(!visible)}
                                value={visible ? "Visible" : "Oculto"}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <div>
                            <label
                                htmlFor="imagen"
                                className="p-3 mt-6 inline-block w-1/4 rounded-md bg-red-200 text-center font-semibold"
                            >
                                Subir imagen
                            </label>
                            <input
                                type="file"
                                name="imagen"
                                id="imagen"
                                className="hidden"
                                accept="image/jpeg, image/png, image/jpg, image/webp, image/avif"
                                onChange={e => setImage(e.target.files[0])}
                            />
                            {image.name ? <p className={`${modo && "text-white"}`}>Imagen: {" " + image.name}</p> : null}
                        </div>
                        <div className="mt-2">
                            {imagen ? (
                                <div>
                                    <Image
                                        width={200}
                                        height={200}
                                        style={{ objectFit: 'contain' }}
                                        src={`/imagenes/${imagen}`}
                                        alt="imagen producto"
                                    />
                                    <div className="mt-2 w-full">
                                        <button

                                            type="button"
                                            name="imagen"
                                            className="p-3 mt-6 w-1/4  rounded-md bg-red-200 text-center font-semibold"

                                            value=""
                                            onClick={onChange}
                                        >
                                            Eliminar imagen
                                        </button>
                                    </div>
                                </div>
                            ) : null}
                        </div>

                    </div>

                    <div className="mb-4">
                        <label htmlFor="notas" className="text-gray-800 dark:text-gray-300 font-bold ">Notas</label>
                        <textarea
                            className=" mt-2 block w-full h-28 p-3 rounded-md  bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                            id="notas"
                            placeholder="Ingresa tu notas"
                            name="notas"
                            value={notas}
                            onChange={onChange}
                        />
                    </div>
                    <input
                        type="submit"
                        value={productoEditar ? "Guardar cambios" : "Agregar producto"}
                        className={`${productoEditar ? "bg-green-600 active:bg-green-700 dark:bg-green-800 dark:active:bg-green-900" : "bg-blue-800 active:bg-blue-900 dark:bg-blue-500 dark:active:bg-blue-600"} mt-5 w-full  p-3 text-white uppercase font-bold text-lg rounded-md cursor-pointer`}
                    />
                </form>
            </div>
        </>
    )
}

export default Formulario

