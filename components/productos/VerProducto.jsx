import Link from "next/link";
import { useContext } from "react";
import { generarFecha } from '../../helpers';
import productoContext from "../../context/productos/productoContext";

const VerProducto = ({producto}) => {
    const productosContext = useContext(productoContext)
    const {eliminarProducto} = productosContext

    const {_id, nombre, codigo, rubro, marca, precio_venta, precio_venta_recomendado, precio_compra_dolar, precio_compra_peso, valor_dolar_compra, fecha_compra, proveedor, disponibles, rentabilidad, modelo, notas} = producto

    const fecha = generarFecha(fecha_compra) //formateo la fecha ya que me llega y-m-d

  return (
      <>
        <div className='min-h-screen dark:bg-gray-800 bg-slate-100'>
            <div className="bg-white dark:bg-gray-900 w-auto rounded-md  shadow-md p-5 mt-2 mx-auto">
                <h1 className="font-black text-4xl dark:text-blue-300 text-blue-900 text-center">{nombre}</h1>

                {codigo && (
                    <p className="text-2xl text-gray-600 dark:text-gray-50 mt-6">
                        <span className="text-blue-900 uppercase font-bold">Código: </span>{codigo}
                    </p>
                )}
                {marca && (
                    <p className="text-2xl text-gray-600 dark:text-gray-50 mt-6">
                        <span className="text-blue-900 uppercase font-bold">Marca: </span>{marca}
                    </p>
                )}
                {modelo && (
                    <p className="text-2xl text-gray-600 dark:text-gray-50 mt-6">
                        <span className="text-blue-900 uppercase font-bold">Modelo: </span>{modelo}
                    </p>
                )}
                {rubro && (
                    <p className="text-2xl text-gray-600 dark:text-gray-50 mt-6">
                        <span className="text-blue-900 uppercase font-bold">Rubro: </span>{rubro}
                    </p>
                )}
                {proveedor && (
                    <p className="text-2xl text-gray-600 dark:text-gray-50 mt-6">
                        <span className="text-blue-900 uppercase font-bold">Proveedor: </span>{proveedor}
                    </p>
                )}
                {valor_dolar_compra && (
                    <p className="text-2xl text-gray-600 dark:text-gray-50 mt-6">
                        <span className="text-blue-900 uppercase font-bold">Valor del dolar cuando se compró: </span>${valor_dolar_compra}
                    </p>
                )}
                {precio_compra_dolar && (
                    <p className="text-2xl text-gray-600 dark:text-gray-50 mt-6">
                        <span className="text-blue-900 uppercase font-bold">Precio comprado en USD: </span>${precio_compra_dolar}
                    </p>
                )}
                {precio_compra_peso && (
                    <p className="text-2xl text-gray-600 dark:text-gray-50 mt-6">
                        <span className="text-blue-900 uppercase font-bold">Precio comprado en AR$: </span>${precio_compra_peso}
                    </p>
                )}
                {precio_venta && (
                    <p className="text-2xl text-gray-600 dark:text-gray-50 mt-6">
                        <span className="text-blue-900 uppercase font-bold">Precio de venta: </span>${precio_venta}
                    </p>
                )}
                {precio_venta_recomendado && (
                    <p className="text-3xl text-red-600 font-bold dark:text-gray-50 mt-6">
                        <span className="text-blue-900 text-2xl uppercase font-bold">Precio de venta recomendado: </span>${precio_venta_recomendado}
                    </p>
                )}
                {fecha_compra && (
                    <p className="text-2xl text-gray-600 uppercase dark:text-gray-50 mt-6">
                        <span className="text-blue-900 uppercase font-bold">Fecha compra: </span>{fecha}
                    </p>
                )}
                
                {disponibles && (
                    <p className="text-2xl text-gray-600 dark:text-gray-50 mt-6">
                        <span className="text-blue-900 uppercase font-bold">Disponibles: </span>{disponibles}
                    </p>
                )}
                {rentabilidad > 0 && (
                    <p className="text-2xl text-gray-600 dark:text-gray-50 mt-6">
                        <span className="text-blue-900 uppercase font-bold">rentabilidad: </span>{rentabilidad}%
                    </p>
                )}
                
                {notas && (
                    <p className="text-2xl italic text-gray-600 dark:text-gray-50 mt-6 break-words">   {/*break-words para que la palabra larga siga abajo y no desborde el div */}
                        <span className="text-blue-900 not-italic uppercase font-bold">Notas: </span>{notas}
                    </p>
                )}
            </div>
            <Link href="/">
                <button
                    type="button"
                    className="bg-red-600 hover:bg-red-900  w-1/4 text-white p-4 uppercase font-bold my-4 mx-auto block rounded-md"
                    onClick={() => eliminarProducto(_id)}
                >Eliminar Producto</button>
            </Link>
        </div>
        
    </>
    
    
  )
};

export default VerProducto;
