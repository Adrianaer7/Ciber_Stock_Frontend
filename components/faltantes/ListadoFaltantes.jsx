import { useContext, useEffect, useState } from "react";
import ProductoFaltante from "./ProductoFaltante";
import faltanteContext from "../../context/faltantes/faltantesContext";
import proveedorContext from "../../context/proveedores/proveedorContext";
import authContext from "../../context/auth/authContext";
import Image from "next/image";
import iniciarSocket from "../../config/socket.config";

const ListadoFaltantes = () => {

    const AuthContext = useContext(authContext)
    const { modo, usuarioAutenticado, token } = AuthContext

    const ProveedorContext = useContext(proveedorContext)
    const { traerProveedores, proveedores } = ProveedorContext
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
    const [srcImage, setSrcImage] = useState("/search_dark.svg")



    useEffect(() => {
        usuarioAutenticado()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const newSrc = modo && escribiendo
            ? "/close_dark.svg"
            : !modo && escribiendo
                ? "/close_light.svg"
                : modo && !escribiendo
                    ? "/search_light.svg"
                    : "/search_dark.svg";

        setSrcImage(newSrc);
    }, [modo, escribiendo]);

    useEffect(() => {
        traerFaltantes()
        traerProveedores()
        const socket = iniciarSocket(token);
        socket.on('product-updated', () => {
            traerFaltantes()
            traerProveedores()
        });
        return () => {
            socket.disconnect(); // Desconectar al desmontar
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (filtrando) {
            orderCodigoFiltrados(ordenCodigo)
        }
        orderCodigo(ordenCodigo)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ordenCodigo])
    useEffect(() => {
        if (filtrando) {
            orderNombreFiltrados(ordenNombre)
        }
        orderNombre(ordenNombre)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ordenNombre])
    useEffect(() => {
        if (filtrando) {
            orderMarcaFiltrados(ordenMarca)
        }
        orderMarca(ordenMarca)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ordenMarca])
    useEffect(() => {
        if (filtrando) {
            orderModeloFiltrados(ordenModelo)
        }
        orderModelo(ordenModelo)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ordenModelo])
    useEffect(() => {
        if (filtrando) {
            orderRubroFiltrados(ordenRubro)
        }
        orderRubro(ordenRubro)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ordenRubro])
    useEffect(() => {
        if (filtrando) {
            orderProveedorFiltrados(ordenProveedor)
        }
        orderProveedor(ordenProveedor)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ordenProveedor])
    useEffect(() => {
        if (filtrando) {
            orderDisponiblesFiltrados(ordenDisponibles)
        }
        orderDisponibles(ordenDisponibles)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ordenDisponibles])


    useEffect(() => {
        if (filtrando) {
            setEscribiendo(true)
        } else {
            setEscribiendo(false)
        }
    }, [filtrando])

    const onChangeFiltro = e => {
        setFiltrando(e.target.value)
        filtroFaltante(e.target.value.toUpperCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
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
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                        />
                        <div className="absolute mr-2 -inset-y-1 flex right-0 opacity-40">
                            <Image
                                src={srcImage}
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
            <table className="relative top-44 sm:top-44 lg:top-0 w-full mt-5 table-fixed shadow rounded-lg dark:bg-gray-900 bg-white ">
                <thead className="bg-red-600 text-white">
                    <tr className="hover:cursor-pointer select-none">
                        <th onClick={() => setOrdenCodigo(!ordenCodigo)} className="p-2 rounded-tl-lg w-20">CODIGO</th>
                        <th onClick={() => setOrdenNombre(!ordenNombre)} className="break-words">NOMBRE</th>
                        <th onClick={() => setOrdenMarca(!ordenMarca)} className="break-words">MARCA</th>
                        <th onClick={() => setOrdenModelo(!ordenModelo)} className="break-words">MODELO</th>
                        <th onClick={() => setOrdenRubro(!ordenRubro)} className="break-words">RUBRO</th>
                        <th onClick={() => setOrdenProveedor(!ordenProveedor)} className="break-words">PROVEEDOR</th>
                        <th onClick={() => setOrdenDisponibles(!ordenDisponibles)} className="w-28">DISPONIBLES</th>
                        <th className="rounded-tr-lg w-40">ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {filtrados.length > 0 ? (   //si estoy filtrando y hay resultados
                        filtrados.map(producto => (
                            <ProductoFaltante
                                key={producto._id}
                                producto={producto}
                                proveedores={proveedores}
                            />
                        ))
                    ) : !escribiendo ? (    //si no estoy filtrando
                        faltantes.map(producto => (
                            <ProductoFaltante
                                key={producto._id}
                                producto={producto}
                                proveedores={proveedores}
                            />
                        ))
                    ) : null}
                </tbody>
            </table>
            {!filtrados.length && escribiendo && (  //si estoy filtrando y no hay resultados
                <div className="mx-auto mt-10 w-1/4">
                    <Image
                        className="max-w-sm"
                        src="/lupanoencontrado.png"
                        alt="NoEncontrada"
                        width={400}
                        height={400}
                        priority={true}
                    />
                    <p className={`${modo ? "text-white" : ""} text-center text-2xl`}>
                        No hay resultados
                    </p>
                </div>
            )}
        </>
    )
}

export default ListadoFaltantes