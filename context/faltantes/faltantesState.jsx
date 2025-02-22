import { useReducer } from "react"
import clienteAxios from "../../config/axios"
import faltantesReducer from "./faltantesReducer"
import faltantesContext from "./faltantesContext"

import { 
    AGREGAR_FALTANTE, 
    ELIMINAR_FALTANTE, 
    FILTRO_FALTANTE, 
    ORDENAR_CODIGO_FALTANTE, 
    ORDENAR_CODIGO_FALTANTE_FILTRADO, 
    ORDENAR_DISPONIBLES_FALTANTE, 
    ORDENAR_DISPONIBLES_FALTANTE_FILTRADO, 
    ORDENAR_MARCA_FALTANTE, 
    ORDENAR_MARCA_FALTANTE_FILTRADO, 
    ORDENAR_MODELO_FALTANTE, 
    ORDENAR_NOMBRE_FALTANTE, 
    ORDENAR_NOMBRE_FALTANTE_FILTRADO, 
    ORDENAR_PROVEEDOR_FALTANTE, 
    ORDENAR_PROVEEDOR_FALTANTE_FILTRADO, 
    ORDENAR_RUBRO_FALTANTE, 
    ORDENAR_RUBRO_FALTANTE_FILTRADO, 
    TRAER_FALTANTES 
} from "../../types"

const FaltanteState = ({children}) => {

    const initialState = {
        faltantes: [],
        filtrados: []
    }

    const [state, dispatch] = useReducer(faltantesReducer, initialState)

    const agregarFaltante = async (id) => {   //modifico el valor de faltante a true y agrego el producto al state
        try {
            const {data} = await clienteAxios.put(`/faltantes/${id}`)
            dispatch({
                type: AGREGAR_FALTANTE,
                payload: data.producto
            })
        } catch (error) {
            console.log(error)
        }
    }

    const traerFaltantes = async () => {
        try {
            const {data} = await clienteAxios("/faltantes")
            dispatch({
                type: TRAER_FALTANTES,
                payload: data.faltantes
            })
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarFaltante = async (id) => {    //modifico el valor de faltante a false y elimino el producto del state
        try {
            await clienteAxios.put(`/faltantes/${id}`)
            dispatch({
                type: ELIMINAR_FALTANTE,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }    
    
    const filtroFaltante = (palabras) => {
        let filtrados = []
        state.faltantes.map(faltante => {
            const {descripcion} = faltante
            const incluyeTodas = () => {
                return !palabras
                        .split(' ')
                        .some(p => !descripcion.includes(p))    //.some() comprueba si al menos 1 elemento cumple con la concidion.
            }
            
            const resultado = incluyeTodas()
            if(resultado) {
                filtrados = [...filtrados, faltante]
            }
        })
        try {
            dispatch({
                type: FILTRO_FALTANTE,
                payload: filtrados
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    const orderCodigo = (ordenCodigo) => {
        dispatch({
            type: ORDENAR_CODIGO_FALTANTE,
            payload: ordenCodigo
        })
    }
    const orderNombre = (ordenNombre) => {
        dispatch({
            type: ORDENAR_NOMBRE_FALTANTE,
            payload: ordenNombre
        })
    }
    const orderMarca = (ordenMarca) => {
        dispatch({
            type: ORDENAR_MARCA_FALTANTE,
            payload: ordenMarca
        })
    }
    const orderModelo = (ordenModelo) => {
        dispatch({
            type: ORDENAR_MODELO_FALTANTE,
            payload: ordenModelo
        })
    }
    const orderRubro = (ordenRubro) => {
        dispatch({
            type: ORDENAR_RUBRO_FALTANTE,
            payload: ordenRubro
        })
    }
    const orderProveedor = (ordenProveedor) => {
        dispatch({
            type: ORDENAR_PROVEEDOR_FALTANTE,
            payload: ordenProveedor
        })
    }
    const orderDisponibles = (ordenDisponibles) => {
        dispatch({
            type: ORDENAR_DISPONIBLES_FALTANTE,
            payload: ordenDisponibles
        })
    }
    const orderCodigoFiltrados = (ordenCodigo) => {
        dispatch({
            type: ORDENAR_CODIGO_FALTANTE_FILTRADO,
            payload: ordenCodigo
        })
    }
    const orderNombreFiltrados = (orderNombre) => {
        dispatch({
            type: ORDENAR_NOMBRE_FALTANTE_FILTRADO,
            payload: orderNombre
        })
    }
    const orderMarcaFiltrados = (ordenMarca) => {
        dispatch({
            type: ORDENAR_MARCA_FALTANTE_FILTRADO,
            payload: ordenMarca
        })
    }
    const orderModeloFiltrados = (ordenModelo) => {
        dispatch({
            type: ORDENAR_CODIGO_FALTANTE_FILTRADO,
            payload: ordenModelo
        })
    }
    const orderRubroFiltrados = (ordenRubro) => {
        dispatch({
            type: ORDENAR_RUBRO_FALTANTE_FILTRADO,
            payload: ordenRubro
        })
    }
    const orderProveedorFiltrados = (ordenproveedor) => {
        dispatch({
            type: ORDENAR_PROVEEDOR_FALTANTE_FILTRADO,
            payload: ordenproveedor
        })
    }
    const orderDisponiblesFiltrados = (ordenDisponibles) => {
        dispatch({
            type: ORDENAR_DISPONIBLES_FALTANTE_FILTRADO,
            payload: ordenDisponibles
        })
    }
  return (
      <faltantesContext.Provider
        value={{
            faltantes: state.faltantes,
            filtrados: state.filtrados,
            agregarFaltante,
            traerFaltantes,
            eliminarFaltante,
            orderCodigo,
            orderCodigoFiltrados,
            orderNombre,
            orderNombreFiltrados,
            orderMarca,
            orderMarcaFiltrados,
            orderModelo,
            orderModeloFiltrados,
            orderRubro,
            orderRubroFiltrados,
            orderProveedor,
            orderProveedorFiltrados,
            orderDisponibles,
            orderDisponiblesFiltrados,
            filtroFaltante
        }}
      >
          {children}
      </faltantesContext.Provider>
  )
}

export default FaltanteState