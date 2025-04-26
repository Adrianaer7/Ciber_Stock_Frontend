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
    PRODUCTO_ACTUAL,
    OBTENER_GARANTIAS,
    CREAR_DOLAR,
    EDITAR_DOLAR,
    MOSTRAR_MODAL,
} from "../../types";

const ProductoState = ({ children }) => {

    const initialState = {
        productos: [],
        codigos: [],
        productoSeleccionado: null,
        mensajeRubro: null,
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
            const { data } = await clienteAxios.post("/productos", producto)
            if (formData) {
                await clienteAxios.post("/imagenes", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data' // Asegúrate de establecer el header correcto
                    }
                });
            }
            dispatch({
                type: AGREGAR_PRODUCTO,
                payload: data.producto
            })
            //creo la nueva compra
            if (desdeForm && cantidad > 0) {
                clienteAxios.post("/compras", { producto, cantidad, desdeForm })
            }
            //creo la nueva garantia
            if (cantidad > 0 && producto.proveedor && producto.garantia) {
                const { garantia, proveedor, codigo } = producto
                clienteAxios.post("/garantias", { garantia, proveedor, codigo })
            }


        } catch (error) {
            console.log(error.response.data)
            return error.response.data.msg
        }
    }

    //crea un nuevo rubro
    const agregarRubro = async nombre => {  //envio el rubro
        try {

            const { data } = await clienteAxios.post("/rubros", { nombre })
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
            const { data } = await clienteAxios.put(`/productos/${producto._id}`, { producto, desdeForm })
            if (formData) {
                await clienteAxios.post("/imagenes", formData)
            }
            dispatch({
                type: EDITAR_PRODUCTO,
                payload: data.producto
            })
            if (desdeForm) {
                clienteAxios.post("/compras", { producto, cantidad, desdeForm })
            }
            if (cantidad > 0 && producto.proveedor && producto.garantia && desdeForm) {
                const { garantia, proveedor, codigo } = producto
                clienteAxios.post("/garantias", { garantia, proveedor, codigo })
            }

        } catch (error) {
            console.log(error.response.data)
            return error.response.data.msg
        }
    }

    const editarProductos = async precio => {
        try {
            if (precio) {
                await traerProductos()
            }
        } catch (error) {
            console.log(error)
        }
    }

    //trae todos los productos creados
    const traerProductos = async () => {
        try {
            const { data } = await clienteAxios("/productos")
            dispatch({
                type: OBTENER_PRODUCTOS,
                payload: data.productos
            })
        } catch (error) {
            console.log(error)
        }
    }

    const traerCodigos = async () => {
        const { data } = await clienteAxios("/codigos")
        dispatch({
            type: OBTENER_CODIGOS,
            payload: data.codigosDisponibles
        })
    }

    //trae todos los rubros creados
    const traerRubros = async () => {
        try {
            const { data } = await clienteAxios("/rubros")
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
            const { data } = await clienteAxios("/garantias")
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
            await clienteAxios.delete(`/productos/${id}`)
            dispatch({
                type: ELIMINAR_PRODUCTO,
                payload: id
            })
        } catch (error) {
            console.log(error.reponse.data)
            return error.response.data.msg
        }

    }

    //eliminar todos los productos
    const eliminarProductos = async () => {
        await clienteAxios.delete("/productos")
        dispatch({
            type: ELIMINAR_PRODUCTOS
        })
    }

    //eliminar todos los rubros
    const eliminarRubros = async () => {
        await clienteAxios.delete("/rubros")
        dispatch({
            type: ELIMINAR_RUBROS
        })
    }


    //filtro en el listado segun propiedades del producto
    const filtro = (palabras, stock, oculto) => {

        const incluyeTodas = (descripcion, palabras) => {
            if (!palabras) return true
            const palabrasArray = palabras.split(' ')
            // Verificamos que *todas* las palabras del input estén incluidas en la descripción
            return palabrasArray.every(p => descripcion.includes(p))   //si encuentra devuelve true
        }

        const filtrados = state.productos.filter(producto => {
            const { descripcion, disponibles, visibilidad } = producto

            // Filtro por palabras
            if (!incluyeTodas(descripcion, palabras)) return false  //retorno false solo en caso que no encuentre coincidencias con las palabras ingresadas, entonces sigue con el siguiente producto del array
    
            // Filtro por stock y visibilidad
            const cumpleStock = stock ? disponibles > 0 : true  //siempre va a devolver true a menos que stock sea true y disponibles sea 0
            const cumpleVisibilidad = oculto ? !visibilidad : visibilidad
            //si oculto es true y visibilidad true, devuelvo false, entonces este producto está como visible y no lo agrego al array
            //si oculto es true y visibilidad false, devuelvo true, entonces este producto está invisible y lo agrego al array
            //si oculto es false y visibilidad true, devuelvo true, entonces este producto está visible y lo agrego al array
            //si oculto es false y visibilidad false, devuelvo false, entonces este producto está invisible y no lo agrego al array

            return cumpleStock && cumpleVisibilidad //si los dos son true, agrega el producto al array filtrados
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
            console.log(error.response.data)
            return error.response.data.msg
        }
    }

    const precioVenta = (valor1, valor2, valor3, valor4) => {   //valor_dolar_compra, precio_compra_dolar, precio_compra_peso, rentabilidad
        if (valor1 > 0 && valor2 > 0 && valor4 && !valor3) {
            const val1 = parseFloat(valor1) //precio compra dolar
            const val2 = parseFloat(valor2) //valor dolar compra
            const res1 = (val1 * val2) * (parseInt(Math.round(parseFloat(valor4))) + 100)   //redondeo el porcentaje y convierto a integer el resultado de la operacion
            const res3 = Number((res1 / 100).toFixed(2))
            if (res3) {
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

        if (valor1 > 0 && valor4 && valor3 > 0 && !valor2) {
            const val3 = parseFloat(valor3) //valor peso compra
            const res3 = (val3 * (parseInt(Math.round(parseFloat(valor4))) + 100) / 100)
            if (res3) {
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

    const traerDolarBD = async () => {
        try {
            const { data } = await clienteAxios("/dolares")
            dispatch({
                type: CREAR_DOLAR,
                payload: {
                    precio: data.precio,
                    automatico: data.automatico
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const editarDolarDB = async (dolarManual, automatico) => {
        try {
            if (!automatico) {   //cuando pongo dolar manualmente
                const { data } = await clienteAxios.put("/dolares", { dolarManual, automatico })
                dispatch({
                    type: EDITAR_DOLAR,
                    payload: {
                        precio: data.precio,
                        automatico
                    }
                })
            } else {    //cuando elimino el dolar manual
                const { data } =  await clienteAxios.put("/dolares", { automatico })
                dispatch({
                    type: EDITAR_DOLAR,
                    payload: {
                        precio: data.precio,
                        automatico
                    }
                })
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
        const { data } = await clienteAxios("api/descargas")
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