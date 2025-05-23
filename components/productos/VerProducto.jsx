import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router"
import { generarFecha } from '../../helpers';
import productoContext from "../../context/productos/productoContext";
import authContext from "../../context/auth/authContext";
import Swal from "sweetalert2";
import mostarAlerta from "../../config/alerts";


const VerProducto = ({ producto, laGarantia, proveedores }) => {
    const AuthContext = useContext(authContext)
    const { modo } = AuthContext

    const productosContext = useContext(productoContext)
    const { eliminarProducto } = productosContext

    const {
        _id,
        nombre,
        codigo,
        barras,
        rubro,
        marca,
        precio_venta_tarjeta,
        precio_venta_efectivo,
        precio_venta_conocidos,
        precio_venta_ahoraDoce,
        precio_venta_cuotas,
        precio_compra_dolar,
        precio_compra_peso,
        valor_dolar_compra,
        fecha_compra,
        todos_proveedores,
        factura,
        disponibles,
        modelo,
        notas
    } = producto

    const router = useRouter()

    const proveedoresIguales = proveedores.filter(prov => todos_proveedores.includes(prov._id))

    let fecha //formateo la fecha ya que me llega y-m-d
    if (fecha_compra) {
        fecha = generarFecha(fecha_compra)
    }
    const Eliminado = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    })

    const eliminar = async () => {
        const error = eliminarProducto(_id)
        if (error) return mostarAlerta(error, modo)
        router.push("/productos")
    }

    const eliminarElProducto = () => {
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
        }).then((result) => {
            if (result.isConfirmed) {
                eliminar()
                Eliminado.fire({
                    icon: 'success',
                    title: "Se eliminó el producto correctamente",
                    background: `${modo ? "#505050" : "white"}`,
                    width: "25%",
                    color: `${modo ? "white" : "#545454"}`,
                })
            }
        })
    }

    return (
        <>
            <div className=' lg:w-2/3 mx-auto dark:bg-gray-800 bg-slate-100 flex flex-col gap-4'>
                <h1 className="font-black text-2xl lg:text-4xl dark:text-blue-300 text-blue-900 text-center break-words">{nombre}</h1>
                <div className=" overflow-x-auto shadow-md sm:rounded-lg">
                    <table className=" sm:table-fixed w-screen sm:w-full text-sm lg:text-lg  text-gray-500 dark:text-gray-400">
                        <tbody>
                            <tr className="dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700 justify-between grid  grid-cols-1 lg:grid-cols-2 ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">NOMBRE</th>
                                <td className="px-6 py-4 text-left break-words">{nombre}</td>
                            </tr>

                            <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700  justify-between grid  grid-cols-1 lg:grid-cols-2">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">MARCA</th>
                                <td className="px-6 py-4 mr-20 text-left break-words">{marca ? marca : "-"}</td>
                            </tr>

                            <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700  justify-between grid  grid-cols-1 lg:grid-cols-2">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">MODELO</th>
                                <td className="px-6 py-4 text-left break-words">{modelo ? modelo : "-"}</td>
                            </tr>

                            <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700  justify-between grid  grid-cols-1 lg:grid-cols-2">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">CÓDIGO</th>
                                <td className="px-6 py-4 text-left">{codigo}</td>
                            </tr>

                            <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700  justify-between grid  grid-cols-1 lg:grid-cols-2">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">CÓDIGO DE BARRAS</th>
                                <td className="px-6 py-4 text-left break-words">{barras ? barras : "-"}</td>
                            </tr>

                            <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700 justify-between grid  grid-cols-1 lg:grid-cols-2">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">PRECIO DE VENTA CONOCIDOS</th>
                                <td className="px-6 py-4 text-left">{precio_venta_conocidos ? "$" + precio_venta_conocidos : "-"}</td>
                            </tr>

                            <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700 justify-between grid  grid-cols-1 lg:grid-cols-2">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">PRECIO DE VENTA EN EFECTIVO</th>
                                <td className="px-6 py-4 text-left">{precio_venta_efectivo ? "$" + precio_venta_efectivo : "-"}</td>
                            </tr>

                            <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700  justify-between grid  grid-cols-1 lg:grid-cols-2">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">PRECIO DE VENTA CON TARJETA</th>
                                <td className="px-6 py-4 text-left">{precio_venta_tarjeta ? "$" + precio_venta_tarjeta : "-"}</td>
                            </tr>

                            <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700  justify-between grid  grid-cols-1 lg:grid-cols-2">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">PRECIO DE VENTA AHORA 12</th>
                                <td className="px-6 py-4 text-left">{precio_venta_ahoraDoce ? "$" + precio_venta_ahoraDoce : "-"}</td>
                            </tr>

                            <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700  justify-between grid  grid-cols-1 lg:grid-cols-2">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">PRECIO DE VENTA CUOTAS AHORA 12</th>
                                <td className="px-6 py-4 text-left">{precio_venta_cuotas ? "$" + precio_venta_cuotas : "-"}</td>
                            </tr>

                            <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700 justify-between grid  grid-cols-1 lg:grid-cols-2">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">RUBRO</th>
                                <td className="px-6 py-4 text-left">{rubro ? rubro : "-"}</td>
                            </tr>

                            <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700 justify-between grid  grid-cols-1 lg:grid-cols-2">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">GARANTIAS</th>
                                <td className="px-6 py-4 text-left break-words">{laGarantia.length > 0 ? laGarantia.map((warranty, i) => <div key={i} className="mb-2"><p key={i} className="inline-block"> Proveedor: {warranty.proveedor}</p><p> Caducidad: {warranty.garantia}</p></div>) : "-"}</td>
                            </tr>

                            <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700 justify-between grid  grid-cols-1 lg:grid-cols-2">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">PROVEEDORES</th>
                                <td className="px-6 py-4 text-left break-words">{proveedoresIguales.length > 0 ? proveedoresIguales.map((prov, i) => <p key={i}>{`${prov.empresa} (${prov.nombre})`}</p>) : "-"}</td>
                            </tr>

                            <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700 justify-between grid  grid-cols-1 lg:grid-cols-2">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">FACTURA DE COMPRA </th>
                                <td className="px-6 py-4 text-left break-words">{factura ? factura : "-"}</td>
                            </tr>

                            <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700 justify-between grid  grid-cols-1 lg:grid-cols-2">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">VALOR DEL DÓLAR AL COMPRARLO</th>
                                <td className="px-6 py-4 text-left">${valor_dolar_compra}</td>
                            </tr>


                            <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700 justify-between grid  grid-cols-1 lg:grid-cols-2">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">PRECIO DE LA COMPRA EN DÓLARES</th>
                                <td className="px-6 py-4 text-left">{precio_compra_dolar ? "$" + precio_compra_dolar : "-"}</td>
                            </tr>


                            <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700 justify-between grid  grid-cols-1 lg:grid-cols-2">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">PRECIO DE LA COMPRA EN PESOS</th>
                                <td className="px-6 py-4 text-left">{precio_compra_peso ? "$" + precio_compra_peso : "-"}</td>
                            </tr>

                            <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700 justify-between grid  grid-cols-1 lg:grid-cols-2">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">DISPONIBLES</th>
                                <td className="px-6 py-4 text-left">{disponibles > 0 ? disponibles : "SIN STOCK"}</td>
                            </tr>


                            <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700 justify-between grid  grid-cols-1 lg:grid-cols-2">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">FECHA DE LA ULTIMA COMPRA</th>
                                <td className="px-6 py-4 uppercase">{fecha ? fecha : "-"}</td>
                            </tr>


                            <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700 break-words justify-between grid  grid-cols-1 lg:grid-cols-2">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">NOTAS</th>
                                <td className="px-6 py-4">{notas ? notas : "-"}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <button
                    type="button"
                    className="bg-red-600 hover:bg-red-900  sm:w-1/4 text-white p-4 uppercase font-bold my-4 mx-auto block rounded-md"
                    onClick={eliminarElProducto}
                >Eliminar Producto
                </button>
            </div>
        </>


    )
};

export default VerProducto;
