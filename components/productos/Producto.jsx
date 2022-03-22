import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import productoContext from "../../context/productos/productoContext";
import faltanteContext from "../../context/faltantes/faltantesContext";


const Producto = ({producto}) => {
    const [colorFaltante, setColorFaltante] = useState(null)
    const {nombre, marca, codigo, precio_venta_recomendado, disponibles, modelo, _id, faltante} = producto
    
    const resumen = nombre + " " + marca + " " + modelo + " " + "$" + Math.round(precio_venta_recomendado)   //datos que se copian al hacer click en el precio

    const productosContext = useContext(productoContext)
    const {productoActual, venderProducto} = productosContext

    const faltantesContext = useContext(faltanteContext)
    const {agregarFaltante, eliminarFaltante} = faltantesContext


    const añadirFaltante = () => {
        setColorFaltante(!colorFaltante)
        if(colorFaltante === null && faltante) {
            setColorFaltante(false)
        }
    }
    useEffect(() => {
        if(colorFaltante) {
            agregarFaltante(_id)
        }
        
        if(colorFaltante === false) {
            eliminarFaltante(_id)
        }
    }, [colorFaltante])



    return (
        <tr className="border-b dark:border-none hover:bg-gray-50 dark:hover:bg-gray-700">
            <td className="p-3 dark:text-gray-50 text-center">{codigo}</td>
            <td className="dark:text-gray-50 p-3 w-1">{nombre}</td>
            <td className="p-3 dark:text-gray-50 text-center">{marca}</td>
            <td className="p-3 dark:text-gray-50 text-center">{modelo}</td>
            <td className="p-3 dark:text-gray-50 text-center uppercase">{disponibles && faltante && colorFaltante ? <span className="font-bold text-red-600 p-1">{disponibles}</span> : disponibles && colorFaltante ? <span className="font-bold text-red-600 p-1">{disponibles}</span> : faltante && colorFaltante === null ? <span className="font-bold text-red-600 p-1">{disponibles}</span>  : disponibles ? disponibles : <span className="font-bold text-white bg-red-600 p-1 uppercase">Sin stock</span>}</td>
            <td className="p-3 dark:text-gray-50 text-center font-bold text-lg hover:cursor-pointer" onClick={() => navigator.clipboard.writeText(`${resumen}`)}>${precio_venta_recomendado}</td>

            <td className="p-3 w-40 mt-2  ">
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
                        className="bg-red-600 hover:bg-red-900 mb-2 w-full text-white p-2 uppercase font-bold text-xs mr-3 rounded-md"
                        onClick={() => añadirFaltante()}
                    >{!faltante && colorFaltante === null || !faltante && colorFaltante === false || faltante && colorFaltante === false ? "Agregar faltante" : "Quitar faltante"}</button>
                </Link>
                
            </td>
        </tr>
    );
};

export default Producto;
