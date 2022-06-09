import Link from "next/link";
import { useState } from "react";
import compraContext from "../../../context/historial/compras/compraContext";
import { generarFecha } from "../../../helpers";
const Compra = ({producto}) => {
    const {nombre, marca, modelo, historial} = producto
    const [detalles, setDetalles] = useState(false)


    

    return (

        <tr 
          className={`${!detalles && "font-semibold" } border-b dark:border-b-gray-800 dark:last:border-none  hover:bg-gray-50 hover:cursor-pointer active:bg-gray-100 dark:active:bg-gray-800 dark:hover:bg-gray-700`}
          onClick={() => setDetalles(!detalles)}
        >

            <td className="p-3 dark:text-gray-50 text-center">{nombre}</td>
            <td className="p-3 dark:text-gray-50 text-center">{!marca ? "-" : marca}</td>
            <td className="p-3 dark:text-gray-50 text-center">{!modelo ? "-" : modelo}</td>
            <td className="p-3 dark:text-gray-50 text-center"><ul>{detalles ? historial.map((historia, i) => <li key={i}>{historia.cantidad ? historia.cantidad : "-"}</li>) :  "+"}</ul></td>
            <td className="p-3 dark:text-gray-50 text-center"><ul>{detalles ? historial.map((historia, i) => <li key={i}>{historia.fecha_compra ? generarFecha(historia.fecha_compra) : "-"}</li>) :  "+"}</ul></td>
            <td className="p-3 dark:text-gray-50 text-center"><ul>{detalles ? historial.map((historia, i) => <li key={i}>{historia.garantia ? historia.garantia : "-"}</li>) :  "+"}</ul></td>
            <td className="p-3 dark:text-gray-50 text-center"><ul>{detalles ? historial.map((historia, i) => <li key={i}>{historia.factura ? historia.factura : "-"}</li>) :  "+"}</ul></td>
            <td className="p-3 dark:text-gray-50 text-center"><ul>{detalles ? historial.map((historia, i) => <li key={i}>{historia.proveedor ? historia.proveedor : "-"}</li>) :  "+"}</ul></td>
            <td className="p-3 dark:text-gray-50 text-center"><ul>{detalles ? historial.map((historia, i) => <li key={i}>{historia.valor_dolar_compra ? historia.valor_dolar_compra : "-"}</li>) :  "+"}</ul></td>
            <td className="p-3 dark:text-gray-50 text-center"><ul>{detalles ? historial.map((historia, i) => <li  key={i}>{historia.precio_compra_dolar ? historia.precio_compra_dolar : "-"}</li>) :  "+"}</ul></td>

        </tr>
    );
};

export default Compra;
