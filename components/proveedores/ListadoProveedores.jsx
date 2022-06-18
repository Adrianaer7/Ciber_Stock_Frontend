import { useContext, useEffect, useState } from "react";
import Proveedor from "./Proveedor";
import productoContext from "../../context/productos/productoContext";
import authContext from "../../context/auth/authContext";
import Image from "next/image";

const ListadoProveedores = () => {

    const AuthContext = useContext(authContext)
    const {modo, usuarioAutenticado} = AuthContext

    const productosContext = useContext(productoContext)

    const {
        proveedores, 
        agregarProveedor,
        traerProveedores, 
        proveedoresFiltrados, 
        filtroProveedor,
        orderEmpresa,
        orderEmpresaFiltrados,
    } = productosContext

    const [filtrando, setFiltrando] = useState("") 
    const [escribiendo, setEscribiendo] = useState(false)
    const [focus, setFocus] = useState(false)
    const [ordenEmpresa, setOrdenEmpresa] = useState(false)
    const [crearNuevo, setCrearNuevo] = useState(false)

    const [proveedor, setProveedor] = useState({
        nombre: "",
        empresa: "",
        telPersonal: "",
        telEmpresa: ""
    })

    const {nombre, empresa, telPersonal, telEmpresa} = proveedor

    useEffect(() => {
        usuarioAutenticado()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        traerProveedores()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [proveedores])

    useEffect(() => {
        if(filtrando) {
            orderEmpresaFiltrados(ordenEmpresa)
        }
        orderEmpresa(ordenEmpresa)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ordenEmpresa])
    

    useEffect(() => {
        if(filtrando) {
            setEscribiendo(true)
        } else {
            setEscribiendo(false)
        }
    }, [filtrando])

    const onChangeFiltro = e => {
        setFiltrando(e.target.value)
        filtroProveedor(e.target.value.toUpperCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
    }

    const onChange = e => {
        setProveedor({
            ...proveedor,
            [e.target.name]: e.target.value
        })
    }

    const ordenarEmpresa = () => {
        setOrdenEmpresa(!ordenEmpresa)
    }

    const onSubmit = e => {
        e.preventDefault()
        agregarProveedor(proveedor)

        setProveedor({
            nombre: "",
            empresa: "",
            telPersonal: "",
            telEmpresa: ""
        })
        setCrearNuevo(!crearNuevo)
    }
    
  return (
    <>   
        <div className="absolute lg:relative min-w-full m-0">
            <h1 className="font-black dark:text-green-500 text-3xl sm:text-4xl text-green-900 text-center mt-2 sm:mt-0 mb-4 ">Listado de proveedores</h1>
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
                       {/* <Image
                            src={`${modo && escribiendo ? "/close_dark.svg" : !modo && escribiendo ? "/close_light.svg": modo && !escribiendo ? "/search_light.svg" : "/search_dark.svg"}`}
                            alt="Cerrar"
                            width={30} 
                            height={30}
                            priority={true}
                            className="cursor-pointer"
                            onClick={escribiendo ? () => setFiltrando("") : null}
                        /> */}
                    </div> 
                </div>  
                <button
                    className="bg-green-800 hover:bg-green-900 rounded-lg text-white shadow-md px-4 font-bold uppercase "
                    onClick={() => setCrearNuevo(!crearNuevo)}
                >
                    {crearNuevo ? "CANCELAR" : "AGREGAR"}
                </button>
            </div> 
        </div>
            {crearNuevo ? (
                <div className="py-3">

                    <form 
                        onSubmit={onSubmit}
                    >
                        <div className="flex justify-center gap-1">
                            <div>
                                <label htmlFor="nombre" className="text-gray-800 dark:text-gray-300 font-bold font ">Nombre y apellido</label>
                                <input
                                    name="nombre"
                                    className="bg-white uppercase w-full p-2 rounded-md border-none hover:ring-1 focus:outline-none shadow-sm"
                                    value={nombre}
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="empresa" className="text-gray-800 dark:text-gray-300 font-bold font ">Empresa</label>

                                <input
                                    name="empresa"
                                    className="bg-white uppercase w-full p-2 rounded-md border-none hover:ring-1 focus:outline-none shadow-sm"
                                    value={empresa}
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="telpersonal" className="text-gray-800 dark:text-gray-300 font-bold font ">Tel. Personal</label>

                                <input
                                    name="telPersonal"
                                    className="bg-white uppercase w-full p-2 rounded-md border-none hover:ring-1 focus:outline-none shadow-sm"
                                    value={telPersonal}
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="telempresa" className="text-gray-800 dark:text-gray-300 font-bold font ">Tel. Empresa</label>

                                <input
                                    name="telEmpresa"
                                    className="bg-white uppercase w-full p-2 rounded-md border-none hover:ring-1 focus:outline-none shadow-sm"
                                    value={telEmpresa}
                                    onChange={onChange}
                                />
                            </div>
                        <button
                            className=" mt-5 bg-blue-900 text-white px-2 items-end rounded-lg font-bold uppercase"
                        >
                            Guardar
                        </button>
                        </div>
                    </form>
                </div>
            ) 
            : null}
        <table className="relative top-44 sm:top-44 lg:top-0 w-full mt-5 table-auto shadow rounded-lg dark:bg-gray-900 bg-white ">
            <thead className="bg-green-600 text-white">
                <tr onClick={() => ordenarEmpresa()} className="hover:cursor-pointer select-none">
                    <th className="p-2 rounded-tl-lg">NOMBRE Y APELLIDO</th>
                    <th>EMPRESA</th>
                    <th>TEL. PERSONAL</th>
                    <th>TEL. EMPRESA</th>
                    <th className="rounded-tr-lg">ACCIONES</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(proveedoresFiltrados).length === 0 && escribiendo ? (
                    <>
                        <tr className="relative p-3 text-2xl dark:text-gray-50">
                            <td>No hay resultados</td>
                        </tr>
                    </>) 
                : Object.keys(proveedoresFiltrados).length > 0 && escribiendo ?(
                    <>
                        {proveedoresFiltrados.map(proveedor => (
                            <Proveedor
                                key={proveedor._id}
                                proveedor={proveedor}
                            />
                        ))}
                    </>)
                : 
                (
                <>
                    {proveedores.map(proveedor => (
                        <Proveedor
                            key={proveedor._id}
                            proveedor={proveedor}
                        />
                    ))}
                </>
                )}  
            </tbody>
        </table>
    </>
  )
}

export default ListadoProveedores