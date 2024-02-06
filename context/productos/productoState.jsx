import { useReducer } from "react";
import productoContext from "./productoContext"
import productoReducer from "./productoReducer";
import clienteAxios from "../../config/axios"
import {
    AGREGAR_PRODUCTO, 
    AGREGAR_RUBRO, 
    EDITAR_PRODUCTO, 
    ELIMINAR_PRODUCTO, 
    ELIMINAR_PRODUCTOS, 
    ELIMINAR_RUBROS, 
    ERROR_AGREGAR_PRODUCTO, 
    ERROR_AGREGAR_RUBRO, 
    FILTRAR_PRODUCTO, 
    LIMPIAR_APP, 
    LIMPIAR_SELECCIONADO, 
    LIMPIAR_VENTA, 
    OBTENER_CODIGOS, 
    OBTENER_PRODUCTOS, 
    OBTENER_RUBROS, 
    OCULTAR_ALERTA, 
    ORDENAR_CODIGO, 
    ORDENAR_CODIGO_FILTRADO, 
    ORDENAR_DISPONIBLES, 
    ORDENAR_DISPONIBLES_FILTRADO, 
    ORDENAR_MARCA, 
    ORDENAR_MARCA_FILTRADO, 
    ORDENAR_MODELO, 
    ORDENAR_MODELO_FILTRADO, 
    ORDENAR_NOMBRE, 
    ORDENAR_NOMBRE_FILTRADO, 
    ORDENAR_PRECIO, 
    ORDENAR_PRECIO_FILTRADO, 
    PRECIO_VENTA_EFECTIVO,
    PRODUCTOS_CAMBIADOS, 
    PRODUCTO_ACTUAL,
    TRAER_DOLAR_BD,
    OBTENER_GARANTIAS,
    AGREGAR_GARANTIA,
    CREAR_DOLAR,
    EDITAR_DOLAR,
    MOSTRAR_MODAL,
} from "../../types";

