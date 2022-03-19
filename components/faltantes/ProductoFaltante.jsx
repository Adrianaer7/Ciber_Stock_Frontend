import Link from "next/link";
import { useContext } from "react";
import productoContext from "../../context/productos/productoContext";
import faltanteContext from "../../context/faltantes/faltantesContext";


const ProductoFaltante = ({producto}) => {
    const {nombre, marca, codigo, disponibles, modelo, _id, faltante} = producto
   
    const productosContext = useContext(productoContext)
    const {productoActual, venderProducto} = productosContext

    const faltantesContext = useContext(faltanteContext)
    const {traerFaltante, eliminarFaltante} = faltantesContext

    return (
        <tr className="border-b dark:border-none hover:bg-gray-50 dark:hover:bg-gray-700">
            <td className="p-3 dark:text-gray-50 text-center">{codigo}</td>
            <td className="dark:text-gray-50 p-3 w-1">{nombre}</td>
            <td className="p-3 dark:text-gray-50 text-center">{marca}</td>
            <td className="p-3 dark:text-gray-50 text-center">{modelo}</td>
            {/*<td className="p-3 dark:text-gray-50 text-center">{disponibles ? disponibles : <span className="font-bold text-white bg-red-600 p-1 uppercase">Sin stock</span>}</td>*/}
            <td className="p-3 dark:text-gray-50 text-center uppercase">{disponibles && faltante ? <span className="font-bold text-red-600 p-1">{disponibles}</span> : disponibles && !faltante ? disponibles : <span className="font-bold text-white bg-red-600 p-1 uppercase">Sin stock</span>}</td>
            <td className="p-3 w-40 mt-2  ">
                
                <Link href="">
                    <button
                        type="button"
                        className="bg-red-600 hover:bg-red-900 mb-2 w-full text-white p-2 uppercase font-bold text-xs mr-3 rounded-md"
                        onClick={() => eliminarFaltante(_id)}
                    >Quitar de faltantes</button>
                </Link>
                
            </td>
        </tr>
    );
};

export default ProductoFaltante;
