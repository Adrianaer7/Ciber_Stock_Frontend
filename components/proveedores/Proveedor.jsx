import Link from "next/link"
import { useContext } from "react"
import productoContext from "../../context/productos/productoContext"
import authContext from "../../context/auth/authContext";
import Swal from "sweetalert2";

const Proveedor = ({proveedor}) => {

    const AuthContext = useContext(authContext)
    const {modo, usuarioAutenticado} = AuthContext

    const productosContext = useContext(productoContext)
    const {eliminarProveedor} = productosContext

    const {_id, nombre, empresa, telPersonal, telEmpresa} = proveedor

    const Eliminado = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    })

    const eliminar = async () => {
        await eliminarProveedor(_id)
    }

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
                eliminar()
                Eliminado.fire({
                    icon: 'success',
                    title: "Se eliminó el proveedor correctamente",
                    background: `${modo ? "#505050" : "white"}`,
                    width: "25%",
                    color: `${modo ? "white" : "#545454"}`,
                })
            }
        })
    }

  return (
    <tr className="border-b dark:border-b-gray-800 dark:last:border-none  hover:bg-gray-50 hover:cursor-pointer active:bg-gray-100 dark:active:bg-gray-800 dark:hover:bg-gray-700">
            <td className="p-3 dark:text-gray-50 text-center ">{nombre}</td>
            <td className="dark:text-gray-50 p-3 text-center">{empresa}</td>
            <td className="p-3 dark:text-gray-50 text-center">{telPersonal}</td>
            <td className="p-3 dark:text-gray-50 text-center">{telEmpresa}</td>

            <td className="p-3 w-40 mt-2  ">
                <div className="flex">

                    <Link passHref href="">
                        <button
                            type="button"
                            className="bg-green-600 hover:bg-red-900 mb-2 w-full text-white p-2 uppercase font-bold text-xs mr-3 rounded-md"
                            onClick={eliminarElProveedor}
                        >X</button>
                    </Link>
                    <Link passHref href="">
                        <button
                            type="button"
                            className="bg-red-600 hover:bg-red-900 mb-2 w-full text-white p-2 uppercase font-bold text-xs mr-3 rounded-md"
                            onClick={eliminarElProveedor}
                        >X</button>
                    </Link>
                </div>
                
            </td>
        </tr>
  )
}

export default Proveedor