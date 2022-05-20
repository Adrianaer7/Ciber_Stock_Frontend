import Link from "next/link";
import { useContext } from "react";
import compraContext from "../../../context/historial/compras/compraContext";
import authContext from "../../../context/auth/authContext";
import Swal from "sweetalert2";

const Compra = ({producto}) => {
    const {nombre, marca, codigo, disponibles, modelo, cantidad, idProducto, faltante, proveedor, fecha_compra} = producto

    const AuthContext = useContext(authContext)
    const {modo} = AuthContext
    

    return (
        <tr className="border-b dark:border-none hover:bg-gray-50 dark:hover:bg-gray-700">
            <td className="p-3 dark:text-gray-50 text-center font-semibold">{nombre}</td>
            <td className="p-3 dark:text-gray-50 text-center">{marca}</td>
            <td className="p-3 dark:text-gray-50 text-center">{modelo}</td>
            <td className="p-3 dark:text-gray-50 text-center">
              <ul>{cantidad.map((unidades, i) => <li key={i} className="mb-2">{unidades}</li>)}</ul>
            </td>
            <td className="p-3 dark:text-gray-50 text-center">
              <ul className="">{fecha_compra.map((fecha, i) => {return <li key={i} className="mb-2">{fecha}</li>})}</ul>
            </td>
            <td className="p-3 dark:text-gray-50 text-center">{proveedor}</td>


        </tr>
    );
};

export default Compra;
