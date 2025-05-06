import { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ventaContext from "../../../context/historial/ventas/ventaContext";
import authContext from "../../../context/auth/authContext";
import { generarFecha } from "../../../helpers";
import Swal from "sweetalert2";
import mostarAlerta from "../../../config/alerts";

const Venta = ({ producto }) => {

    const AuthContext = useContext(authContext)
    const { modo } = AuthContext

    const VentaContext = useContext(ventaContext)
    const { editarVenta, eliminarVenta } = VentaContext

    const {
        _id,
        codigo,
        nombre,
        marca,
        modelo,
        barras,
        fecha,
        dolar,
        precioEnDolar,
        precioEnArs,
        unidades,
        idProducto,
        existeProducto
    } = producto


    const Copiado = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    })

    const Eliminado = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    })

    const editarLaVenta = async () => {
        const valor = await Swal.fire({ //modal del input
            title: `${modo ? '<h5 style="color:white">Unidades</h5>' : '<h5 style="color:#545454">Unidades</h5>'}`,
            background: `${modo ? "rgb(31 41 55)" : "white"}`,
            html: `${modo ? '<input id="swal-input" type="tel" value="1" style="color: white; width: 100px; text-align:center" class="swal2-input">' : '<input id="swal-input" type="tel" value="1" style="color: black; width: 100px; text-align:center;" class="swal2-input">'}`,
            width: "25rem",
            focusConfirm: true,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input').value
                ]
            },
            showCloseButton: true,
        })
        if (valor.isConfirmed) {
            const cantidad = Number(valor.value[0])
            if (cantidad < 1 || !cantidad || isNaN(cantidad) || !Number.isInteger(cantidad)) {
                await Swal.fire({ //le pongo el await para que la siguiente funcion se ejecute cuando quite el modal de error
                    icon: 'error',
                    title: 'Error',
                    color: `${modo ? "white" : "rgb(31 41 55)"}`,
                    background: `${modo ? "rgb(31 41 55)" : "white"}`,
                    html: `${modo ? '<p style="color:#a59ff3">Los <b>unidades a descontar</b> deben ser un número entero mayor a 0.</p>' : '<p style="color: #545454">Los <b>unidades a descontar</b> deben ser un número entero mayor a 0.</p>'}`,
                })
                return editarLaVenta()   //luego de mostrar el modal de error, vuelvo a ejecutar la funcion desde 0
            }
            if (cantidad > unidades) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    color: `${modo ? "white" : "rgb(31 41 55)"}`,
                    background: `${modo ? "rgb(31 41 55)" : "white"}`,
                    html: `${modo ? '<p style="color:#a59ff3"><b>No se pueden descontar</b> más unidades de las que se vendieron.</p>' : '<p style="color: #545454">No se pueden descontar</b> más unidades de las que se vendieron..</p>'}`,
                })
                return editarLaVenta()
            }
            if (unidades == cantidad) {
                const error = await eliminarVenta(_id, idProducto, unidades)
                if (error) return mostarAlerta(error, modo)
                return Eliminado.fire({
                    icon: 'success',
                    title: `Se devolvió ${nombre} correctamente`,
                    background: `${modo ? "#505050" : "white"}`,
                    width: "25%",
                    color: `${modo ? "white" : "#545454"}`,
                })
            }
            const error = await editarVenta(_id, idProducto, cantidad)
            if (error) return mostarAlerta(error, modo)
            await Copiado.fire({    //luego de descontar de la bd, muestro alerta de venta correcta
                icon: 'success',
                title: `${unidades > 1 ? "Se devolvieron " + unidades + " unidades de " + nombre : "Se devolvieron " + unidades + " unidades de " + nombre}`,
                background: `${modo ? "#505050" : "white"}`,
                width: "25%",
                color: `${modo ? "white" : "#545454"}`,
            })
        }
    }


    const eliminarLaVenta = async () => {
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
                const error = await eliminarVenta(_id, idProducto, unidades)
                if (error) return mostarAlerta(error, modo)
                Eliminado.fire({
                    icon: 'success',
                    title: "Se eliminó la venta correctamente",
                    background: `${modo ? "#505050" : "white"}`,
                    width: "25%",
                    color: `${modo ? "white" : "#545454"}`,
                })
            }
        })
    }


    return (

        <tr className={`  dark:last:border-none  hover:bg-gray-50 hover:cursor-pointer active:bg-gray-100 dark:active:bg-gray-800 dark:hover:bg-gray-700`}>
            <td className="p-3 dark:text-gray-50 text-center w-1">{codigo}</td>
            <td className="p-3 dark:text-gray-50 text-center break-words">{nombre}</td>
            <td className="p-3 dark:text-gray-50 text-center break-words">{!marca ? "-" : marca}</td>
            <td className="p-3 dark:text-gray-50 text-center break-words">{!modelo ? "-" : modelo}</td>
            <td className="p-3 dark:text-gray-50 text-center break-words">{!barras ? "-" : barras}</td>
            <td className="p-3 dark:text-gray-50 text-center">{!fecha ? "-" : generarFecha(fecha)}</td>
            <td className="p-3 dark:text-gray-50 text-center break-words">{!dolar ? "-" : `$ ${dolar}`}</td>
            <td className="p-3 dark:text-gray-50 text-center break-words">{!precioEnDolar ? "-" : `$ ${precioEnDolar}`}</td>
            <td className="p-3 dark:text-gray-50 text-center break-words">{!precioEnArs ? "-" : `$ ${precioEnArs}`}</td>
            <td className="p-3 dark:text-gray-50 text-center w-1">{!unidades ? "-" : unidades}</td>
            <td className="p-1 mt-2 w-32 ">
                {existeProducto ? (
                    <div className="flex justify-evenly">
                        <div className="hover:bg-gray-200 dark:hover:bg-gray-600 p-1 pb-0 items-center rounded-md hover:cursor-pointer">
                            <Image
                                src={`${modo ? "/editar_light.svg" : "/editar_dark.svg"}`}
                                alt="Editar"
                                width={30}
                                height={30}
                                priority={true}
                                onClick={editarLaVenta}
                            />
                        </div>
                        <div className="hover:bg-gray-200 dark:hover:bg-gray-600 p-1 pb-0 items-center rounded-md hover:cursor-pointer">
                            <Image
                                src={`${modo ? "/delete_light.svg" : "/delete_dark.svg"}`}
                                alt="Eliminar"
                                width={30}
                                height={30}
                                priority={true}
                                className="cursor-pointer"
                                onClick={eliminarLaVenta}
                            />
                        </div>
                    </div>

                ) : "Producto eliminado"}
            </td>

        </tr>
    );
};

export default Venta;
