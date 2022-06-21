import { useContext, useEffect, useState } from "react";
import Proveedor from "./Proveedor";
import productoContext from "../../context/productos/productoContext";
import authContext from "../../context/auth/authContext";
import Image from "next/image";
import Swal from "sweetalert2";

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


    useEffect(() => {
        usuarioAutenticado()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        traerProveedores()
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

    const onChangeFiltro = e => {
        setFiltrando(e.target.value)
        filtroProveedor(e.target.value.toUpperCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
    }

    

    const ordenarEmpresa = () => {
        setOrdenEmpresa(!ordenEmpresa)
    }
    

    const modal = async() => {
        const { value: formValues } = await Swal.fire({
            title: `${modo ? '<h5 style="color:white">Agregar proveedor</h5>' : '<h5 style="color:#545454">Agregar proveedor</h5>'}`,
            background: `${modo ? "rgb(31 41 55)" : "white"}`,
            html:`${modo ?
                '<input id="swal-input1" class="swal2-input" placeholder="Nombre y apellido" style="color:white">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Empresa" style="color:white">' +
                '<input id="swal-input3" class="swal2-input" placeholder="Tel. Empresa" style="color:white">' +
                '<input id="swal-input4" class="swal2-input" placeholder="Tel. Empresa" style="color:white">'
            :
                '<input id="swal-input1" class="swal2-input" placeholder="Nombre y apellido">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Empresa">' +
                '<input id="swal-input3" class="swal2-input" placeholder="Tel. Empresa">' +
                '<input id="swal-input4" class="swal2-input" placeholder="Tel. Empresa">'
            }
            
            `,
            focusConfirm: false,
            preConfirm: () => {
              return [
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value,
                document.getElementById('swal-input3').value,
                document.getElementById('swal-input4').value
              ]
            }
          })
          
          if (formValues) {
            if(formValues[1]) {

                const funcion = async () => {
    
                    const proveedor = {
                        nombre: formValues[0],
                        empresa: formValues[1],
                        telPersonal: formValues[2],
                        telEmpresa: formValues[3]
                    }
                    await agregarProveedor(proveedor)
                    traerProveedores()
                }
                funcion()
            } else {
                await Swal.fire({ //le pongo el await para que la siguiente funcion se ejecute cuando quite el modal de error
                    icon: 'error',
                    title: 'Error',
                    color:`${modo ? "white" : "rgb(31 41 55)"}`,
                    background: `${modo ? "rgb(31 41 55)" : "white"}`,
                    html: `${modo ? '<p style="color:white">El <b>nombre de la empresa</b> es obligatorio.</p>' : '<p style="color: black">El <b>nombre de la empresa</b> es obligatorio.</p>'}`,
                })
                return modal()
            }
          } 
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
                        {/*<Image
                            src={`${modo && escribiendo ? "/close_dark.svg" : !modo && escribiendo ? "/close_light.svg": modo && !escribiendo ? "/search_light.svg" : "/search_dark.svg"}`}
                            alt="Cerrar"
                            width={30} 
                            height={30}
                            priority={true}
                            className="cursor-pointer"
                            onClick={escribiendo ? () => setFiltrando("") : null}
                        />*/}
                    </div> 
                </div>  
                <button
                    className="bg-green-800 hover:bg-green-900 rounded-lg text-white shadow-md px-4 font-bold uppercase "
                    onClick={() => modal()}
                >
                    {crearNuevo ? "CANCELAR" : "AGREGAR"}
                </button>
            </div> 
        </div>
            {crearNuevo && modal()
                
            
            }
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