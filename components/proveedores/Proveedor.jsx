import Image from "next/image";
import { useContext, useEffect } from "react"
import authContext from "../../context/auth/authContext";
import proveedorContext from "../../context/proveedores/proveedorContext";
import Swal from "sweetalert2";

const Proveedor = ({proveedor}) => {

    const AuthContext = useContext(authContext)
    const {modo} = AuthContext

    const ProveedorContext = useContext(proveedorContext)
    const {eliminarUnProveedor, proveedorActual, editarProveedor, proveedorSeleccionado} = ProveedorContext

    const {_id, nombre, empresa, telPersonal, telEmpresa} = proveedor
    

    const Eliminado = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    })

    const eliminarElProveedor = async () => {
        Swal.fire({
            title: `${modo ? '<h5 style="color:white">¿Estás seguro?</h5>' : '<h5 style="color:#545454">¿Estás seguro?</h5>'}`,
            text:"¡No se puede revertir esto!",
            icon: 'warning',
            color: `${modo ? "white" : "#545454"}`,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText:'<b>Si, eliminar!</b>',
            confirmButtonColor: '#d33',
            cancelButtonText:'<p>Cancelar</p>',
            background: `${modo ? "rgb(31 41 55)" : "white"}`,
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarUnProveedor(_id)
                Eliminado.fire({
                    icon: 'success',
                    title: "Se eliminó correctamente",
                    background: `${modo ? "#505050" : "white"}`,
                    width: "25%",
                    color: `${modo ? "white" : "#545454"}`,
                })
            }
        })
    }
    

  return (
      <tr className="border-b dark:border-b-gray-800 dark:last:border-none  hover:bg-gray-50 active:bg-gray-100 dark:active:bg-gray-800 dark:hover:bg-gray-700">
            <td className="p-1 dark:text-gray-50 text-center ">{nombre}</td>
            <td className="p-1 dark:text-gray-50 text-center">{empresa}</td>
            <td className="p-1 dark:text-gray-50 text-center">{telPersonal}</td>
            <td className="p-1 dark:text-gray-50 text-center">{telEmpresa}</td>

            <td className="p-1 w-40 mt-2  ">
                <div className="flex justify-evenly">
                    <div className="hover:bg-gray-200 dark:hover:bg-gray-600 p-1 pb-0 items-center rounded-md hover:cursor-pointer">

                        <Image 
                            src={`${modo ? "/editar_light.svg" : "/editar_dark.svg"}`}
                            alt="Eliminar"
                            width={30} 
                            height={30}
                            priority={true}
                            onClick={() => proveedorActual(_id)}
                            />
                    </div>
                    <div className="hover:bg-gray-200 dark:hover:bg-gray-600 p-1 pb-0 items-center rounded-md hover:cursor-pointer">

                        <Image 
                            src={`${modo ? "/delete_light.svg" : "/delete_dark.svg"}`}
                            alt="Eliminar"
                            width={30} 
                            height={30}
                            priority={true}
                            onClick={eliminarElProveedor}
                        />
                    </div>
                </div>
                
            </td>
        </tr>
  )
}

export default Proveedor