import { useContext, useEffect, useState } from "react";
import Rubro from "./Rubro";
import rubroContext from "../../context/rubros/rubroContext";
import authContext from "../../context/auth/authContext";
import Swal from "sweetalert2";

const ListadoRubros = () => {

    const AuthContext = useContext(authContext)
    const {modo, usuarioAutenticado} = AuthContext

     

    const RubroContext = useContext(rubroContext)
    const {
        rubros, 
        agregarRubro,
        rubroSeleccionado,
        traerRubros,
        editarRubro,
        limpiarSeleccionado,
        mensajeRubro
    } = RubroContext

    const [crearNuevo, setCrearNuevo] = useState(false)
    const [editar, setEditar] = useState(rubroSeleccionado ? true : false)

    const [rubro, setRubro] = useState({
        nombre: "",
        rentabilidad: ""
    })

    const {nombre, rentabilidad} = rubro

    useEffect(() => {
        usuarioAutenticado()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        traerRubros()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])    

    

    useEffect(() => {
        if(rubroSeleccionado) {

            setRubro({
                nombre: rubroSeleccionado.nombre,
                rentabilidad: rubroSeleccionado.rentabilidad
            })
            setEditar(true)
        } else {
            setRubro({
                nombre: "",
                rentabilidad: ""
            })
        }
    },[rubroSeleccionado])

    useEffect(() => {
        if(crearNuevo) {
            limpiarSeleccionado()
        }
    },[crearNuevo])

    const crearEditar = () => {
        if(!crearNuevo && !rubroSeleccionado) {
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
        if(rubroSeleccionado) {
            setEditar(false)
            setCrearNuevo(false)
            limpiarSeleccionado()
            setRubro({
                nombre: "",
                rentabilidad: ""
            })
        }
    }


    const onChange = e => {
        setRubro({
            ...rubro,
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

    const error = () => {
        Agregado.fire({  
            icon: 'error',
            title: "Error. Ya existe un rubro con ese nombre",
            background: `${modo ? "#505050" : "white"}`,
            width: "25%",
            color: `${modo ? "white" : "#545454"}`,
        })
    } 

    const onSubmit = async e => {
        e.preventDefault()

        if(!rubro.nombre) {
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">El <b>nombre del rubro</b> es obligatorio.</p>' : '<p style="color:#545454">El <b>nombre del rubro</b> es obligatorio.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
                })
            return
        }
        const rentabilidadCambiada = Number(rentabilidad)
        if(!rentabilidad || rentabilidad < 1 || isNaN(rentabilidad) || !Number(rentabilidadCambiada)) {
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">La <b>rentabilidad</b> tiene que ser mayor a 0.</p>' : '<p style="color:#545454">La <b>rentabilidad</b> tiene que ser mayor a 0.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
                })
            return
        }
        
        if(!rubroSeleccionado) {
            const rubroExiste = rubros.filter(rubre => rubre.nombre.toLowerCase() == nombre.toUpperCase())
            
            if(rubroExiste.length) {
                return error()
            }
            await agregarRubro(rubro)
            setCrearNuevo(!crearNuevo)
            agregadoExito()
        } else { 
            rubro._id = rubroSeleccionado._id
            editarRubro(rubro)
            await limpiarSeleccionado()
            editadoExito()
        }

        setRubro({
            nombre: "",
            rentabilidad: ""
        })
    }
    
  return (
    <>   
        <div className="absolute lg:relative  min-w-full m-0">
            
            <h1 className="font-black dark:text-teal-500 text-3xl sm:text-4xl text-teal-900 text-center mt-2 sm:mt-0 mb-4 ">Listado de rubros</h1>
            {mensajeRubro ?? (
                <h3>{mensajeRubro}</h3>
            )}
            <div className="flex flex-col-reverse sm:flex-row justify-end ">
                
                <button
                    className="bg-teal-800 hover:bg-teal-900 rounded-lg text-white shadow-md p-4 font-bold uppercase "
                    onClick={crearEditar}
                >
                    {crearNuevo || rubroSeleccionado ? "CANCELAR" : "AGREGAR"}
                </button>
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
                                <label htmlFor="porcentaje" className="text-gray-800 dark:text-gray-300 font-bold font">Rentabilidad %</label>

                                <input
                                    type="tel"
                                    name="rentabilidad"
                                    autoComplete="off"
                                    className="bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300  uppercase w-full p-2 rounded-md border-none active:ring-1 shadow-sm"
                                    placeholder="30%"
                                    value={rentabilidad}
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
            {rubroSeleccionado && (
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
                                <label htmlFor="rentabilidad" className="text-gray-800 dark:text-gray-300 font-bold font">Rentabilidad %</label>

                                <input
                                    name="rentabilidad"
                                    autoComplete="off"
                                    className="bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300  uppercase w-full p-2 rounded-md border-none active:ring-1 shadow-sm"
                                    placeholder="Mercadolibre"
                                    value={rentabilidad}
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
            
        <table className="relative top-44 sm:top-44 lg:top-0 lg:w-2/4 mx-auto mt-5 table-auto shadow rounded-lg dark:bg-gray-900 bg-white ">
            <thead className="bg-teal-600 text-white">
                <tr className="hover:cursor-pointer select-none">
                    <th className="p-2 rounded-tl-lg">Nombre</th>
                    <th>RENTABILIDAD</th>
                    <th className="rounded-tr-lg">ACCIONES</th>
                </tr>
            </thead>
            <tbody>
                <>
                    {rubros.map(rubro => (
                        <Rubro
                            key={rubro._id}
                            rubro={rubro}
                            crearNuevo={crearNuevo}
                        />
                    ))}
                </>
                
            </tbody>
        </table>
    </>
  )
}

export default ListadoRubros