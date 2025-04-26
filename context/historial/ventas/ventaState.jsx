import { useReducer } from "react"
import ventaContext from "./ventaContext"
import ventaReducer from "./ventaReducer"
import clienteAxios from "../../../config/axios"

import {
    CREAR_VENTA,
    EDITAR_VENTA,
    ELIMINAR_VENTA,
    FILTRO_VENTA, TRAER_VENTAS
} from "../../../types/index"


const VentaState = ({ children }) => {

    const initialState = {
        ventas: [],
        filtradas: []
    }

    const [state, dispatch] = useReducer(ventaReducer, initialState)

    const agregarVenta = async (producto, valor_dolar, unidades, fecha) => {
        const { _id, codigo, nombre, marca, modelo, barras, precio_venta_tarjeta, precio_venta_pesos, descripcion } = producto

        const venta = {
            idProducto: _id,
            codigo,
            nombre,
            marca,
            modelo,
            barras,
            descripcion,
            dolar: valor_dolar,
            existeProducto: true,
            precioEnDolar: (precio_venta_tarjeta / valor_dolar).toFixed(2),
            precioEnArs: precio_venta_tarjeta,
            unidades,
            fecha
        }

        try {
            const { data } = await clienteAxios.post("/ventas", venta)
            dispatch({
                type: CREAR_VENTA,
                payload: data.venta
            })
        } catch (error) {
            console.log(error.response.data)
            return error.response.data.msg
        }

    }

    const traerVentas = async () => {
        try {
            const { data } = await clienteAxios("/ventas")
            dispatch({
                type: TRAER_VENTAS,
                payload: data.ventas
            })
        } catch (error) {
            console.log(error)
        }

    }

    const editarVenta = async (id, idProducto, cantidad) => {
        try {
            const { data } = await clienteAxios.put(`/ventas/${id}`, { idProducto, cantidad })
            dispatch({
                type: EDITAR_VENTA,
                payload: data.venta
            })
        } catch (error) {
            console.log(error.response.data)
            return error.response.data.msg
        }

    }

    const filtroVenta = (palabras, fechaDesde, fechaHasta) => {
        // Si no hay ni palabras ni fechas, limpiamos los resultados
        const sinPalabras = !palabras || palabras.trim() === '';
        const sinFechas = !fechaDesde || !fechaHasta;

        if (sinPalabras && sinFechas) {
            dispatch({
                type: FILTRO_VENTA,
                payload: []
            });
            return;
        }

        const incluyeTodas = (descripcion) => {
            return palabras
                ?.split(' ')
                .every(p => descripcion.includes(p));
        };

        const enRangoDeFechas = (fecha) => {
            if (sinFechas || fechaDesde > fechaHasta) return true;
            return fecha >= fechaDesde && fecha <= fechaHasta;
        };

        const filtradas = state.ventas.filter(({ descripcion, fecha }) => {
            const pasaFiltroTexto = sinPalabras ? true : incluyeTodas(descripcion);
            const pasaFiltroFecha = enRangoDeFechas(fecha);
            return pasaFiltroTexto && pasaFiltroFecha;
        });

        try {
            dispatch({
                type: FILTRO_VENTA,
                payload: filtradas
            });
        } catch (error) {
            console.log(error);
        }
    };



    const eliminarVenta = async (id, idProducto, cantidad) => {
        try {
            clienteAxios.delete(`/ventas/${id}`, { idProducto, cantidad })

            dispatch({
                type: ELIMINAR_VENTA,
                payload: id
            })
        } catch (error) {
            console.log(error.response.data)
            return error.response.data.msg
        }
    }


    return (
        <ventaContext.Provider
            value={{
                ventas: state.ventas,
                filtradas: state.filtradas,
                agregarVenta,
                traerVentas,
                editarVenta,
                filtroVenta,
                eliminarVenta
            }}
        >
            {children}
        </ventaContext.Provider>
    )
}

export default VentaState;