const ProductoState = ({children}) => {

    const initialState = {
        productos: [],
        codigos: [],
        productoSeleccionado: null,
        mensajeRubro: null,
        mensajeCodigo: null,
        filtrados: [],
        rubros: [],
        garantias: [],
        valorDeVenta: 0,
        valorDeVentaConocidos: 0,
        valorDeVentaEfectivo: 0,
        valorDeVentaTarjeta: 0,
        dolarBD: "",
        elDolarAutomatico: null,
        modal: null
    }

    const [state, dispatch] = useReducer(productoReducer, initialState)

    //crea un producto nuevo
    const agregarProducto = async (producto, cantidad, desdeForm, formData) => {
        try {
            //creo el nuevo producto
            const {data} = await clienteAxios.post("/api/productos", producto)
            if(formData) {
                await clienteAxios.post("/api/imagenes", formData)
            }
            dispatch({
                type: AGREGAR_PRODUCTO,
                payload: data.producto
            })
            //creo la nueva compra
            if(desdeForm && cantidad > 0) {
                clienteAxios.post("/api/compras", {producto, cantidad, desdeForm})
            }
            //creo la nueva garantia
            if( cantidad > 0 && producto.proveedor && producto.garantia) {
                const {garantia, proveedor, codigo} = producto
                clienteAxios.post("/api/garantias", {garantia, proveedor, codigo})
            }
            

        } catch (error) {
           dispatch({
               type: ERROR_AGREGAR_PRODUCTO,
               payload: error.response.data.msg
           })

           setTimeout(() => {
               dispatch({
                   type: OCULTAR_ALERTA
               })
           }, 3000);
        }
    }

    //crea un nuevo rubro
    const agregarRubro = async nombre => {  //envio el rubro
        try {
            
            const {data} = await clienteAxios.post("/api/rubros", {nombre})
            dispatch({
                type: AGREGAR_RUBRO,
                payload: data.rubro.nombre
            })
        } catch (error) {
            dispatch({
                type: ERROR_AGREGAR_RUBRO,
                payload: error.response.data.msg
            })
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 3000);
        }
    }

    


    //modifico el producto
    const editarProducto = async (producto, cantidad, desdeForm, formData) => {
        try {
            const {data} = await clienteAxios.put(`/api/productos/${producto._id}`, {producto, desdeForm})
            if(formData) {
                await clienteAxios.post("/api/imagenes", formData)
            }
            dispatch({
                type: EDITAR_PRODUCTO,
                payload: data.producto
            })
            if(desdeForm) {
                clienteAxios.post("/api/compras", {producto, cantidad, desdeForm})
            }
            if( cantidad > 0 && producto.proveedor && producto.garantia && desdeForm) {
                const {garantia, proveedor, codigo} = producto
                clienteAxios.post("/api/garantias", {garantia, proveedor, codigo})
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const editarProductos = async precio => {
        try {
            if(precio) {
                await clienteAxios.put("/api/productos", {precio})   //hago esto para modificar los precios segun el dolar cambia.
                await traerProductos()
            }
        } catch (error) {
            console.log(error)
        }
    }

    //trae todos los productos creados
    const traerProductos = async () => {
        try {
            const {data} = await clienteAxios("/api/productos")
            dispatch({
                type: OBTENER_PRODUCTOS,
                payload: data.productos
            })
        } catch (error) {
            console.log(error)
        }
    }

    const traerCodigos = async () => {
        const {data} = await clienteAxios("/api/codigos")
        dispatch({
            type: OBTENER_CODIGOS,
            payload: data.codigosDisponibles
        })
    }

    //trae todos los rubros creados
    const traerRubros = async () => {
        try {
            const {data} = await clienteAxios("/api/rubros")
            dispatch({
                type: OBTENER_RUBROS,
                payload: data.rubros
            })
        } catch (error) {
            console.log(error)
        }
    }

    

    const traerGarantias = async () => {
        try {
            const {data} = await clienteAxios("/api/garantias")
            dispatch({
                type: OBTENER_GARANTIAS,
                payload: data.garantias
            })
        } catch (error) {
            console.log(error)
        }
    }

    //guarda el producto seleccionado
    const productoActual = async producto => {
        try {
            dispatch({
                type: PRODUCTO_ACTUAL,
                payload: producto
            })
        } catch (error) {
            console.log(error)
        }
    }

    

    //saco el producto seleccionado del state cuando no estoy en la vista propia
    const limpiarSeleccionado = () => {
        try {
            dispatch({
                type: LIMPIAR_SELECCIONADO,
            })
        } catch (error) {
            console.log(error)
        }
    }

    //elimino un producto
    const eliminarProducto = async id => {
        try {
            await clienteAxios.delete(`/api/productos/${id}`)
            dispatch({
                type: ELIMINAR_PRODUCTO,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    //eliminar todos los productos
    const eliminarProductos = async () => {
        await clienteAxios.delete("/api/productos")
        dispatch({
            type: ELIMINAR_PRODUCTOS
        })
    }

    //eliminar todos los rubros
    const eliminarRubros = async () => {
        await clienteAxios.delete("/api/rubros")
        dispatch({
            type: ELIMINAR_RUBROS
        })
    }

    
    //filtro en el listado segun propiedades del producto
    const filtro = (palabras, stock, oculto) => {
        let filtrados = []
        let resultado
        const incluyeTodas = (descripcion) => {
            return !palabras
                    .split(' ') //creo un array y a cada palabra la pongo en un array
                    .some(p => !descripcion.includes(p))    //.some() devuelve true si encuentra algun producto que en la descripcion que tenga las mismas palabras que el array de palabras, sin importar el orden del array. Si !(niego) palabras y descripcion, me va a devolver true cuando encuentre el producto que contenga en la descripcion alguna de las palabras que hay en el array de palabras, sin importar el orden.
        }
        
        state.productos.map(producto => {
            const {descripcion, disponibles, visibilidad} = producto
            if(palabras) {
                if(!stock && !oculto) { //no checkeo nada -----
                    if(visibilidad) {   //muestro todos los visibles
                        resultado = incluyeTodas(descripcion)
                        if(resultado) {
                            filtrados = [...filtrados, producto]
                        }
                    }
                    
                }
                if(stock && !oculto) {  //checkeo stock ----
                    if(disponibles > 0 && visibilidad) {
                        resultado = incluyeTodas(descripcion)
                        if(resultado) {
                            filtrados = [...filtrados, producto]
                        }
                    }
                } 
                if(!stock && oculto) {  //checkeo oculto ----
                    if(!visibilidad) {
                        resultado = incluyeTodas(descripcion)
                        if(resultado) {
                            filtrados = [...filtrados, producto]
                        }
                    }
                }
                if(stock && oculto) {   //checkeo stock y oculto
                    if(disponibles > 0 && !visibilidad) {
                        resultado = incluyeTodas(descripcion)
                        if(resultado) {
                            filtrados = [...filtrados, producto]
                        }
                    }
                }
            
            } else {   
                if(!stock && !oculto) {
                    if(visibilidad) {
                        filtrados = [...filtrados, producto]
                    }
                }
                if(stock && !oculto) {  //checkeo stock ----
                    if(disponibles > 0 && visibilidad) {
                        filtrados = [...filtrados, producto]
                    }
                } 
                if(!stock && oculto) {  //checkeo oculto ----
                    if(!visibilidad) {
                        filtrados = [...filtrados, producto]
                    }
                }
                if(stock && oculto) {   //checkeo stock y oculto
                    if(disponibles > 0 && !visibilidad) {
                        filtrados = [...filtrados, producto]
                    }
                }
            }
        })
        
        try {
            dispatch({
                type: FILTRAR_PRODUCTO,
                payload: filtrados
            })
        } catch (error) {
            console.log(error)
        }
    }



    //quito disponibilidad del producto
    const venderProducto = async (producto, unidades) => {
        producto.disponibles = producto.disponibles - unidades
        try {
            editarProducto(producto)
        } catch (error) {
            console.log(error)
        }
    }

    const precioVenta = (valor1, valor2, valor3, valor4) => {   //valor_dolar_compra, precio_compra_dolar, precio_compra_peso, rentabilidad
        if(valor1>0 && valor2>0 && valor4 && valor3 === "") {
            const val1 = parseFloat(valor1) //precio compra dolar
            const val2 = parseFloat(valor2) //valor dolar compra
            const res1 = (val1 * val2) * (parseInt(Math.round(parseFloat(valor4)))+100)   //redondeo el porcentaje y convierto a integer el resultado de la operacion
            const res3 = Number((res1 / 100).toFixed(2))
            if(res3) {
                try {
                    dispatch({
                        type: PRECIO_VENTA_EFECTIVO,
                        payload: {
                            res3
                        }
                    })
                } catch (error) {
                    console.log(error)
                }
            }
        } else {
            limpiarPrecioVenta()
        }
        
        if(valor1>0 && valor4 && valor3>0 && valor2==="") {
            const val3 = parseFloat(valor3) //valor peso compra
            const res3 = (val3 * (parseInt(Math.round(parseFloat(valor4)))+100) / 100)
            if(res3) {
                try {
                    dispatch({
                        type: PRECIO_VENTA_EFECTIVO,
                        payload: {
                            res3
                        }
                    })
                } catch (error) {
                    console.log(error)
                }
            } else {
                limpiarPrecioVenta()
            }
        }
    }

    const limpiarPrecioVenta = () => {
        dispatch({
            type: LIMPIAR_VENTA
        })
    }


    const traerDolarAPI = async () => {
        try {
            const url = "https://mercados.ambito.com//dolar/informal/variacion"
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            const valor = {precio: Number((resultado.venta).replace(",",".")), automatico: true}
            const {data} = await clienteAxios.post("/api/dolares", valor)
            if(data.dolar) {    //cuando se crea el dolar automatico por 1° vez me devuelve el objeto dolar
                dispatch({
                    type: CREAR_DOLAR,
                    payload: data.dolar.precio
                })
            } else {    //si ya está creado el dolar automatico, y tiene el mismo valor que el que le quiero pasar, no me devuelve "dolar", sino el precio
                dispatch({
                    type: CREAR_DOLAR,
                    payload: data.precio
                })
            }
        } catch (error) {
            console.log(error)
            await traerProductos()  //por si no hay conexion a internet
        }
    }


    const traerDolarBD = async () => {
        try {
            const {data} = await clienteAxios("/api/dolares")
            if(!data.dolar[0]) {  //si no existe ningun dolar, creo uno trayendolo de la api
                traerDolarAPI()
            } else {
                const {dolar} = data
                if(dolar[0].automatico) {   //si ya existe el un dolar automatico creado, le envio el nuevo valor
                    traerDolarAPI()
                } else {    //si existe un dolar pero no es automatico, solamente me traigo el valor que haya en la bd
                    dispatch({
                        type: TRAER_DOLAR_BD,
                        payload: data.dolar[0].precio
                    })
                }
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    const editarDolarDB = async (dolarManual, automatico) => {
        try {
            if(!automatico) {   //cuando pongo dolar manualmente
                const {data} = await clienteAxios.put("/api/dolares", {dolarManual, automatico})
                dispatch({
                    type: EDITAR_DOLAR,
                    payload: {
                        precio: data.dolar.precio,
                        automatico
                    }
                })
            } else {    //cuando elimino el dolar manual
                await clienteAxios.put("/api/dolares", {automatico})
                traerDolarAPI()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const orderCodigo = (ordenCodigo) => {
        dispatch({
            type: ORDENAR_CODIGO,
            payload: ordenCodigo
        })
    }
    const orderPrecio = (ordenPrecio) => {
        dispatch({
            type: ORDENAR_PRECIO,
            payload: ordenPrecio
        })
    }
    const orderNombre = (ordenNombre) => {
        dispatch({
            type: ORDENAR_NOMBRE,
            payload: ordenNombre
        })
    }
    const orderMarca = (ordenMarca) => {
        dispatch({
            type: ORDENAR_MARCA,
            payload: ordenMarca
        })
    }
    const orderModelo = (ordenModelo) => {
        dispatch({
            type: ORDENAR_MODELO,
            payload: ordenModelo
        })
    }
    const orderDisponibles = (ordenDisponibles) => {
        dispatch({
            type: ORDENAR_DISPONIBLES,
            payload: ordenDisponibles
        })
    }
    const orderCodigoFiltrados = (ordenCodigo) => {
        dispatch({
            type: ORDENAR_CODIGO_FILTRADO,
            payload: ordenCodigo
        })
    }
    
    const orderPrecioFiltrados = (ordenPrecio) => {
        dispatch({
            type: ORDENAR_PRECIO_FILTRADO,
            payload: ordenPrecio
        })
    }
    const orderNombreFiltrados = (ordenNombre) => {
        dispatch({
            type: ORDENAR_NOMBRE_FILTRADO,
            payload: ordenNombre
        })
    }
    const orderMarcaFiltrados = (ordenMarca) => {
        dispatch({
            type: ORDENAR_MARCA_FILTRADO,
            payload: ordenMarca
        })
    }
    const orderModeloFiltrados = (ordenModelo) => {
        dispatch({
            type: ORDENAR_MODELO_FILTRADO,
            payload: ordenModelo
        })
    }
    const orderDisponiblesFiltrados = (ordenDisponibles) => {
        dispatch({
            type: ORDENAR_DISPONIBLES_FILTRADO,
            payload: ordenDisponibles
        })
    }

    const mostrarModal = (boolean) => {
        dispatch({
            type: MOSTRAR_MODAL,
            payload: boolean
        })
    }
    
    const descargarPDF = async () => {
        const {data} = await clienteAxios("api/descargas")
        console.log(data)
    }

    const limpiarApp = () => {
        dispatch({
            type: LIMPIAR_APP
        })
    }
    
    return (
        <productoContext.Provider
            value={{
                productos: state.productos,
                codigos: state.codigos,
                productoSeleccionado: state.productoSeleccionado,
                mensajeCodigo: state.mensajeCodigo,
                mensajeRubro: state.mensajeRubro,
                filtrados: state.filtrados,
                rubros: state.rubros,
                garantias: state.garantias,
                valorDeVenta: state.valorDeVenta,
                valorDeVentaConocidos: state.valorDeVentaConocidos,
                valorDeVentaEfectivo: state.valorDeVentaEfectivo,
                valorDeVentaTarjeta: state.valorDeVentaTarjeta,
                dolarBD: state.dolarBD,
                elDolarAutomatico: state.elDolarAutomatico,
                modal: state.modal,
                agregarProducto,
                traerProductos,
                traerRubros,
                traerGarantias,
                traerCodigos,
                productoActual,
                editarProducto,
                limpiarSeleccionado,
                eliminarProducto,
                filtro,
                agregarRubro,
                venderProducto,
                eliminarProductos,
                eliminarRubros,
                precioVenta,
                limpiarPrecioVenta,
                traerDolarAPI,
                traerDolarBD,
                editarDolarDB,
                editarProductos,
                orderCodigo,
                orderCodigoFiltrados,
                orderPrecio,
                orderPrecioFiltrados,
                orderNombre,
                orderNombreFiltrados,
                orderMarca,
                orderMarcaFiltrados,
                orderModelo,
                orderModeloFiltrados,
                orderDisponibles,
                orderDisponiblesFiltrados,
                mostrarModal,
                limpiarApp,
                descargarPDF
            }}
        >
            {children}
        </productoContext.Provider>
    )

}

export default ProductoState