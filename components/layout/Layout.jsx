import { useRouter } from "next/router"
import { useContext, useEffect, useState} from "react"
import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import authContext from "../../context/auth/authContext"
import productoContext from "../../context/productos/productoContext"

const Layout = ({children, pagina}) => {

    const AuthContext = useContext(authContext)
    const {usuario, cerrarSesion, token, traerTema} = AuthContext

    const productosContext = useContext(productoContext)
    const {limpiarSeleccionado, limpiarApp} = productosContext

    const [oscuro, setOscuro] = useState(false)

    const router = useRouter()
    const urlActual = router.route
  

    useEffect(() => {
        if(!token) {
            router.push("/")
        }
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
    },[oscuro])

    //cambio el estado del tema a oscuro o claro
    const darkMode = () => {
        setOscuro(!oscuro)
    }

    const vaciarStates = () => {
        cerrarSesion()
        limpiarApp()
    }
    return (
        <div className="min-h-screen">
            <Head>
                <title>Inventario - {pagina}</title>  
            </Head>

            <div className={`lg:flex md:min-h-screen sm:min-h-screen bg-gray-100 ${oscuro && "dark"}`}>
                <div className="lg:w-1/5 bg-blue-900  px-5  dark:bg-gray-900 flex flex-col  justify-between">
                    <p className="text-white text-4xl font-black text-center">Hola, {usuario ? <span>{usuario.nombre}</span> : null}</p>
                    
                    <nav className="mt-10 lg:flex-col lg:h-5/6">
                        <Link href="/productos">
                            <a className={`${urlActual === "/productos" ? "bg-blue-300 bg-opacity-10 rounded-md  text-white" : "text-white"} text-2xl block p-2 mt-2 hover:text-blue-300`}>Productos</a> 
                        </Link>

                        <Link href="/nuevoproducto">
                            <a 
                            onClick={() => limpiarSeleccionado()}
                            className={`${urlActual === "/nuevoproducto" ? "bg-blue-300 bg-opacity-10 rounded-md  text-white" : "text-white"} text-2xl block p-2 mt-2 hover:text-blue-300`}>Nuevo Producto</a>
                        </Link>
                        <Link href="/faltantes">
                            <a 
                            onClick={() => limpiarSeleccionado()}
                            className={`${urlActual === "/faltantes" ? "bg-blue-300 bg-opacity-10 rounded-md  text-white" : "text-white"} text-2xl block p-2 mt-2 hover:text-blue-300`}>Faltantes</a>
                        </Link>
                    </nav>

                    <div className="flex flex-row justify-between mb-2">
                        <Image 
                            src={oscuro ? "/light_mode.svg" : "/dark_mode.svg"}
                            alt={oscuro ? "light" : "dark"}
                            width={50} 
                            height={50}
                            priority={true}
                            className="cursor-pointer"
                            onClick={darkMode}
                        />
                        <Image 
                            src={oscuro ? "/logout_light.svg" : "/logout_dark.svg"}
                            alt="Cerrar Sesion" 
                            width={50} 
                            height={50}
                            priority={true}
                            className="cursor-pointer"
                            onClick={() => vaciarStates()}
                        />
                    </div>
                </div>
                
                <div className=" lg:w-4/5 p-2 lg:p-10 h-screen  dark:bg-gray-800 overflow-x-auto ">
                    {children}
                </div>
                
            </div>
        </div>
    )
}

export default Layout
