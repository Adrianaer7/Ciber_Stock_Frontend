import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import productoContext from "../../context/productos/productoContext";
import faltanteContext from "../../context/faltantes/faltantesContext";


const Producto = ({producto}) => {
    const [colorFaltante, setColorFaltante] = useState(null)
    const {nombre, marca, codigo, precio_venta_recomendado, disponibles, modelo, _id, faltante} = producto
    if(isNaN(precio_venta_recomendado)) {
        precio_venta_recomendado = 0
    }
    const resumen = nombre + " " + marca + " " + modelo + " " + "$" + Math.round(precio_venta_recomendado)   //datos que se copian al hacer click en el precio

    const productosContext = useContext(productoContext)
    const {productoActual, venderProducto} = productosContext

    const faltantesContext = useContext(faltanteContext)
    const {agregarFaltante, eliminarFaltante} = faltantesContext


    const añadirFaltante = () => {
        if(!colorFaltante) {
            setColorFaltante(true)
        }
    }
    const quitarFaltante = () => {
        if(colorFaltante) {
            setColorFaltante(false)
        }
    }

    useEffect(() => {
        if(colorFaltante) {
            agregarFaltante(producto)
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
            <td className="p-3 dark:text-gray-50 text-center uppercase">{!disponibles ? <span className="bg-red-500 p-1 rounded-sm">Sin stock</span> : faltante ? <span className="text-red-600">{disponibles}</span>: disponibles && !colorFaltante || !faltante ? disponibles : null}</td>
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
                        onClick={colorFaltante === false || colorFaltante === null ? () => añadirFaltante() : colorFaltante ? () => quitarFaltante() : null}
                    >{faltante ? "Quitar faltante" : "Agregar faltante"}</button>
                </Link>
                
            </td>
        </tr>
    );
};

export default Producto;
