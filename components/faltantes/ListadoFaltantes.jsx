import { useContext, useEffect, useState } from "react";
import ProductoFaltante from "./ProductoFaltante";
import faltanteContext from "../../context/faltantes/faltantesContext";
import authContext from "../../context/auth/authContext";
const ListadoFaltantes = () => {


    const faltantesContext = useContext(faltanteContext)
    const {
        faltantes, 
        traerFaltantes, 
        filtroFaltante, 
        filtrados,
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
    } = faltantesContext

    const [filtrando, setFiltrando] = useState("")    //contiene lo que voy escribiendo
    const [escribiendo, setEscribiendo] = useState(false)   //cuando escribo pasa a true
    const [ordenCodigo, setOrdenCodigo] = useState(false)
    const [ordenNombre, setOrdenNombre] = useState(false)
    const [ordenMarca, setOrdenMarca] = useState(false)
    const [ordenModelo, setOrdenModelo] = useState(false)
    const [ordenRubro, setOrdenRubro] = useState(false)
    const [ordenProveedor, setOrdenProveedor] = useState(false)
    const [ordenDisponibles, setOrdenDisponibles] = useState(false)

    const AuthContext = useContext(authContext)
    const {usuarioAutenticado} = AuthContext

    useEffect(() => {
        usuarioAutenticado()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        traerFaltantes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(filtrando) {
            orderCodigoFiltrados(ordenCodigo)
        }
        orderCodigo(ordenCodigo)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ordenCodigo])
    useEffect(() => {
        if(filtrando) {
            orderNombreFiltrados(ordenNombre)
        }
        orderNombre(ordenNombre)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ordenNombre])
    useEffect(() => {
        if(filtrando) {
            orderMarcaFiltrados(ordenMarca)
        }
        orderMarca(ordenMarca)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ordenMarca])
    useEffect(() => {
        if(filtrando) {
            orderModeloFiltrados(ordenModelo)
        }
        orderModelo(ordenModelo)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ordenModelo])
    useEffect(() => {
        if(filtrando) {
            orderRubroFiltrados(ordenRubro)
        }
        orderRubro(ordenRubro)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ordenRubro])
    useEffect(() => {
        if(filtrando) {
            orderProveedorFiltrados(ordenProveedor)
        }
        orderProveedor(ordenProveedor)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ordenProveedor])
    useEffect(() => {
        if(filtrando) {
            orderDisponiblesFiltrados(ordenDisponibles)
        }
        orderDisponibles(ordenDisponibles)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ordenDisponibles])
    

    useEffect(() => {
        if(filtrando) {
            setEscribiendo(true)
        } else {
            setEscribiendo(false)
        }
    }, [filtrando])

    const onChangeFiltro = e => {
        setFiltrando(e.target.value)
        filtroFaltante(e.target.value)  //envio al productoState
    }

    const ordenarCodigo = () => {
        setOrdenCodigo(!ordenCodigo)
    }
    const ordenarNombre = () => {
        setOrdenNombre(!ordenNombre)
    }
    const ordenarMarca = () => {
        setOrdenMarca(!ordenMarca)
    }
    const ordenarModelo = () => {
        setOrdenModelo(!ordenModelo)
    }
    const ordenarRubro = () => {
        setOrdenRubro(!ordenRubro)
    }
    const ordenarProveedor = () => {
        setOrdenProveedor(!ordenProveedor)
    }
    const ordenarDisponibles = () => {
        setOrdenDisponibles(!ordenDisponibles)
    }

  return (
    <>   
        <div className="absolute lg:relative min-w-full m-0">
        <h1 className="font-black dark:text-blue-300 text-3xl sm:text-4xl text-blue-900 text-center mt-2 sm:mt-0 mb-4 ">Listado de productos</h1>
        <div className="flex flex-col-reverse sm:flex-row justify-between ">
            <input 
                type="text" 
                className="w-full sm:w-3/6 md:w-2/6 p-4 shadow dark:bg-gray-900 focus:outline-none focus:ring focus:border-blue-300 dark:text-gray-50 rounded-md md:rounded-lg" //outline-none le quita el borde default, focus-ring le pone borde
                placeholder="Buscar algún producto" 
                onChange={onChangeFiltro}
            />
            
            
        </div>    
    </div>
        <table className="relative top-44 sm:top-44 lg:top-0 w-full mt-5 table-auto shadow rounded-lg dark:bg-gray-900 bg-white ">
            <thead className="bg-red-600 text-white">
                <tr className="hover:cursor-pointer select-none">
                    <th  onClick={() => ordenarCodigo()} className="p-2 rounded-tl-lg">CODIGO</th>
                    <th onClick={() => ordenarNombre()}>NOMBRE</th>
                    <th onClick={() => ordenarMarca()}>MARCA</th>
                    <th onClick={() => ordenarModelo()}>MODELO</th>
                    <th onClick={() => ordenarRubro()}>RUBRO</th>
                    <th onClick={() => ordenarProveedor()}>PROVEEDOR</th>
                    <th onClick={() => ordenarDisponibles()}>DISPONIBLES</th>
                    <th className="rounded-tr-lg">ACCIONES</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(filtrados).length === 0 && escribiendo ? (
                    <>
                        <tr className="relative p-3 text-2xl dark:text-gray-50">
                            <td>No hay resultados</td>
                        </tr>
                    </>) 
                : Object.keys(filtrados).length > 0 && escribiendo ?(
                    <>
                        {filtrados.map(producto => (
                            <ProductoFaltante
                                key={producto._id}
                                producto={producto}
                            />
                        ))}
                    </>)
                : (
                <>
                    {faltantes.map(producto => (
                        <ProductoFaltante
                            key={producto._id}
                            producto={producto}
                        />
                    ))}
                </>
                )}  
            </tbody>
        </table>
    </>
  )
}

export default ListadoFaltantes