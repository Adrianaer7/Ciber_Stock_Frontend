import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import productoContext from "../../context/productos/productoContext";
import faltanteContext from "../../context/faltantes/faltantesContext";
import Swal from "sweetalert2";

const Producto = ({producto}) => {
    const [colorFaltante, setColorFaltante] = useState(null)
    const {nombre, marca, codigo, precio_venta_conocidos, precio_venta_efectivo, precio_venta_tarjeta, disponibles, modelo, _id, faltante} = producto
    
    const conocidos = (nombre + " " + marca + " " + modelo + " " + "$" + Math.round(precio_venta_conocidos)).trim().replace(/\s\s+/g, ' ')   //datos que se copian al hacer click en el precio. El trim elimina los espacios en blanco al principio y al final, y el replace quita 2 o mas espacio entre palabra y palabra
    const efectivo = (nombre + " " + marca + " " + modelo + " " + "$" + Math.round(precio_venta_efectivo)).trim().replace(/\s\s+/g, ' ')
    const tarjeta = (nombre + " " + marca + " " + modelo + " " + "$" + Math.round(precio_venta_tarjeta)).trim().replace(/\s\s+/g, ' ')

    const productosContext = useContext(productoContext)
    const {productoActual, venderProducto} = productosContext

    const faltantesContext = useContext(faltanteContext)
    const {agregarFaltante, eliminarFaltante} = faltantesContext

    const Copiado = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      const venderElProducto = async () => {
        const valor = await Swal.fire({
            title: 'Unidades a vender',
            html:
              '<input id="swal-input" type="number" value="1" class="swal2-input">',
            focusConfirm: true,
            preConfirm: () => {
              return [
                document.getElementById('swal-input').value
              ]
            },
            showCloseButton: true,

          })
          if(valor.isConfirmed) {
              const unidades = valor.value[0]
            
          } else {
              console.log("nop")
          }
      }
      

    const añadirFaltante = () => {
        Copiado.fire({
            icon: 'success',
            title: 'Agregado a faltante'
          })
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
            Copiado.fire({
                icon: 'error',
                title: 'Quitado de faltantes'
              })
        }
    }, [colorFaltante])

    const copiarPrecioTarjeta = () => {
        navigator.clipboard.writeText(`${tarjeta}`)
          Copiado.fire({
            icon: 'success',
            title: 'Copiado'
          })
    }
    const copiarPrecioEfectivo = () => {
        navigator.clipboard.writeText(`${efectivo}`)
          Copiado.fire({
            icon: 'success',
            title: 'Copiado'
          })
    }
    const copiarPrecioConocidoss = () => {
        navigator.clipboard.writeText(`${conocidos}`)
          Copiado.fire({
            icon: 'success',
            title: 'Copiado'
          })
    }

    return (
        <tr className="border-b dark:border-none hover:bg-gray-50 dark:hover:bg-gray-700">
            <td className="p-3 dark:text-gray-50 text-center font-semibold">{codigo}</td>
            <td className="dark:text-gray-50 p-3">{nombre}</td>
            <td className="p-3 dark:text-gray-50 text-center">{marca}</td>
            <td className="p-3 dark:text-gray-50 text-center">{modelo}</td>
            <td className="dark:text-gray-50 text-center uppercase">{!disponibles ? <span className="bg-red-600 font-black text-white p-1  rounded-sm">Sin stock</span> : disponibles && !faltante && colorFaltante === null || disponibles && colorFaltante === false ? disponibles : disponibles && faltante || disponibles && colorFaltante || disponibles && faltante && colorFaltante === false ? <span className="text-red-600 font-bold">{disponibles}</span> : null}</td>
            <td className="p-2 dark:text-gray-50 text-center  text-lg hover:cursor-pointer ">
                <div className="flex flex-col">
                    <p className="mb-4 pb-2 pt-2 px-2 hover:rounded-md hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 text-3xl font-black " onClick={copiarPrecioTarjeta}>${precio_venta_tarjeta}</p>
                    <p className="pb-2 pt-2 hover:rounded-md hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 text-2xl font-medium" onClick={copiarPrecioEfectivo}>${precio_venta_efectivo}</p>
                    <p className="mt-4 pb-2 pt-2 hover:rounded-md hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 text-xl" onClick={copiarPrecioConocidoss}>${precio_venta_conocidos}</p>
                </div>
            </td>

            <td className="p-3 w-40 mt-2  ">
                <Link href="">
                    <button
                        type="button"
                        className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 mb-2 w-full text-black p-2 uppercase font-bold text-xs mr-3 rounded-md"
                        onClick={venderElProducto}
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
                        onClick={() => añadirFaltante()}
                    >{!faltante && colorFaltante === null || !faltante && colorFaltante === false || faltante && colorFaltante === false ? "Agregar faltante" : "Quitar faltante"}</button>
                </Link>
                
            </td>
        </tr>
    );
};

export default Producto;
