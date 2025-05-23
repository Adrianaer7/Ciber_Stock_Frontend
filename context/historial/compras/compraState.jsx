import { useReducer } from "react"
import compraContext from "./compraContext"
import compraReducer from "./compraReducer"
import clienteAxios from "../../../config/axios"

import {
    CREAR_COMPRA,
    TRAER_COMPRAS,
    FILTRO_COMPRA,
    ORDENAR_NOMBRE_COMPRA,
    ORDENAR_MARCA_COMPRA,
    ORDENAR_MODELO_COMPRA,
    ORDENAR_CODIGO_COMPRA_FILTRADO,
    ORDENAR_NOMBRE_COMPRA_FILTRADO,
    ORDENAR_MARCA_COMPRA_FILTRADO,
} from "../../../types/index"


const CompraState = ({ children }) => {

    const initialState = {
        compras: [],
        filtrados: []
    }

    const [state, dispatch] = useReducer(compraReducer, initialState)

    //agregar compra
    const compraDeProducto = async (producto, cantidad) => {
        const { data } = await clienteAxios.post("/compras", { producto, cantidad }) //envio producto como objeto porque sino no puedo extraer su _id en el backend
        dispatch({
            type: CREAR_COMPRA,
            payload: data.compra
        })
    }

    const traerCompras = async () => {
        const { data } = await clienteAxios("/compras")
        dispatch({
            type: TRAER_COMPRAS,
            payload: data.todas
        })
    }

    const filtroCompra = (palabras) => {
        if (!palabras) return;

        const incluyeTodas = (descripcion, palabras) => {
            const descripcionUpper = descripcion.toUpperCase();
            return palabras
                .split(' ')
                .every(p => descripcionUpper.includes(p));
        };

        const filtrados = state.compras.filter(({ descripcion }) =>
            incluyeTodas(descripcion, palabras)
        );

        try {
            dispatch({
                type: FILTRO_COMPRA,
                payload: filtrados
            });
        } catch (error) {
            console.log(error);
        }
    };



    const orderNombre = (ordenNombre) => {
        dispatch({
            type: ORDENAR_NOMBRE_COMPRA,
            payload: ordenNombre
        })
    }
    const orderMarca = (ordenMarca) => {
        dispatch({
            type: ORDENAR_MARCA_COMPRA,
            payload: ordenMarca
        })
    }
    const orderModelo = (ordenModelo) => {
        dispatch({
            type: ORDENAR_MODELO_COMPRA,
            payload: ordenModelo
        })
    }



    const orderNombreFiltrados = (orderNombre) => {
        dispatch({
            type: ORDENAR_NOMBRE_COMPRA_FILTRADO,
            payload: orderNombre
        })
    }
    const orderMarcaFiltrados = (ordenMarca) => {
        dispatch({
            type: ORDENAR_MARCA_COMPRA_FILTRADO,
            payload: ordenMarca
        })
    }
    const orderModeloFiltrados = (ordenModelo) => {
        dispatch({
            type: ORDENAR_CODIGO_COMPRA_FILTRADO,
            payload: ordenModelo
        })
    }



    return (
        <compraContext.Provider
            value={{
                compras: state.compras,
                filtrados: state.filtrados,
                compraDeProducto,
                traerCompras,
                orderNombre,
                orderNombreFiltrados,
                orderMarca,
                orderMarcaFiltrados,
                orderModelo,
                orderModeloFiltrados,
                filtroCompra
            }}
        >
            {children}
        </compraContext.Provider>
    )
}

export default CompraState