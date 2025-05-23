import { useContext, useEffect, useState } from "react";
import Venta from "./Venta";
import ventaContext from "../../../context/historial/ventas/ventaContext";
import authContext from "../../../context/auth/authContext";
import Image from "next/image";

const ListadoVentas = () => {

    const AuthContext = useContext(authContext)
    const { modo, usuarioAutenticado } = AuthContext


    const VentaContext = useContext(ventaContext)
    const {
        ventas,
        traerVentas,
        filtroVenta,
        filtradas
    } = VentaContext

    const [filtrando, setFiltrando] = useState("")
    const [escribiendo, setEscribiendo] = useState(false)
    const [focus, setFocus] = useState(false)
    const [rangoFecha, setRangoFecha] = useState({
        fechaDesde: "",
        fechaHasta: ""
    })
    const [srcImage, setSrcImage] = useState("/search_dark.svg");

    const { fechaDesde, fechaHasta } = rangoFecha

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
        traerVentas()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (filtrando) {
            setEscribiendo(true)
        } else {
            setEscribiendo(false)
        }
    }, [filtrando])

    useEffect(() => {
        filtroVenta(filtrando.toUpperCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""), fechaDesde, fechaHasta)  //envio al productoState

    }, [filtrando, fechaDesde, fechaHasta])


    const onChangeFiltro = e => {
        setFiltrando(e.target.value)
    }

    const onChangeFecha = e => {
        setRangoFecha({
            ...rangoFecha,
            [e.target.name]: e.target.value
        })
    }

    const vaciarFecha = () => {
        setRangoFecha({
            fechaDesde: "",
            fechaHasta: ""
        })
    }



    return (
        <>
            <div className="absolute lg:relative min-w-full m-0">
                <h1 className="font-black dark:text-pink-500 text-3xl sm:text-4xl text-pink-500 text-center mt-2 sm:mt-0 mb-4 ">Listado de ventas</h1>
                <div className="flex flex-col-reverse sm:flex-row justify-between ">
                    <div className={`${focus && "ring-2"} relative my-auto p-2 w-full sm:w-2/6 xl:w-2/6 shadow dark:bg-gray-900 focus:outline-none focus:ring focus:border-blue-300 dark:text-gray-50 bg-white rounded-md md:rounded-lg`}>
                        <input
                            type="text"
                            className="w-10/12 xl:w-11/12 p-2 focus:outline-none dark:bg-transparent" //outline-none le quita el borde default, focus-ring le pone borde
                            placeholder="Consulta el historial de ventas"
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
                    <div className="flex gap-2">
                        {fechaDesde && fechaHasta ?
                            fechaDesde > fechaHasta ? (
                                <div className="grid grid-rows-2">
                                    <p className=" my-auto block font-bold row-start-2 bg-pink-500 text-white rounded-md p-1">PERÍODO INVÁLIDO</p>
                                </div>

                            ) : null
                            : null}
                        <div>
                            <label htmlFor="fechaHasta" className={` dark:text-white text-gray-500 font-bold`}>Fecha desde</label>
                            <input
                                type="date"
                                autoComplete="off"
                                className=" block  p-2 appearance-none rounded-md bg-gray-50 shadow dark:bg-pink-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="fechaDesde"
                                placeholder="fechaDesde"
                                name="fechaDesde"
                                value={fechaDesde}
                                onChange={onChangeFecha}
                            />
                        </div>
                        <div>
                            <label htmlFor="fechaHasta" className="font-bold dark:text-white text-gray-500">Fecha hasta</label>
                            <input
                                type="date"
                                autoComplete="off"
                                className=" block  p-2 appearance-none rounded-md bg-gray-50 shadow dark:bg-pink-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="fechaHasta"
                                placeholder="fechaHasta"
                                name="fechaHasta"
                                value={fechaHasta}
                                onChange={onChangeFecha}
                            />
                        </div>
                        {fechaDesde || fechaHasta ? (
                            <div className="grid grid-rows-2">
                                <button
                                    className=" block font-bold row-start-2 bg-pink-500 text-white rounded-md p-1"
                                    onClick={vaciarFecha}
                                >
                                    Limpiar
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            <table className="relative top-44 sm:top-44 lg:top-0 w-full mt-5 table-fixed shadow rounded-lg dark:bg-gray-900 bg-white ">
                <thead className="bg-pink-500 text-white">
                    <tr className="hover:cursor-pointer select-none">
                        <th className="p-2 rounded-tl-lg w-20">CODIGO</th>
                        <th className="break-words">NOMBRE</th>
                        <th className="break-words">MARCA</th>
                        <th className="break-words">MODELO</th>
                        <th className="break-words">COD BARRAS</th>
                        <th className="break-words"> VENTA</th>
                        <th className="break-words">COTIZACIÓN USD</th>
                        <th className="break-words">PRECIO EN USD</th>
                        <th className="break-words">PRECIO TARJETA</th>
                        <th className="w-20">CANTIDAD</th>
                        <th className="rounded-tr-lg w-32">ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {filtradas.length > 0 ? (   //si estoy filtrando y hay resultados
                        filtradas.map(producto => (
                            <Venta
                                key={producto._id}
                                producto={producto}
                            />
                        ))
                    ) : (!escribiendo && (!fechaDesde || !fechaHasta)) ? ( //si no estoy filtrando
                        ventas.map(producto => (
                            <Venta
                                key={producto._id}
                                producto={producto}
                            />
                        ))
                    ) : null}
                </tbody>
            </table>

            {/* lupa */}
            {!filtradas.length && (escribiendo || (fechaDesde && fechaHasta)) && (  //si estoy filtrando y no hay resultados
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

export default ListadoVentas;