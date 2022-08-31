import { useContext, useEffect, useState } from "react";
import Venta from "./Venta";
import ventaContext from "../../context/historial/ventas/ventaContext";
import authContext from "../../context/auth/authContext";
import Image from "next/image";

const ListadoVentas = () => {

    const AuthContext = useContext(authContext)
    const {modo, usuarioAutenticado} = AuthContext


    const VentaContext = useContext(ventaContext)
    const {
        ventas,
        traerVentas,
        filtradas
    } = VentaContext

    const [filtrando, setFiltrando] = useState("")   
    const [escribiendo, setEscribiendo] = useState(false)  
    const [focus, setFocus] = useState(false)

    useEffect(() => {
        usuarioAutenticado()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        traerVentas()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    useEffect(() => {
        if(filtrando) {
            setEscribiendo(true)
        } else {
            setEscribiendo(false)
        }
    }, [filtrando])

    const onChangeFiltro = e => {
        setFiltrando(e.target.value)
        filtroVenta(e.target.value.toUpperCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))  //envio al productoState
    }

  
  return (
    <>   
        <div className="absolute lg:relative min-w-full m-0">
            <h1 className="font-black dark:text-yellow-500 text-3xl sm:text-4xl text-yellow-500 text-center mt-2 sm:mt-0 mb-4 ">Listado de ventas</h1>
            <div className="flex flex-col-reverse sm:flex-row justify-between ">
                <div className={`${focus && "ring-2"} relative my-auto p-2 w-full sm:w-2/6 xl:w-2/6 shadow dark:bg-gray-900 focus:outline-none focus:ring focus:border-blue-300 dark:text-gray-50 bg-white rounded-md md:rounded-lg`}>
                        <input 
                            type="text" 
                            className="w-10/12 xl:w-11/12 p-2 focus:outline-none dark:bg-transparent" //outline-none le quita el borde default, focus-ring le pone borde
                            placeholder="Consulta el historial de ventas"
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
            <thead className="bg-yellow-500 text-white">
                <tr className="hover:cursor-pointer select-none">
                    <th>NOMBRE</th>
                    <th>MARCA</th>
                    <th>MODELO</th>
                    <th>CANTIDAD</th>
                    <th>COD BARRAS</th>
                    <th className="rounded-tr-lg">PRECIO EN USD</th>
                </tr>
            </thead>
            <tbody>
            
            {!filtradas.length && escribiendo ? (
                    <>
                        <tr className="relative p-3 text-2xl dark:text-gray-50">
                            <td>No hay resultados</td>
                        </tr>
                    </>) 
                : filtradas.length && escribiendo ?(
                    <>
                        {filtradas.map(producto => (
                            <Venta
                                key={producto._id}
                                producto={producto}
                            />
                        ))}
                    </>)
                : (
                <>
                    {ventas.map(producto => (
                        <Venta
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

export default ListadoVentas;