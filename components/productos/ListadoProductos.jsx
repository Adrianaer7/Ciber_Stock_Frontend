import { useContext, useEffect, useState } from "react";
import Producto from "./Producto";
import productoContext from "../../context/productos/productoContext"
import authContext from "../../context/auth/authContext";
import proveedorContext from "../../context/proveedores/proveedorContext"
import Image from "next/image"
import Swal from "sweetalert2";
import iniciarSocket from "../../config/socket.config";
//import Spinner from "../layout/Spinner";
import Modal from "react-modal"


//Para el modal
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#__next');


const ListadoProductos = () => {

    const AuthContext = useContext(authContext)
    const { modo, token } = AuthContext

    const ProveedorContext = useContext(proveedorContext)
    const { traerProveedores } = ProveedorContext

    const productosContext = useContext(productoContext)
    const {
        traerProductos,
        productos,
        productoSeleccionado,
        traerGarantias,
        limpiarSeleccionado,
        filtro,
        filtrados,
        traerDolarBD,
        editarDolarDB,
        dolarBD,
        elDolarAutomatico,
        editarProductos,
        orderCodigo,
        orderCodigoFiltrados,
        orderPrecio,
        orderPrecioFiltrados,
        orderNombre,
        orderNombreFiltrados,
        orderMarca,
        orderMarcaFiltrados,
        orderModelo,
        orderModeloFiltrados,
        orderDisponibles,
        orderDisponiblesFiltrados,
        mostrarModal,
        modal
    } = productosContext

    const [filtrando, setFiltrando] = useState("")    //contiene lo que voy escribiendo
    const [conStock, setConStock] = useState(false)
    const [oculto, setOculto] = useState(false)
    const [escribiendo, setEscribiendo] = useState(false)   //cuando escribo pasa a true
    const [focus, setFocus] = useState(false)   //activar el ring en el buscador
    //const [spinner, setSpinner] = useState(true)
    const [ordenCodigo, setOrdenCodigo] = useState(false)
    const [ordenNombre, setOrdenNombre] = useState(false)
    const [ordenMarca, setOrdenMarca] = useState(false)
    const [ordenModelo, setOrdenModelo] = useState(false)
    const [ordenDisponibles, setOrdenDisponibles] = useState(false)
    const [ordenPrecio, setOrdenPrecio] = useState(false)
    const [dolarAutomatico, setDolarAutomatico] = useState(true)    //pasa a false cuando lo quiero editar
    const [dolarManual, setDolarManual] = useState({
        precio: "",
    })
    const { precio } = dolarManual

    let automatico

    useEffect(() => {
        traerGarantias()
        traerProveedores()
        limpiarSeleccionado()
        traerDolarBD()
        const socket = iniciarSocket(token);
        socket.on('product-updated', () => {
            traerProductos()
            traerGarantias()
            traerProveedores()
            limpiarSeleccionado()
            traerDolarBD()
        });
        return () => {
            socket.disconnect(); // Desconectar al desmontar
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        editarProductos(dolarBD)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dolarBD])

    //useEffect(() => {
    //    setTimeout(() => {
    //        setSpinner(false)
    //    }, 1000);
    //}, [])

    useEffect(() => {
        if (filtrando) {
            orderCodigoFiltrados(ordenCodigo)
        }
        orderCodigo(ordenCodigo)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ordenCodigo])
    useEffect(() => {
        if (filtrando) {
            orderPrecioFiltrados(ordenPrecio)
        }
        orderPrecio(ordenPrecio)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ordenPrecio])
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
            orderDisponiblesFiltrados(ordenDisponibles)
        }
        orderDisponibles(ordenDisponibles)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ordenDisponibles])

    //cambia el estado a true si escribo
    useEffect(() => {
        if (filtrando) {
            setEscribiendo(true)
        } else {
            setEscribiendo(false)
        }
    }, [filtrando])

    useEffect(() => {
        filtro(filtrando.toUpperCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""), conStock, oculto)   //el normalice separa la tilde de la letra. el replace reemplaza la tilde por "", osea lo elimina
    }, [filtrando, conStock, oculto])


    const onChangeFiltro = e => {
        setFiltrando(e.target.value)
    }

    const onChange = e => {
        setDolarManual({
            ...dolarManual,
            [e.target.name]: e.target.value
        })
    }

    const eliminarDolarManual = () => {
        editarDolarDB(dolarManual, automatico = true) //la funcion toma 2 valores, le paso dolarManual para completar los valores
        setDolarManual({    //
            precio: ""
        })
    }

    const ocultarModal = () => {
        mostrarModal(false)
        limpiarSeleccionado()
    }


    const onSubmit = async e => {
        e.preventDefault()
        if (dolarManual.precio === "" || dolarManual.precio <= "0") {
            return Swal.fire({ //le pongo el await para que la siguiente funcion se ejecute cuando quite el modal de error
                icon: 'error',
                title: 'Error',
                color: `${modo ? "white" : "rgb(31 41 55)"}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
                html: `${modo ? '<p style="color:#a59ff3">El <b>precio del dolar</b> deben ser un número mayor a 0.</p>' : '<p style="color: #545454">El <b>precio del dolar</b> deben ser un número mayor a 0.</p>'}`,
            })
        }
        await editarDolarDB(dolarManual, automatico = false)    //envio manualmente el dolar
        setDolarManual({
            precio: ""
        })
        setDolarAutomatico(!dolarAutomatico)    //oculto el input de dolar
    }

    return (
        <>
            <div className="min-w-full top-0 m-0">
                <h1 className="font-black dark:text-blue-300 text-3xl sm:text-4xl text-blue-900 text-center mt-2 sm:mt-0 mb-4 ">Listado de productos</h1>
                <div className="flex justify-between">

                    <div className="flex flex-col-reverse gap-1 sm:flex-row w-full sm:w-4/12 xl:w-5/12 mx-1 md:mx-0">
                        <div className={`${focus && "ring-2"} relative my-auto p-2 w-full sm:w-2/6 xl:w-full shadow dark:bg-gray-900 focus:outline-none focus:ring focus:border-blue-300 dark:text-gray-50 bg-white rounded-md md:rounded-lg`}>
                            <input
                                type="text"
                                className="w-10/12 xl:w-11/12 p-2 focus:outline-none dark:bg-transparent" //outline-none le quita el borde default, focus-ring le pone borde
                                placeholder="Buscar algún producto"
                                onChange={onChangeFiltro}
                                value={filtrando}
                                onFocus={() => setFocus(true)}
                                onBlur={() => setFocus(false)}
                            />

                            <div className="absolute mr-2 -inset-y-1 flex right-0 opacity-40">
                                <Image
                                    src={`${modo && escribiendo ? "/close_dark.svg" : !modo && escribiendo ? "/close_light.svg" : modo && !escribiendo ? "/search_light.svg" : "/search_dark.svg"}`}
                                    alt="Cerrar"
                                    width={30}
                                    height={30}
                                    priority={true}
                                    className="cursor-pointer"
                                    onClick={escribiendo ? () => setFiltrando("") : null}
                                />
                            </div>
                        </div>
                        <div className="my-auto whitespace-nowrap ">
                            <label className="flex ml-2">

                                <input
                                    type="checkbox"
                                    onClick={() => setConStock(!conStock)}
                                />
                                <div className="ml-2 dark:text-white">Con stock</div>
                            </label>

                        </div>
                        <div className="my-auto whitespace-nowrap ">
                            <label className="flex ml-2">

                                <input
                                    type="checkbox"
                                    onClick={() => setOculto(!oculto)}
                                />
                                <div className="ml-2 dark:text-white">Ocultos</div>
                            </label>

                        </div>


                    </div>
                    {dolarBD &&
                        <div className=" p-4 pl-0 my-auto text-right w-auto font-bold whitespace-nowrap dark:text-white">
                            {dolarAutomatico ?
                                (<p>Dolar hoy:
                                    <span
                                        className="hover:cursor-pointer text-red-600 mr-1"
                                        onClick={() => setDolarAutomatico(!dolarAutomatico)}
                                    > ${dolarBD}
                                    </span>
                                    {elDolarAutomatico == false &&
                                        <button
                                            className={`dark:bg-gray-700 dark:hover:bg-gray-600 bg-gray-200 hover:bg-gray-300 rounded-full px-2`}
                                            onClick={eliminarDolarManual}
                                        >
                                            X
                                        </button>}
                                </p>)
                                : (
                                    <div className="flex justify-end">

                                        <p className="mr-1">Dolar hoy: $ </p>
                                        <form onSubmit={onSubmit} className="w-1/4" >
                                            <input
                                                type="tel"
                                                name="precio"
                                                autoComplete="off"
                                                id="precio"
                                                className={`w-full  dark:bg-gray-900 focus:outline-none focus:ring focus:border-blue-300 dark:text-gray-50 bg-white rounded-sm md:rounded-sm`}
                                                value={precio}
                                                onChange={onChange}
                                            />

                                        </form>
                                    </div>
                                )}
                        </div>


                    }
                </div>
            </div>
            {/*{spinner ? <Spinner/> : ( */}

            <table className="top-44 sm:top-44 lg:top-0 w-full mt-5 table-fixed shadow rounded-none md:rounded-lg dark:bg-gray-900 bg-white ">
                <thead className="bg-blue-800 text-white">
                    <tr className="hover:cursor-pointer select-none">
                        <th onClick={() => setOrdenCodigo(!ordenCodigo)} className="p-2 md:rounded-tl-lg break-words w-20">CODIGO</th>
                        <th className="w-32">IMAGEN</th>
                        <th onClick={() => setOrdenNombre(!ordenNombre)} className="break-words">NOMBRE</th>
                        <th onClick={() => setOrdenMarca(!ordenMarca)} className="break-words">MARCA</th>
                        <th onClick={() => setOrdenModelo(!ordenModelo)} className="break-words">MODELO</th>
                        <th onClick={() => setOrdenDisponibles(!ordenDisponibles)} className="break-words w-28">DISPONIBLES</th>
                        <th className="break-words">GARANTÍA</th>
                        <th onClick={() => setOrdenPrecio(!ordenPrecio)} className="break-words">CONTADO</th>
                        <th onClick={() => setOrdenPrecio(!ordenPrecio)} className="break-words">AHORA 12</th>
                        <th className="md:rounded-tr-lg w-40 break-words">ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {filtrados.length > 0 ? (   //si estoy filtrando y hay resultados
                        filtrados.map(producto => (
                            <Producto
                                key={producto._id}
                                producto={producto}
                            />
                        ))
                    ) : !escribiendo ? ( //si no estoy escribiendo y no filtro nada, muestro todos los productos que cumplen la condicion de visibilidad
                        productos
                            .filter(producto => producto.visibilidad)
                            .map(producto => (
                                <Producto
                                    key={producto._id}
                                    producto={producto}
                                />
                            ))
                    ) : null}
                </tbody>

            </table>


            {/* lupa */}
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

            {modal && ( 
                <Modal
                    isOpen={modal}
                    style={customStyles}
                    onRequestClose={ocultarModal}
                >
                    <Image
                        src={`/imagenes/${productoSeleccionado.imagen}`}
                        width={800}
                        height={800}
                        quality={100}
                        alt="imagen producto"
                        style={{ objectFit: 'contain' }}
                    />
                    <button onClick={ocultarModal}></button>

                </Modal>
            )}

        </>
    )

};

export default ListadoProductos;




