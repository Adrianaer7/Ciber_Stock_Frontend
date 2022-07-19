import { useContext, useEffect, useState } from "react";
import ProductoFaltante from "./ProductoFaltante";
import faltanteContext from "../../context/faltantes/faltantesContext";
import authContext from "../../context/auth/authContext";
import Image from "next/image";

const ListadoFaltantes = () => {

    const AuthContext = useContext(authContext)
    const {modo, usuarioAutenticado} = AuthContext

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

    const [filtrando, setFiltrando] = useState("") 
    const [escribiendo, setEscribiendo] = useState(false)
    const [focus, setFocus] = useState(false)
    const [ordenCodigo, setOrdenCodigo] = useState(false)
    const [ordenNombre, setOrdenNombre] = useState(false)
    const [ordenMarca, setOrdenMarca] = useState(false)
    const [ordenModelo, setOrdenModelo] = useState(false)
    const [ordenRubro, setOrdenRubro] = useState(false)
    const [ordenProveedor, setOrdenProveedor] = useState(false)
    const [ordenDisponibles, setOrdenDisponibles] = useState(false)


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
        filtroFaltante(e.target.value.toUpperCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
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
            <h1 className="font-black dark:text-red-500 text-3xl sm:text-4xl text-red-500 text-center mt-2 sm:mt-0 mb-4 ">Listado de faltantes</h1>
            <div className="flex flex-col-reverse sm:flex-row justify-between ">
                <div className={`${focus && "ring-2"} relative my-auto p-2 w-full sm:w-2/6 xl:w-2/6 shadow dark:bg-gray-900 focus:outline-none focus:ring focus:border-blue-300 dark:text-gray-50 bg-white rounded-md md:rounded-lg`}>
                        <input 
                            type="text" 
                            className="w-10/12 xl:w-11/12 p-2 focus:outline-none dark:bg-transparent"
                            placeholder="Buscar algún faltante"
                            onChange={onChangeFiltro}
                            value={filtrando}
                            onFocus={()=> setFocus(true)}
                            onBlur={()=> setFocus(false)}
                        />
                        <div className="absolute mr-2 -inset-y-1 flex right-0 opacity-40">
                            <Image
                                src={`${modo && escribiendo ? "/close_dark.svg" : !modo && escribiendo ? "/close_light.svg": modo && !escribiendo ? "/search_light.svg" : "/search_dark.svg"}`}
                                alt="Cerrar"
                                width={30} 
                                height={30}
                                priority={true}
                                className="cursor-pointer"
                                onClick={escribiendo ? () => setFiltrando("") : null}
                            />
                        </div> 
                    </div>  
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
                {!filtrados.length && escribiendo ? (
                    <>
                        <tr className="relative p-3 text-2xl dark:text-gray-50">
                            <td>No hay resultados</td>
                        </tr>
                    </>) 
                : filtrados.length && escribiendo ?(
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