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
    },[])

    useEffect(() => {
        traerFaltantes()
    }, [])

    useEffect(() => {
        if(filtrando) {
            orderCodigoFiltrados(ordenCodigo)
        }
        orderCodigo(ordenCodigo)
    },[ordenCodigo])
    useEffect(() => {
        if(filtrando) {
            orderNombreFiltrados(ordenNombre)
        }
        orderNombre(ordenNombre)
    }, [ordenNombre])
    useEffect(() => {
        if(filtrando) {
            orderMarcaFiltrados(ordenMarca)
        }
        orderMarca(ordenMarca)
    }, [ordenMarca])
    useEffect(() => {
        if(filtrando) {
            orderModeloFiltrados(ordenModelo)
        }
        orderModelo(ordenModelo)
    }, [ordenModelo])
    useEffect(() => {
        if(filtrando) {
            orderRubroFiltrados(ordenRubro)
        }
        orderRubro(ordenRubro)
    }, [ordenRubro])
    useEffect(() => {
        if(filtrando) {
            orderProveedorFiltrados(ordenProveedor)
        }
        orderProveedor(ordenProveedor)
    }, [ordenProveedor])
    useEffect(() => {
        if(filtrando) {
            orderDisponiblesFiltrados(ordenDisponibles)
        }
        orderDisponibles(ordenDisponibles)
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
        <div className="  absolute  lg:relative">
            <h1 className="text-red-700 font-black text-4xl  dark:text-red-500 text-center">Faltantes</h1>
            <p className="mt-3 text-center text-black dark:text-gray-50">Lista de todos los productos con poco stock</p>
            <div className="flex flex-col lg:flex-row justify-between w-4/4">
                <input 
                    type="text" 
                    className="lg:w-2/6  p-4 shadow dark:bg-gray-900  focus:outline-none focus:ring focus:border-blue-300 dark:text-gray-50 rounded-lg" //outline-none le quita el borde default, focus-ring le pone borde
                    placeholder="Buscar algún producto faltante" 
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