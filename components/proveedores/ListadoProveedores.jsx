import { useContext, useEffect, useState } from "react";
import Proveedor from "./Proveedor";
import proveedorContext from "../../context/proveedores/proveedorContext";
import authContext from "../../context/auth/authContext";
import Image from "next/image";
import Swal from "sweetalert2";

const ListadoProveedores = () => {

    const AuthContext = useContext(authContext)
    const {modo, usuarioAutenticado} = AuthContext

     

    const ProveedorContext = useContext(proveedorContext)
    const {
        proveedores, 
        agregarProveedor,
        proveedorSeleccionado,
        traerProveedores,
        editarProveedor,
        proveedoresFiltrados,
        filtroProveedor,
        orderEmpresa,
        orderEmpresaFiltrados,
        limpiarSeleccionado
    } = ProveedorContext


    const [filtrando, setFiltrando] = useState("") 
    const [escribiendo, setEscribiendo] = useState(false)
    const [focus, setFocus] = useState(false)
    const [ordenEmpresa, setOrdenEmpresa] = useState(false)
    const [crearNuevo, setCrearNuevo] = useState(false)
    const [editar, setEditar] = useState(proveedorSeleccionado ? true : false)
    
    const [proveedor, setProveedor] = useState({
        nombre: "",
        empresa: "",
        telEmpresa: "",
        telPersonal: "",
        email: ""
    })

    const {nombre, empresa, telPersonal, telEmpresa, email} = proveedor

    useEffect(() => {
        usuarioAutenticado()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        traerProveedores()
        limpiarSeleccionado()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
    
    useEffect(() => {
        if(proveedorSeleccionado) {

            setProveedor({
                nombre: proveedorSeleccionado.nombre,
                empresa: proveedorSeleccionado.empresa,
                telPersonal: proveedorSeleccionado.telPersonal,
                telEmpresa: proveedorSeleccionado.telEmpresa,
                email: proveedorSeleccionado.email
            })
            setEditar(true)
        } else {
            setProveedor({
                nombre: "",
                empresa: "",
                telPersonal: "",
                telEmpresa: "",
                email: ""
            })
        }
    },[proveedorSeleccionado])

    useEffect(() => {
        if(crearNuevo) {
            limpiarSeleccionado()
        }
    },[crearNuevo])

    const crearEditar = () => {
        if(!crearNuevo && !proveedorSeleccionado) {
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
        if(proveedorSeleccionado) {
            setEditar(false)
            setCrearNuevo(false)
            limpiarSeleccionado()
            setProveedor({
                nombre: "",
                empresa: "",
                telPersonal: "",
                telEmpresa: "",
                email: ""
            })
        }
    }

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

        if(!proveedor.empresa) {
            Swal.fire({
                icon: 'error',
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">El <b>nombre de la empresa</b> es obligatorio.</p>' : '<p style="color:#545454">El <b>nombre de la empresa</b> es obligatorio.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`,
                })
            return
        }
        
        if(!proveedorSeleccionado) {
            await agregarProveedor(proveedor)
            setCrearNuevo(!crearNuevo)
            agregadoExito()
        } else { 
            proveedor._id = proveedorSeleccionado._id
            editarProveedor(proveedor)
            await limpiarSeleccionado()
            editadoExito()
        }

        setProveedor({
            nombre: "",
            empresa: "",
            telPersonal: "",
            telEmpresa: ""
        })
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
                        placeholder="Buscar algún proveedor"
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
                <button
                    className="bg-green-800 hover:bg-green-900 rounded-lg text-white shadow-md px-4 font-bold uppercase "
                    onClick={crearEditar}
                >
                    {crearNuevo || proveedorSeleccionado? "CANCELAR" : "AGREGAR"}
                </button>
            </div> 
        </div>
            {/*<div>
                <PDFFile>
                    {proveedor}
                </PDFFile>
            </div>*/}
            {crearNuevo && (
                <div className="dark:bg-gray-900 py-3 bg-white rounded-lg mt-6 mx-auto">

                    <form 
                        onSubmit={onSubmit}
                    >
                        <div className="flex justify-between px-2 gap-2">
                            <div>
                                <label htmlFor="nombre" className="text-gray-800 dark:text-gray-300 font-bold font">Nombre y apellido</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    autoComplete="off"
                                    className="bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300 uppercase w-full p-2 rounded-md border-none active:ring-1 shadow-sm"
                                    placeholder="Juan Pérez"
                                    value={nombre}
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="empresa" className="text-gray-800 dark:text-gray-300 font-bold font">Empresa</label>

                                <input
                                    type="text"
                                    name="empresa"
                                    autoComplete="off"
                                    list="empresas"
                                    className="bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300  uppercase w-full p-2 rounded-md border-none active:ring-1 shadow-sm"
                                    placeholder="Mercadolibre"
                                    value={empresa}
                                    onChange={onChange}
                                />
                                <datalist id="empresas">
                                    {proveedores.map(proveedor =>
                                        <option key={proveedor._id} value={proveedor.empresa}></option>
                                    )}
                                </datalist>
                            </div>
                            <div>
                                <label htmlFor="telpersonal" className="text-gray-800 dark:text-gray-300 font-bold font">Tel. Personal</label>

                                <input
                                    type="tel"
                                    name="telPersonal"
                                    autoComplete="off"
                                    className="bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300 uppercase w-full p-2 rounded-md border-none active:ring-1  shadow-sm"
                                    placeholder="3446101010"
                                    value={telPersonal}
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="telempresa" className="text-gray-800 dark:text-gray-300 font-bold font">Tel. Empresa</label>

                                <input
                                    type="tel"
                                    name="telEmpresa"
                                    autoComplete="off"
                                    className="bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300 uppercase w-full p-2 rounded-md border-none active:ring-1 shadow-sm"
                                    placeholder="3446101010"
                                    value={telEmpresa}
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="text-gray-800 dark:text-gray-300 font-bold font">Email</label>

                                <input
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    className="bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300 uppercase w-full p-2 lowercase rounded-md border-none active:ring-1 shadow-sm"
                                    placeholder="correo@correo.com"
                                    value={email}
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
            {proveedorSeleccionado && (
                <div className="dark:bg-gray-900 py-3 bg-white rounded-lg mt-6 mx-auto">

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
                                <label htmlFor="empresa" className="text-gray-800 dark:text-gray-300 font-bold font">Empresa</label>

                                <input
                                    name="empresa"
                                    autoComplete="off"
                                    list="empresas"
                                    className="bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300  uppercase w-full p-2 rounded-md border-none active:ring-1 shadow-sm"
                                    placeholder="Mercadolibre"
                                    value={empresa}
                                    onChange={onChange}
                                />
                                <datalist id="empresas">
                                    {proveedores.map(proveedor =>
                                        <option key={proveedor._id} value={proveedor.empresa}></option>
                                    )}
                                </datalist>
                            </div>
                            <div>
                                <label htmlFor="telpersonal" className="text-gray-800 dark:text-gray-300 font-bold font">Tel. Personal</label>

                                <input
                                    name="telPersonal"
                                    className="bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300 uppercase w-full p-2 rounded-md border-none active:ring-1  shadow-sm"
                                    placeholder="3446101010"
                                    value={telPersonal}
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="telempresa" className="text-gray-800 dark:text-gray-300 font-bold font">Tel. Empresa</label>

                                <input
                                    name="telEmpresa"
                                    className="bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300 uppercase w-full p-2 rounded-md border-none active:ring-1 shadow-sm"
                                    placeholder="3446101010"
                                    value={telEmpresa}
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="text-gray-800 dark:text-gray-300 font-bold font">Email</label>

                                <input
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    className="bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300 uppercase w-full p-2 lowercase rounded-md border-none active:ring-1 shadow-sm"
                                    placeholder="correo@correo.com"
                                    value={email}
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
            
        <table className="relative top-44 sm:top-44 lg:top-0 w-full mt-5 table-auto shadow rounded-lg dark:bg-gray-900 bg-white ">
            <thead className="bg-green-600 text-white">
                <tr onClick={() => ordenarEmpresa()} className="hover:cursor-pointer select-none">
                    <th className="p-2 rounded-tl-lg">NOMBRE Y APELLIDO</th>
                    <th>EMPRESA</th>
                    <th>TEL. PERSONAL</th>
                    <th>TEL. EMPRESA</th>
                    <th>EMAIL</th>
                    <th className="rounded-tr-lg">ACCIONES</th>
                </tr>
            </thead>
            <tbody>
                {!proveedoresFiltrados.length && escribiendo ? (
                    <>
                        <tr className="relative p-3 text-2xl dark:text-gray-50">
                            <td>No hay resultados</td>
                        </tr>
                    </>) 
                : proveedoresFiltrados.length && escribiendo ?(
                    <>
                        {proveedoresFiltrados.map(proveedor => (
                            <Proveedor
                                key={proveedor._id}
                                proveedor={proveedor}
                                crearNuevo={crearNuevo}
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
                            crearNuevo={crearNuevo}
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