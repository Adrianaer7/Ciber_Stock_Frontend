import { useContext } from "react";
import { generarFecha } from '../../helpers';
import {useRouter} from "next/router"
import productoContext from "../../context/productos/productoContext";
import authContext from "../../context/auth/authContext";
import Swal from "sweetalert2";


const VerProducto = ({producto}) => {
    const router = useRouter()
    const productosContext = useContext(productoContext)
    const {eliminarProducto} = productosContext

    const AuthContext = useContext(authContext)
    const {modo} = AuthContext

    const {_id, nombre, codigo, rubro, marca, precio_venta_tarjeta, precio_venta_efectivo, precio_venta_conocidos, precio_compra_dolar, precio_compra_peso, valor_dolar_compra, fecha_compra, proveedor, disponibles, rentabilidad, modelo, notas} = producto

    const fecha = generarFecha(fecha_compra) //formateo la fecha ya que me llega y-m-d
    const Eliminado = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
        
    })
    const eliminarElProducto = () => {
        Swal.fire({
            title: `${modo ? '<h5 style="color:white">¿Estás seguro?</h5>' : '<h5 style="color:#545454">¿Estás seguro?</h5>'}`,
            text:"¡No se puede revertir esto!",
            icon: 'warning',
            color: `${modo ? "white" : "#545454"}`,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText:'<b>Si, eliminar!</b>',
            confirmButtonColor: '#d33',
            cancelButtonText:'<p>Cancelar</p>',
            background: `${modo ? "rgb(31 41 55)" : "white"}`,
            }).then((result) => {
            if (result.isConfirmed) {
                eliminarProducto(_id)
                router.push("/productos")
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
        <div className='lg:w-2/3 mx-auto dark:bg-gray-800 bg-slate-100 flex flex-col gap-4'>
            <h1 className="font-black text-4xl dark:text-blue-300 text-blue-900 text-left sm:text-center">{nombre}</h1>
            <div className=" overflow-x-auto shadow-md sm:rounded-lg">
                <table className=" sm:table-fixed w-full  text-lg text-left text-gray-500 dark:text-gray-400">
                    <tbody>
                        <tr className="dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">NOMBRE</th>
                            <td className="px-6 py-4 ">{nombre}</td>
                        </tr>
                        
                        <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">MARCA</th>
                            <td className="px-6 py-4">{marca ? marca: "-"}</td>
                        </tr>
                    
                    
                        <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">MODELO</th>
                            <td className="px-6 py-4">{modelo ? modelo : "-"}</td>
                        </tr>
                    
                        <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">CÓDIGO</th>
                            <td className="px-6 py-4">{codigo}</td>
                        </tr>
                        
                        <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap ">PRECIO DE VENTA CON TARJETA</th>
                            <td className="px-6 py-4">{precio_venta_tarjeta ? "$" + precio_venta_tarjeta : "-"}</td>
                        </tr>
                    
                    
                        <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">PRECIO DE VENTA EN EFECTIVO</th>
                            <td className="px-6 py-4">{precio_venta_efectivo ? "$" + precio_venta_efectivo : "-"}</td>
                        </tr>
                    
                    
                        <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">PRECIO DE VENTA CONOCIDOS</th>
                            <td className="px-6 py-4">{precio_venta_conocidos ? "$" + precio_venta_tarjeta : "-"}</td>
                        </tr>
                    
                    
                        <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">RUBRO</th>
                            <td className="px-6 py-4">{rubro ? rubro : "-"}</td>
                        </tr>
                    
                    
                        <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">PROVEEDOR</th>
                            <td className="px-6 py-4">{proveedor ? proveedor : "-"}</td>
                        </tr>
                    
                        <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">VALOR DEL DÓLAR AL COMPRARLO</th>
                            <td className="px-6 py-4">${valor_dolar_compra}</td>
                        </tr>
                    
                        
                        <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">PRECIO DE LA COMPRA EN DÓLARES</th>
                            <td className="px-6 py-4">{precio_compra_dolar ? "$" + precio_compra_dolar : "-"}</td>
                        </tr>
                    
                    
                        <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">PRECIO DE LA COMPRA EN PESOS</th>
                            <td className="px-6 py-4">{precio_compra_peso ? "$" + precio_compra_peso : "-"}</td>
                        </tr>
                    
                        
                        <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">FECHA DE LA ULTIMA COMPRA</th>
                            <td className="px-6 py-4">{fecha}</td>
                        </tr>
                    
                       
                       
                        <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">RENTABILIDAD</th>
                            <td className="px-6 py-4">{rentabilidad ? rentabilidad + "%" : "-"}</td>
                        </tr>
                    
                    
                        <tr className=" dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700 break-words">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">NOTAS</th>
                            <td className="px-6 py-4">{notas ? notas : "-"}</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
            <button
                type="button"
                className="bg-red-600 hover:bg-red-900  w-1/4 text-white p-4 uppercase font-bold my-4 mx-auto block rounded-md"
                onClick={eliminarElProducto}
            >Eliminar Producto
            </button>
        </div>      
    </>
    
    
  )
};

export default VerProducto;
