import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import productoContext from "../../context/productos/productoContext";
import faltanteContext from "../../context/faltantes/faltantesContext";
import authContext from "../../context/auth/authContext";

import Swal from "sweetalert2";

const ProductoFaltante = ({producto, proveedores}) => {
    const {nombre, marca, codigo, disponibles, modelo, rubro, _id, faltante, proveedor, todos_proveedores} = producto

    const AuthContext = useContext(authContext)
    const {modo} = AuthContext
    
    const productosContext = useContext(productoContext)
    const {productoActual} = productosContext

    const faltantesContext = useContext(faltanteContext)
    const {eliminarFaltante} = faltantesContext

    const proveedoresIguales = proveedores.filter(prov => todos_proveedores.includes(prov._id))

    const Eliminado = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
    })

    const eliminarElFaltante = async () => {
        await eliminarFaltante(_id)
        Eliminado.fire({
            icon: 'error',
            title: 'Quitado de faltantes',
            color: `${modo ? "white" : "#545454"}`,
            background: `${modo ? "#505050"  : "white"}`,
          })
    }

    return (
        <tr className="border-b dark:border-b-gray-800 dark:last:border-none  hover:bg-gray-50 hover:cursor-pointer active:bg-gray-100 dark:active:bg-gray-800 dark:hover:bg-gray-700">
            <td className="p-1 dark:text-gray-50 text-center font-semibold break-words">{codigo}</td>
            <td className="p-1 dark:text-gray-50 text-center break-words">{nombre ? nombre : "-"}</td>
            <td className="p-1 dark:text-gray-50 text-center break-words">{marca ? marca : "-"}</td>
            <td className="p-1 dark:text-gray-50 text-center break-words">{modelo ? modelo : "-"}</td>
            <td className="p-1 dark:text-gray-50 text-center break-words">{rubro ? rubro : "-"}</td>
            <td className="p-1 dark:text-gray-50 text-center break-words">{proveedoresIguales.length > 0 ? proveedoresIguales.map((prov, i) => <p key={i}>{`${prov.empresa} (${prov.nombre})`}</p>): "-"}</td>

            <td className="p-1 dark:text-gray-50 text-center uppercase">{disponibles && faltante ? <span className="font-bold text-red-600 p-1">{disponibles}</span> : disponibles && !faltante ? disponibles : <span className="font-black text-white bg-red-600 p-1 uppercase rounded-sm">Sin stock</span>}</td>
            <td className="p-1 w-40 mt-2 break-words ">
                <div className="flex justify-evenly">
                    <div className="hover:bg-gray-200 dark:hover:bg-gray-600 p-1 pb-0 items-center rounded-md hover:cursor-pointer">
                        <Link passHref href={`/producto/${_id}`}>
                            <Image 
                                src={`${modo ? "/detalle_light.svg" : "/detalle_dark.svg"}`}
                                alt="Detalles"
                                width={30} 
                                height={30}
                                priority={true}
                                className="cursor-pointer"
                                onClick={() => productoActual(producto)}
                                />
                        </Link>
                    </div>
                    <div className="hover:bg-gray-200 dark:hover:bg-gray-600 p-1 pb-0 items-center rounded-md hover:cursor-pointer">
                        <Image 
                            src={`${modo ? "/delete_light.svg" : "/delete_dark.svg"}`}
                            alt="Eliminar"
                            width={30} 
                            height={30}
                            priority={true}
                            className="cursor-pointer"
                            onClick={eliminarElFaltante}
                        />
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default ProductoFaltante;
