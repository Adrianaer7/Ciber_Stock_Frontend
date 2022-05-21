import Link from "next/link";
import { useState } from "react";
import compraContext from "../../../context/historial/compras/compraContext";

const Compra = ({producto}) => {
    const {nombre, marca, modelo, cantidad, proveedor, fecha_compra, valor_dolar_compra, precio_compra_dolar} = producto

    const [detalles, setDetalles] = useState(false)


    

    return (

        <tr 
          className={`${!detalles && "font-bold" } border-b  hover:bg-gray-50 hover:cursor-pointer active:bg-gray-100 dark:active:bg-gray-800 dark:border-none dark:hover:bg-gray-700`}
          onClick={() => setDetalles(!detalles)}
        >

            <td className="p-3 dark:text-gray-50 text-center font-semibold">{nombre}</td>
            <td className="p-3 dark:text-gray-50 text-center">{!marca ? "-" : marca}</td>
            <td className="p-3 dark:text-gray-50 text-center">{!modelo ? "-" : modelo}</td>
            <td className="p-3 dark:text-gray-50 text-center">{detalles ? <ul>{cantidad.map((numero, i) => <li key={i} className="mb-2">{numero ? numero : "-"}</li>)}</ul> : <ul><li  className="mb-2">{cantidad[0] ? cantidad[0] : "-"}</li></ul>}
              
            </td>
            <td className="p-3 dark:text-gray-50 text-center">{detalles ? <ul>{fecha_compra.map((fecha, i) => <li key={i} className="mb-2">{fecha ? fecha : "-"}</li>)}</ul> : <ul><li  className="mb-2">{fecha_compra[0] ? fecha_compra[0] : "-"}</li></ul>}
            </td>
            <td className="p-3 dark:text-gray-50 text-center">{detalles ? <ul>{proveedor.map((proveedor, i) => <li key={i} className="mb-2">{proveedor ? proveedor : "-"}</li>)}</ul> : <ul><li  className="mb-2">{proveedor[0] ? proveedor[0] : "-"}</li></ul>}
            </td>
            <td className="p-3 dark:text-gray-50 text-center">{detalles ? <ul>{valor_dolar_compra.map((valor, i) => <li key={i} className="mb-2">{valor ? valor : "-"}</li>)}</ul> : <ul><li  className="mb-2">{valor_dolar_compra[0] ? valor_dolar_compra[0] : "-"}</li></ul>}
            </td>
            <td className="p-3 dark:text-gray-50 text-center">{detalles ? <ul>{precio_compra_dolar.map((precio, i) => <li key={i} className="mb-2">{precio ? precio : "-"}</li>)}</ul> : <ul><li  className="mb-2">{precio_compra_dolar[0] ? precio_compra_dolar[0] : "-"}</li></ul>}
            </td>
        </tr>
    );
};

export default Compra;
