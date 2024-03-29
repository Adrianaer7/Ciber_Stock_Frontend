import { useContext, useEffect, useState} from "react"
import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import authContext from "../../context/auth/authContext"
import productoContext from "../../context/productos/productoContext"
import favicon from "../../public/favicon.ico"

const Layout = ({children, pagina}) => {

    const AuthContext = useContext(authContext)
    const {usuario, cerrarSesion, token, traerTema} = AuthContext

    const productosContext = useContext(productoContext)
    const {limpiarSeleccionado, limpiarApp} = productosContext

    const [oscuro, setOscuro] = useState(false)
    const [panel, setPanel] = useState(false)
    const [mostrarVarios, setMostrarVarios] = useState(false)

    const router = useRouter()
    const urlActual = router.route

    useEffect(() => {
        if(!token) {
            router.push("/")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token])


    //traigo el tema del LS
    useEffect(() => {
        const temaLS = JSON.parse(localStorage.getItem("Modo oscuro")) ?? false
        setOscuro(temaLS)
    },[])

    //guardo el tema en LS
    useEffect(() => {
        localStorage.setItem("Modo oscuro", JSON.stringify(oscuro))
        traerTema(oscuro)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[oscuro])

    //cambio el estado del tema a oscuro o claro
    const darkMode = () => {
        setOscuro(!oscuro)
    }

    const tuerca = () => {
        setPanel(!panel)
    }

    const vaciarStates = () => {
        cerrarSesion()
        limpiarApp()
    }


    return (
        <div className="min-h-screen">
            <Head>
                <title>Inventario - {pagina}</title>
                <link rel="shortcut icon" type="image/x-icon" href={favicon.src}/>
            </Head>

            <div className={`lg:flex md:min-h-screen sm:min-h-screen bg-gray-100 ${oscuro && "dark"}`}>
                <div className="lg:w-72 bg-blue-900    dark:bg-gray-900 flex flex-col  justify-between lg:justify-start ">
                    <div className="flex justify-between mt-1 px-5 break-words">
                        <p className="text-white text-2xl md:text-4xl font-black text-center break-words w-40">{usuario ? <span>{usuario.nombre}</span> : null}</p>
                        <Image 
                            src="/settings-claro.svg"
                            alt="Settings"
                            width={30} 
                            height={30}
                            priority={true}
                            className="cursor-pointer"
                            onClick={tuerca}
                        />
                    </div>
                    {panel ?
                        <div className="flex flex-col mt-2 ml-5 py-2">
                            <button
                                onClick={darkMode}
                                className="text-white text-left py-2 hover:text-blue-300 hover:translate-x-3"
                            >
                                {oscuro ? "Tema claro" : "Tema oscuro"}
                            </button>
                            <button
                                onClick={vaciarStates}
                                className="text-white text-left py-2 hover:text-blue-300 hover:translate-x-3"
                            >
                                Cerrar sesión
                            </button> 
                        </div>
                        
                    : null}
                    
                    <nav className="grid grid-cols-4 lg:px-5 mt-4 sm:mt-10 lg:flex lg:flex-col lg:justify-start h-5/6">
                        <ul>
                            <li >
                                <Link href="/productos">
                                    <a
                                        className={`${urlActual === "/productos" ? "lg:bg-blue-300 lg:border-none border-b-gray-300 border-b-2 lg:bg-opacity-10 lg:rounded-md  text-white" : "text-white"}  text-sm text-center lg:text-left sm:text-xl lg:text-2xl  block p-2 mt-2 hover:text-blue-300`}
                                    >   Productos
                                    </a> 
                                </Link>
                            </li>
                            <li >
                                <Link href="/nuevoproducto">
                                    <a 
                                        className={`${urlActual === "/nuevoproducto" ? "lg:bg-blue-300 lg:border-none border-b-gray-300 border-b-2 lg:bg-opacity-10 lg:rounded-md  text-white" : "text-white"} text-sm text-center lg:text-left sm:text-xl lg:text-2xl block p-2 mt-2 hover:text-blue-300`}
                                        onClick={() => limpiarSeleccionado()}
                                    >   Nuevo Producto
                                    </a>
                                </Link>
                            </li>
                            <li >
                                <Link href="/faltantes">
                                    <a 
                                        className={`${urlActual === "/faltantes" ? "lg:bg-blue-300 lg:border-none border-b-gray-300 border-b-2 lg:bg-opacity-10 lg:rounded-md  text-white" : "text-white"} text-sm text-center lg:text-left sm:text-xl lg:text-2xl block  p-2 mt-2 hover:text-blue-300`}
                                        onClick={() => limpiarSeleccionado()}
                                    >   Faltantes
                                    </a>
                                </Link>
                            </li>
                            <li >
                                <Link href="/compras">
                                    <a 
                                        className={`${urlActual === "/compras" ? "lg:bg-blue-300 lg:border-none border-b-gray-300 border-b-2 lg:bg-opacity-10 lg:rounded-md  text-white" : "text-white"} text-sm text-center lg:text-left sm:text-xl lg:text-2xl block p-2 mt-2 hover:text-blue-300`}
                                        onClick={() => limpiarSeleccionado()}
                                    >   Compras</a>
                                </Link>
                            </li>
                            <li >
                                <Link href="/ventas">
                                    <a 
                                        className={`${urlActual === "/ventas" ? "lg:bg-blue-300 lg:border-none border-b-gray-300 border-b-2 lg:bg-opacity-10 lg:rounded-md  text-white" : "text-white"} text-sm text-center lg:text-left sm:text-xl lg:text-2xl block p-2 mt-2 hover:text-blue-300`}
                                        onClick={() => limpiarSeleccionado()}
                                    >   Ventas</a>
                                </Link>
                            </li>
                            <li 
                                className="lg:border-none border-b-gray-300 border-b-2 lg:bg-opacity-10 lg:rounded-md  text-white text-sm text-center lg:text-left sm:text-xl lg:text-2xl block p-2 mt-2 hover:text-blue-300 hover:cursor-pointer"
                                onClick={() => setMostrarVarios(!mostrarVarios)}
                            > Varios
                                {mostrarVarios || urlActual === "/proveedores" || urlActual === "/rubros" || urlActual === "/porcentajes" ? (
                                    <ul className="ml-3">
                                        <li >
                                            <Link href="/proveedores">
                                                <a 
                                                    className={`${urlActual === "/proveedores" ? "lg:bg-blue-300 lg:border-none border-b-gray-300 border-b-2 lg:bg-opacity-10 lg:rounded-md  text-white" : "text-white"} text-sm text-center lg:text-left sm:text-md lg:text-lg block p-2 mt-2 hover:text-blue-300`}
                                                    onClick={() => limpiarSeleccionado()}
                                                >   Proveedores
                                                </a>
                                            </Link>
                                        </li>
                                        <li >
                                            <Link href="/rubros">
                                                <a 
                                                    className={`${urlActual === "/rubros" ? "lg:bg-blue-300 lg:border-none border-b-gray-300 border-b-2 lg:bg-opacity-10 lg:rounded-md  text-white" : "text-white"} text-sm text-center lg:text-left sm:text-md lg:text-lg block p-2 mt-2 hover:text-blue-300`}
                                                    onClick={() => limpiarSeleccionado()}
                                                >   Rubros
                                                </a>
                                            </Link>
                                        </li>
                                        <li >
                                            <Link href="/porcentajes">
                                                <a 
                                                    className={`${urlActual === "/porcentajes" ? "lg:bg-blue-300 lg:border-none border-b-gray-300 border-b-2 lg:bg-opacity-10 lg:rounded-md  text-white" : "text-white"} text-sm text-center lg:text-left sm:text-md lg:text-lg block p-2 mt-2 hover:text-blue-300`}
                                                    onClick={() => limpiarSeleccionado()}
                                                >   Porcentajes
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                ): null}
                            </li>
                        </ul>
                    </nav> 
                </div>
                
                <div className=" lg:w-full lg:p-10 h-screen  dark:bg-gray-800 overflow-x-auto ">
                    {children}      
                </div>
                
            </div>
        </div>
    )
}

export default Layout