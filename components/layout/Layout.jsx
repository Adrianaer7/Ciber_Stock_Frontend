import { useRouter } from "next/router"
import { useContext, useEffect, useState} from "react"
import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import authContext from "../../context/auth/authContext"
import productoContext from "../../context/productos/productoContext"

const Layout = ({children, pagina}) => {

    const AuthContext = useContext(authContext)
    const {usuario, cerrarSesion, token} = AuthContext

    const productosContext = useContext(productoContext)
    const {limpiarSeleccionado} = productosContext

    const [oscuro, setOscuro] = useState(false)

    const router = useRouter()
    const urlActual = router.route
  

    useEffect(() => {
        if(!token) {
            router.push("/")
        }
    })

    //traigo el tema del LS
    useEffect(() => {
        const temaLS = JSON.parse(localStorage.getItem("tema")) ?? false
        setOscuro(temaLS)
    },[])

    //guardo el tema en LS
    useEffect(() => {
        localStorage.setItem("tema", JSON.stringify(oscuro))
    },[oscuro])

    //cambio el estado del tema a oscuro o claro
    const darkMode = () => {
        if(oscuro) {
            setOscuro(false)
        } else {
            setOscuro(true)
        }
    }

    return (
        <div className="min-h-screen">
            <Head>
                <title>Inventario - {pagina}</title>  
            </Head>

            <div className={`md:flex md:min-h-screen sm:min-h-screen bg-gray-100 ${oscuro && "dark"}`}>
                <div className="md:w-1/5 bg-blue-900  px-5  dark:bg-gray-900 flex md:flex-col justify-between">
                    <p className="text-white text-4xl font-black text-center">Hola, {usuario ? <span>{usuario.nombre}</span> : null}</p>
                    
                    <nav className="mt-10 flex-column h-5/6">
                        <Link href="/productos">
                            <a className={`${urlActual === "/productos" ? "bg-blue-300 bg-opacity-10 rounded-md  text-white" : "text-white"} text-2xl block p-2 mt-2 hover:text-blue-300`}>Productos</a> 
                        </Link>

                        <Link href="/nuevoproducto">
                            <a 
                            onClick={() => limpiarSeleccionado()}
                            className={`${urlActual === "/nuevoproducto" ? "bg-blue-300 bg-opacity-10 rounded-md  text-white" : "text-white"} text-2xl block p-2 mt-2 hover:text-blue-300`}> Nuevos Producto</a>
                        </Link>
                    </nav>

                    <div className="flex flex-col">
                        <Image 
                            src={oscuro ? "/light_mode.svg" : "/dark_mode.svg"}
                            alt="dark" 
                            width={50} 
                            height={50}
                            priority={true}
                            className="cursor-pointer"
                            onClick={darkMode}
                        />
                        <Link href="/">
                            <a className="text-white text-lg w-full mb-4 p-3 uppercase bg-red-600 text-center mt-2 rounded-lg "
                            onClick={() => cerrarSesion()}>Cerrar Sesion</a>
                        </Link>
                    </div>
                </div>
                
                <div className="md:w-4/5 p-10 md:h-screen  dark:bg-gray-800 overflow-x-auto ">
                    {children}
                </div>
                
            </div>
        </div>
    )
}

export default Layout
