import Link from "next/link";
import { useContext } from "react";
import productoContext from "../../context/productos/productoContext";

const Producto = ({producto}) => {
    const {nombre, marca, codigo, precio_venta, disponibles, modelo, _id} = producto


    const productosContext = useContext(productoContext)
    const {productoActual, eliminarProducto, venderProducto} = productosContext

    return (
        <tr className="border-b dark:border-none hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="p-3 dark:text-gray-50 text-center">{codigo}</td>
                <td className=" dark:text-gray-50 p-3 w-1 ">{nombre}</td>
                <td className="p-3  dark:text-gray-50 text-center">{marca}</td>
                <td className="p-3  dark:text-gray-50 text-center">{modelo}</td>
                <td className="p-3 dark:text-gray-50 text-center">{disponibles}</td>
                <td className="p-3 dark:text-gray-50 text-center font-bold">${precio_venta}</td>

                <td className="p-3 w-40 mt-2 ">
                    <Link href="">
                        <button
                            type="button"
                            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 mb-2 w-full text-black p-2 uppercase font-bold text-xs mr-3 rounded-md"
                            onClick={() => venderProducto(producto)}
                        >Vender</button>
                    </Link>
                    <Link href={`/producto/${_id}`}>
                        <button
                            type="button"
                            className="bg-blue-600 hover:bg-blue-900 mb-2 w-full text-white p-2 uppercase font-bold text-xs mr-3 rounded-md"
                            onClick={() => productoActual(producto)}
                        >Detalles</button>
                    </Link>
                    <Link href={`/producto/editar/${_id}`}>
                        <button
                            type="button"
                            className="bg-green-600 hover:bg-green-900 mb-2 w-full text-white p-2 uppercase font-bold text-xs mr-3 rounded-md"
                            onClick={() => productoActual(producto)}
                        >Editar</button>
                    </Link>
                    <Link href="">
                        <button
                            type="button"
                            className="bg-red-600 hover:bg-red-900  w-full text-white p-2 uppercase font-bold text-xs mr-3 rounded-md"
                            onClick={() => eliminarProducto(_id)}
                        >Eliminar</button>
                    </Link>
                </td>
        </tr>
    );
};

export default Producto;
