import { useContext } from "react";
import { generarFecha } from '../../helpers';
import {useRouter} from "next/router"
import productoContext from "../../context/productos/productoContext";
import Swal from "sweetalert2";

const VerProducto = ({producto}) => {
    const router = useRouter()

    const productosContext = useContext(productoContext)
    const {eliminarProducto} = productosContext

    const {_id, nombre, codigo, rubro, marca, precio_venta, precio_venta_tarjeta, precio_venta_efectivo, precio_venta_conocidos, precio_compra_dolar, precio_compra_peso, valor_dolar_compra, fecha_compra, proveedor, disponibles, rentabilidad, modelo, notas} = producto

    const fecha = generarFecha(fecha_compra) //formateo la fecha ya que me llega y-m-d

    const eliminarElProducto = () => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Este cambio no se puede revertir!",
            icon: 'warning',
            html:'No se puede revertir esto',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText:'<b>Si, eliminar!</b>',
            confirmButtonColor: '#d33',
            cancelButtonText:'<p>Cancelar</p>',
          }).then((result) => {
            if (result.isConfirmed) {
              eliminarProducto(_id)
              router.push("/productos")
            }
          })
    }

  return (
      <>
        <div className='min-h-screen dark:bg-gray-800 bg-slate-100'>
            <div className="bg-white dark:bg-gray-900 w-auto rounded-md  shadow-md p-5 mt-2 mx-auto">
                <h1 className="font-black text-4xl dark:text-blue-300 text-blue-900 text-center">{nombre}</h1>

                {codigo && (
                    <p className="text-2xl text-gray-600 dark:text-gray-50 mt-6">
                        <span className="text-blue-900  uppercase font-bold">Código: </span>{codigo}
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
                {precio_venta_tarjeta > 0 && (
                    <p className="text-3xl text-red-600 font-black dark:text-gray-50 mt-6">
                        <span className="text-blue-900 text-2xl uppercase font-black">Precio de venta tarjeta: </span>${precio_venta_tarjeta}
                    </p>
                )}
                {precio_venta_efectivo > 0 && (
                    <p className="text-2xl text-red-600 font-bold dark:text-gray-50 mt-6">
                        <span className="text-blue-900 text-2xl uppercase font-bold">Precio de venta efectivo: </span>${precio_venta_efectivo}
                    </p>
                )}
                {precio_venta_conocidos > 0 && (
                    <p className="text-xl text-red-600 font-bold dark:text-gray-50 mt-6">
                        <span className="text-blue-900 text-2xl uppercase font-bold">Precio de venta conocidos: </span>${precio_venta_conocidos}
                    </p>
                )}
                
                {fecha_compra && (
                    <p className="text-2xl text-gray-600 uppercase dark:text-gray-50 mt-6">
                        <span className="text-blue-900 uppercase font-bold">Fecha última compra: </span>{fecha}
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
                <button
                    type="button"
                    className="bg-red-600 hover:bg-red-900  w-1/4 text-white p-4 uppercase font-bold my-4 mx-auto block rounded-md"
                    onClick={eliminarElProducto}
                >Eliminar Producto</button>
        </div>
        
    </>
    
    
  )
};

export default VerProducto;
