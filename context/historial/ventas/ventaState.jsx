import {useReducer } from "react"
import ventaContext from "./ventaContext"
import ventaReducer from "./ventaReducer"
import clienteAxios from "../../../config/axios"

import {
    CREAR_VENTA,
    EDITAR_VENTA,
    ELIMINAR_VENTA,
    FILTRO_VENTA, TRAER_VENTAS
} from "../../../types/index"


const VentaState = ({children}) => {

    const initialState = {
        ventas: [],
        filtradas: []
    }

    const [state, dispatch] = useReducer(ventaReducer, initialState)

    const agregarVenta = async (producto, valor_dolar, unidades, fecha) => {
        const {_id, codigo, nombre, marca, modelo, barras, precio_venta_tarjeta, descripcion } = producto

        const venta = {
            idProducto: _id,
            codigo,
            nombre,
            marca,
            modelo,
            barras,
            descripcion,
            dolar: valor_dolar,
            precioEnDolar: (precio_venta_tarjeta / valor_dolar).toFixed(2),
            unidades,
            fecha
        }
        
        try {
            const {data} = await clienteAxios.post("api/ventas", venta)
            dispatch({
                type: CREAR_VENTA,
                payload: data.venta
            })
        } catch (error) {
            console.log(error)
        }

    }

    const traerVentas = async () => {
        try {
            const {data} = await clienteAxios("/api/ventas")
            dispatch({
                type: TRAER_VENTAS,
                payload: data.ventas
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    const editarVenta = async(id, cantidad) => {
        try {
            const {data} = await clienteAxios.put(`/api/ventas/${id}`, {cantidad})
            dispatch({
                type: EDITAR_VENTA,
                payload: data.venta
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    const eliminarVenta = async (id) => {
        try {
            clienteAxios.delete(`/api/ventas/${id}`)
            dispatch({
                type: ELIMINAR_VENTA,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }

    const filtroVenta = palabras => {
        let filtrados = []
        state.ventas.map(venta => {
            const {descripcion} = venta

            const incluyeTodas = () => {
                return !palabras
                        .split(' ')
                        .some(p => !descripcion.includes(p))    //.some() comprueba si al menos 1 elemento cumple con la concidion.
            }
            
            const resultado = incluyeTodas()
            if(resultado) {
                filtrados = [...filtrados, venta]
            }
        })
        try {
            dispatch({
                type: FILTRO_VENTA,
                payload: filtrados
            })
        } catch (error) {
            console.log(error)
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
            eliminarVenta
        }}
    >
        {children}
    </ventaContext.Provider>
  )
}

export default VentaState;