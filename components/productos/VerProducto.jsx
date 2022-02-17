import { generarFecha } from '../../helpers';

const VerProducto = ({producto}) => {

    const {nombre, codigo, rubro, marca, precio_venta, precio_compra_dolar, precio_compra_peso, fecha_compra, proveedor, disponibles, rentabilidad, modelo, notas} = producto

    const fecha = generarFecha(fecha_compra) //formateo la fecha ya que me llega y-m-d

  return (
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
                    <span className="text-blue-900 uppercase font-bold">Código: </span>{marca}
                </p>
            )}
            {modelo && (
                <p className="text-2xl text-gray-600 dark:text-gray-50 mt-6">
                    <span className="text-blue-900 uppercase font-bold">Código: </span>{modelo}
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
            {precio_compra_dolar && (
                <p className="text-2xl text-gray-600 dark:text-gray-50 mt-6">
                    <span className="text-blue-900 uppercase font-bold">Precio comprado en dolares: </span>{precio_compra_dolar}
                </p>
            )}
            {precio_compra_peso && (
                <p className="text-2xl text-gray-600 dark:text-gray-50 mt-6">
                    <span className="text-blue-900 uppercase font-bold">Precio comprado en AR$: </span>{precio_compra_peso}
                </p>
            )}
            {precio_venta && (
                <p className="text-2xl text-gray-600 dark:text-gray-50 mt-6">
                    <span className="text-blue-900 uppercase font-bold">Precio de venta: </span>{precio_venta}
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
            {rentabilidad && (
                <p className="text-2xl text-gray-600 dark:text-gray-50 mt-6">
                    <span className="text-blue-900 uppercase font-bold">Rentabilidad: </span>{rentabilidad}
                </p>
            )}
            
            {notas && (
                <p className="text-2xl italic text-gray-600 dark:text-gray-50 mt-6 break-words">   {/*break-words para que la palabra larga siga abajo y no desborde el div */}
                    <span className="text-blue-900 not-italic uppercase font-bold">Notas: </span>{notas}
                </p>
            )}
          </div>
    </div>
  )
};

export default VerProducto;
