import { useContext, useEffect, useState } from "react"
import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import authContext from "../../context/auth/authContext"
import productoContext from "../../context/productos/productoContext"
import favicon from "../../public/favicon.ico"

const Layout = ({ children, pagina }) => {

    const AuthContext = useContext(authContext)
    const { usuario, cerrarSesion, token, traerTema } = AuthContext

    const productosContext = useContext(productoContext)
    const { limpiarSeleccionado, limpiarApp } = productosContext

    const [oscuro, setOscuro] = useState(null)
    const [panel, setPanel] = useState(false)
    const [mostrarVarios, setMostrarVarios] = useState(false)

    const router = useRouter()
    const urlActual = router.route
    const nombrePagina = `Inventario - ${pagina}`

    useEffect(() => {
        if (!token) {
            router.push("/")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])


    //traigo el tema del LS
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const temaLS = JSON.parse(localStorage.getItem("Modo oscuro")) ?? false
        if(temaLS !== mediaQuery.matches){
            localStorage.setItem("Modo oscuro", JSON.stringify(mediaQuery.matches))
            setOscuro(mediaQuery.matches)
        } else {
            setOscuro(temaLS)
        }
    }, []) 

    //traigo el tema del sistema



    //cambio el estado del tema a oscuro o claro
    const darkMode = (oscuro) => {
        localStorage.setItem("Modo oscuro", JSON.stringify(oscuro))
        setOscuro(oscuro)
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
                <title>{nombrePagina}</title>
                <link rel="shortcut icon" type="image/x-icon" href={favicon.src} />
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
                            {/* <button
                                onClick={() => darkMode(!oscuro)}
                                className="text-white text-left py-2 hover:text-blue-300 hover:translate-x-3"
                            >
                                {oscuro ? "Tema claro" : "Tema oscuro"}
                            </button> */}
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
                                <Link
                                    href="/productos"
                                    className={`${urlActual === "/productos" ? "lg:bg-blue-950 dark:lg:bg-cyan-950 lg:border-none border-b-gray-300 border-b-2 lg:rounded-md text-white " : "text-white"}  text-sm text-center lg:text-left sm:text-xl lg:text-2xl  block p-2 mt-2 hover:text-blue-300`}
                                >
                                    Productos
                                </Link>
                            </li>
                            <li >
                                <Link
                                    href="/nuevoproducto"
                                    className={`${urlActual === "/nuevoproducto" ? "lg:bg-blue-950 dark:lg:bg-cyan-950 lg:border-none border-b-gray-300 border-b-2 lg:rounded-md  text-white" : "text-white"} text-sm text-center lg:text-left sm:text-xl lg:text-2xl block p-2 mt-2 hover:text-blue-300`}
                                    onClick={() => limpiarSeleccionado()}
                                >
                                    Nuevo Producto
                                </Link>
                            </li>
                            <li >
                                <Link
                                    href="/faltantes"
                                    className={`${urlActual === "/faltantes" ? "lg:bg-blue-950 dark:lg:bg-cyan-950 lg:border-none border-b-gray-300 border-b-2 lg:rounded-md  text-white" : "text-white"} text-sm text-center lg:text-left sm:text-xl lg:text-2xl block  p-2 mt-2 hover:text-blue-300`}
                                    onClick={() => limpiarSeleccionado()}
                                >
                                    Faltantes
                                </Link>
                            </li>
                            <li >
                                <Link
                                    href="/compras"
                                    className={`${urlActual === "/compras" ? "lg:bg-blue-950 dark:lg:bg-cyan-950 lg:border-none border-b-gray-300 border-b-2 lg:rounded-md  text-white" : "text-white"} text-sm text-center lg:text-left sm:text-xl lg:text-2xl block p-2 mt-2 hover:text-blue-300`}
                                    onClick={() => limpiarSeleccionado()}
                                >
                                    Compras
                                </Link>
                            </li>
                            <li >
                                <Link
                                    href="/ventas"
                                    className={`${urlActual === "/ventas" ? "lg:bg-blue-950 dark:lg:bg-cyan-950 lg:border-none border-b-gray-300 border-b-2 lg:rounded-md  text-white" : "text-white"} text-sm text-center lg:text-left sm:text-xl lg:text-2xl block p-2 mt-2 hover:text-blue-300`}
                                    onClick={() => limpiarSeleccionado()}
                                >
                                    Ventas
                                </Link>
                            </li>
                            <li
                                className="lg:border-none border-b-gray-300 border-b-2 lg:rounded-md  text-white text-sm text-center lg:text-left sm:text-xl lg:text-2xl block p-2 mt-2 hover:text-blue-300 hover:cursor-pointer"
                                onClick={() => setMostrarVarios(!mostrarVarios)}
                            > Varios
                                {mostrarVarios || urlActual === "/proveedores" || urlActual === "/rubros" || urlActual === "/porcentajes" ? (
                                    <ul className="ml-3">
                                        <li >
                                            <Link
                                                href="/proveedores"
                                                className={`${urlActual === "/proveedores" ? "lg:bg-blue-950 dark:lg:bg-cyan-950 lg:border-none border-b-gray-300 border-b-2 lg:rounded-md  text-white" : "text-white"} text-sm text-center lg:text-left sm:text-md lg:text-lg block p-2 mt-2 hover:text-blue-300`}
                                                onClick={() => limpiarSeleccionado()}
                                            >
                                                Proveedores
                                            </Link>
                                        </li>
                                        <li >
                                            <Link
                                                href="/rubros"
                                                className={`${urlActual === "/rubros" ? "lg:bg-blue-950 dark:lg:bg-cyan-950 lg:border-none border-b-gray-300 border-b-2 lg:rounded-md  text-white" : "text-white"} text-sm text-center lg:text-left sm:text-md lg:text-lg block p-2 mt-2 hover:text-blue-300`}
                                                onClick={() => limpiarSeleccionado()}
                                            >
                                                Rubros
                                            </Link>
                                        </li>
                                        <li >
                                            <Link
                                                href="/porcentajes"
                                                className={`${urlActual === "/porcentajes" ? "lg:bg-blue-950 dark:lg:bg-cyan-950 lg:border-none border-b-gray-300 border-b-2 lg:rounded-md  text-white" : "text-white"} text-sm text-center lg:text-left sm:text-md lg:text-lg block p-2 mt-2 hover:text-blue-300`}
                                                onClick={() => limpiarSeleccionado()}
                                            >
                                                Porcentajes
                                            </Link>
                                        </li>
                                    </ul>
                                ) : null}
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