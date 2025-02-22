import { useContext, useEffect, useState } from "react";
import Porcentaje from "./Porcentaje";
import porcentajeContext from "../../context/porcentajes/porcentajeContext";
import authContext from "../../context/auth/authContext";
import Swal from "sweetalert2";

const ListadoPorcentajes = () => {

    const AuthContext = useContext(authContext)
    const {modo, usuarioAutenticado} = AuthContext

     

    const PorcentajeContext = useContext(porcentajeContext)
    const {
        porcentajes, 
        porcentajeSeleccionado,
        traerPorcentajes,
        editarPorcentaje,
        limpiarSeleccionado
    } = PorcentajeContext

    const [crearNuevo, setCrearNuevo] = useState(false)
    const [editar, setEditar] = useState(porcentajeSeleccionado ? true : false)

    const [porcentaje, setPorcentaje] = useState({
        nombre: "",
        comision: ""
    })

    const {nombre, comision} = porcentaje

    useEffect(() => {
        usuarioAutenticado()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        traerPorcentajes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])    

    

    useEffect(() => {
        if(porcentajeSeleccionado) {

            setPorcentaje({
                nombre: porcentajeSeleccionado.nombre,
                comision: porcentajeSeleccionado.comision
            })
            setEditar(true)
        } else {
            setPorcentaje({
                nombre: "",
                comision: ""
            })
        }
    },[porcentajeSeleccionado])

    useEffect(() => {
        if(crearNuevo) {
            limpiarSeleccionado()
        }
    },[crearNuevo])

    const crearEditar = () => {
        if(!crearNuevo && !porcentajeSeleccionado) {
            setCrearNuevo(!crearNuevo)
            setEditar(false)
        } else {
           if(!crearNuevo) {
            limpiarSeleccionado()
            setCrearNuevo(true)  
        } else {
            setCrearNuevo(false)
        }
            
        }
        if(porcentajeSeleccionado) {
            setEditar(false)
            setCrearNuevo(false)
            limpiarSeleccionado()
            setPorcentaje({
                nombre: "",
                comision: ""
            })
        }
    }


    const onChange = e => {
        setPorcentaje({
            ...porcentaje,
            [e.target.name]: e.target.value
        })
    }


    const Editado = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    })
    const editadoExito = () => {
        Editado.fire({
            icon: 'success',
            title: "Se editó correctamente",
            background: `${modo ? "#505050" : "white"}`,
            width: "25%",
            color: `${modo ? "white" : "#545454"}`,
        })
    } 
    const Agregado = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    })
    const agregadoExito = () => {
        Agregado.fire({  
            icon: 'success',
            title: "Se agregó correctamente",
            background: `${modo ? "#505050" : "white"}`,
            width: "25%",
            color: `${modo ? "white" : "#545454"}`,
        })
    } 

    const onSubmit = async e => {
        e.preventDefault()

        if(!porcentaje.nombre) {
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">El <b>nombre del porcentaje</b> es obligatorio.</p>' : '<p style="color:#545454">El <b>nombre del porcentaje</b> es obligatorio.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
                })
            return
        }
        const comisionCambiada = Number(comision)
        if(!comision || comision < 1 || isNaN(comision) || !Number(comisionCambiada)) {
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">La <b>comision</b> tiene que ser mayor a 0.</p>' : '<p style="color:#545454">La <b>comision</b> tiene que ser mayor a 0.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
                })
            return
        }
        
        if(!porcentajeSeleccionado) {
            await agregarPorcentaje(porcentaje)
            setCrearNuevo(!crearNuevo)
            agregadoExito()
        } else { 
            porcentaje._id = porcentajeSeleccionado._id
            porcentaje.comision = Number(porcentaje.comision)
            editarPorcentaje(porcentaje)
            await limpiarSeleccionado()
            editadoExito()
        }

        setPorcentaje({
            nombre: "",
            comision: ""
        })
    }
    
  return (
    <>   
        <div className="absolute lg:relative  min-w-full m-0">
            <h1 className="font-black dark:text-green-500 text-3xl sm:text-4xl text-green-900 text-center mt-2 sm:mt-0 mb-4 ">Listado de porcentajes</h1>
            <p className="mt-3 text-center text-black dark:text-gray-50">Listado con porcentajes de las comisiones. Se pueden ver y editar las comisiones</p>

            <div className="flex flex-col-reverse sm:flex-row justify-end ">

                {porcentajeSeleccionado && 
                    <button
                        className="bg-green-800 hover:bg-green-900 rounded-lg text-white shadow-md p-4 font-bold uppercase "
                        onClick={crearEditar}
                    >
                        {crearNuevo || porcentajeSeleccionado && "CANCELAR"}
                    </button>
                }
            </div> 
        </div>
            
            {crearNuevo && (
                <div className="dark:bg-gray-900 py-3 bg-white rounded-lg mt-6 mx-auto lg:w-2/4">

                    <form 
                        onSubmit={onSubmit}
                    >
                        <div className="flex justify-between px-2 gap-2">
                            <div>
                                <label htmlFor="nombre" className="text-gray-800 dark:text-gray-300 font-bold font">Nombre</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    autoComplete="off"
                                    className="bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300 uppercase w-full p-2 rounded-md border-none active:ring-1 shadow-sm"
                                    placeholder="Accesorios"
                                    value={nombre}
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="porcentaje" className="text-gray-800 dark:text-gray-300 font-bold font">Comision %</label>

                                <input
                                    type="tel"
                                    name="comision"
                                    autoComplete="off"
                                    className="bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300  uppercase w-full p-2 rounded-md border-none active:ring-1 shadow-sm"
                                    placeholder="30%"
                                    value={comision}
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
            }
            {porcentajeSeleccionado && (
                <div className="dark:bg-gray-900 py-3 bg-white rounded-lg mt-6 mx-auto lg:w-2/4">

                    <form 
                        onSubmit={onSubmit}
                    >
                        <div className="flex justify-between px-2 gap-2">
                            <div>
                                <label htmlFor="nombre" className="text-gray-800 dark:text-gray-300 font-bold font">Nombre y apellido</label>
                                <input
                                    name="nombre"
                                    className="bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300 uppercase w-full p-2 rounded-md border-none active:ring-1 shadow-sm"
                                    placeholder="Juan Pérez"
                                    value={nombre}
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="comision" className="text-gray-800 dark:text-gray-300 font-bold font">Comision %</label>

                                <input
                                    name="comision"
                                    autoComplete="off"
                                    className="bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300  uppercase w-full p-2 rounded-md border-none active:ring-1 shadow-sm"
                                    placeholder="Mercadolibre"
                                    value={comision}
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
            }
            
        <table className="relative top-44 sm:top-44 lg:top-0 lg:w-2/4 mx-auto mt-5 table-fixed shadow rounded-lg dark:bg-gray-900 bg-white ">
            <thead className="bg-green-600 text-white">
                <tr className="hover:cursor-pointer select-none">
                    <th className="p-2 rounded-tl-lg break-words">NOMBRE</th>
                    <th className="break-words">COMISION</th>
                    <th className="rounded-tr-lg w-28">ACCIONES</th>
                </tr>
            </thead>
            <tbody>
                <>
                    {porcentajes.map(porcentaje => (
                        <Porcentaje
                            key={porcentaje._id}
                            porcentaje={porcentaje}
                        />
                    ))}
                </>
                
            </tbody>
        </table>
    </>
  )
}

export default ListadoPorcentajes