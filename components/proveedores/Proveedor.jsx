import Link from "next/link"
import Image from "next/image"
import { useContext } from "react"
import productoContext from "../../context/productos/productoContext"
const Proveedor = ({proveedor}) => {

    const productosContext = useContext(productoContext)
    const {eliminarProveedor} = productosContext

  const {id_, nombre, empresa, telPersonal, telEmpresa} = proveedor

    const eliminarElProveedor = async () => {
        await eliminarProveedor(_id)
    }

  return (
    <tr className="border-b dark:border-b-gray-800 dark:last:border-none  hover:bg-gray-50 hover:cursor-pointer active:bg-gray-100 dark:active:bg-gray-800 dark:hover:bg-gray-700">
            <td className="p-3 dark:text-gray-50 text-center ">{nombre}</td>
            <td className="dark:text-gray-50 p-3 text-center">{empresa}</td>
            <td className="p-3 dark:text-gray-50 text-center">{telPersonal}</td>
            <td className="p-3 dark:text-gray-50 text-center">{telEmpresa}</td>

            <td className="p-3 w-40 mt-2  ">
                <div className="flex">

                    <Link passHref href="">
                        <button
                            type="button"
                            className="bg-green-600 hover:bg-red-900 mb-2 w-full text-white p-2 uppercase font-bold text-xs mr-3 rounded-md"
                            onClick={eliminarElProveedor}
                        >X</button>
                    </Link>
                    <Link passHref href="">
                        <button
                            type="button"
                            className="bg-red-600 hover:bg-red-900 mb-2 w-full text-white p-2 uppercase font-bold text-xs mr-3 rounded-md"
                            onClick={eliminarElProveedor}
                        >X</button>
                    </Link>
                </div>
                
            </td>
        </tr>
  )
}

export default Proveedor