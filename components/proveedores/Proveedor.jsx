import Image from "next/image";
import { useContext } from "react"
import authContext from "../../context/auth/authContext";
import proveedorContext from "../../context/proveedores/proveedorContext";
import Swal from "sweetalert2";
import mostarAlerta from "../../config/alerts";

const Proveedor = ({ proveedor, crearNuevo }) => {

    const AuthContext = useContext(authContext)
    const { modo } = AuthContext

    const ProveedorContext = useContext(proveedorContext)
    const { eliminarUnProveedor, proveedorActual, limpiarSeleccionado } = ProveedorContext

    const { _id, nombre, empresa, telPersonal, telEmpresa, email } = proveedor

    const editarProveedor = async () => {
        const error = await proveedorActual(_id)
        if (error) return mostarAlerta(error, modo)
    }

    const Eliminado = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    })

    const eliminarElProveedor = async () => {
        await limpiarSeleccionado()
        Swal.fire({
            title: `${modo ? '<h5 style="color:white">¿Estás seguro?</h5>' : '<h5 style="color:#545454">¿Estás seguro?</h5>'}`,
            text: "¡No se puede revertir esto!",
            icon: 'warning',
            color: `${modo ? "white" : "#545454"}`,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: '<b>Si, eliminar!</b>',
            confirmButtonColor: '#d33',
            cancelButtonText: '<p>Cancelar</p>',
            background: `${modo ? "rgb(31 41 55)" : "white"}`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const error = await eliminarUnProveedor(_id)
                if (error) return mostarAlerta(error, modo)
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
            <td className="p-1 dark:text-gray-50 text-center break-words">{nombre ? nombre : "-"}</td>
            <td className="p-1 dark:text-gray-50 text-center break-words">{empresa ? empresa : "-"}</td>
            <td className="p-1 dark:text-gray-50 text-center break-words">{telPersonal ? telPersonal : "-"}</td>
            <td className="p-1 dark:text-gray-50 text-center break-words">{telEmpresa ? telEmpresa : "-"}</td>
            <td className="p-1 dark:text-gray-50 text-center break-words">{email ? email : "-"}</td>
            <td className="p-1 w-40 mt-2">
                <div className="flex justify-evenly">
                    <div className={`${crearNuevo && "hidden"} hover:bg-gray-200 dark:hover:bg-gray-600 p-1 pb-0 items-center rounded-md hover:cursor-pointer`}>

                        <Image
                            src={`${modo ? "/editar_light.svg" : "/editar_dark.svg"}`}
                            alt="Editar"
                            width={30}
                            height={30}
                            priority={true}
                            onClick={editarProveedor}
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