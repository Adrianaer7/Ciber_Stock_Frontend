import Link from "next/link";
import { useState } from "react";
import compraContext from "../../../context/historial/compras/compraContext";
import { generarFecha } from "../../../helpers";
const Compra = ({producto, proveedores}) => {
    const {
        nombre, 
        marca, 
        modelo, 
        historial
    } = producto

    const [detalles, setDetalles] = useState(false)


    const historialProveedores = historial.map(historia => historia.proveedor)
    const proveedoresIguales = proveedores.filter(prov => historialProveedores.includes(prov._id))

    return (

        <tr 
          className={`${!detalles && "font-semibold" } border-b dark:border-b-gray-800 dark:last:border-none  hover:bg-gray-50 hover:cursor-pointer active:bg-gray-100 dark:active:bg-gray-800 dark:hover:bg-gray-700`}
          onClick={() => setDetalles(!detalles)}
        >
            <td className="p-3 dark:text-gray-50 text-center break-words">{nombre}</td>
            <td className="p-3 dark:text-gray-50 text-center break-words">{!marca ? "-" : marca}</td>
            <td className="p-3 dark:text-gray-50 text-center break-words">{!modelo ? "-" : modelo}</td>
            <td className="p-3 dark:text-gray-50 text-center w-20"><ul>{detalles ? historial.map((historia, i) => <li key={i}>{historia.cantidad ? historia.cantidad : "-"}</li>) :  "+"}</ul></td>
            <td className="p-3 dark:text-gray-50 text-center"><ul>{detalles ? historial.map((historia, i) => <li key={i}>{historia.fecha_compra ? generarFecha(historia.fecha_compra) : "-"}</li>) :  "+"}</ul></td>
            <td className="p-3 dark:text-gray-50 text-center break-words"><ul>{detalles ? historial.map((historia, i) => <li key={i}>{historia.garantia ? historia.garantia : "-"}</li>) :  "+"}</ul></td>
            <td className="p-3 dark:text-gray-50 text-center break-words"><ul>{detalles ? historial.map((historia, i) => <li key={i}>{historia.barras ? historia.barras : "-"}</li>) :  "+"}</ul></td>
            <td className="p-3 dark:text-gray-50 text-center break-words"><ul>{detalles ? historial.map((historia, i) => <li key={i}>{historia.factura ? historia.factura : "-"}</li>) :  "+"}</ul></td>
            <td className="p-3 dark:text-gray-50 text-center break-words"><ul>{detalles ? proveedoresIguales.length > 0 ? proveedoresIguales.map((prov, i) => <p key={i}>{`${prov.empresa} (${prov.nombre})`}</p>): "-" : "-"}</ul></td>
            <td className="p-3 dark:text-gray-50 text-center break-words"><ul>{detalles ? historial.map((historia, i) => <li key={i}>{historia.valor_dolar_compra ? historia.valor_dolar_compra : "-"}</li>) :  "+"}</ul></td>
            <td className="p-3 dark:text-gray-50 text-center break-words"><ul>{detalles ? historial.map((historia, i) => <li  key={i}>{historia.precio_compra_dolar ? historia.precio_compra_dolar : historia.arsAdolar ? historia.arsAdolar : "-"}</li>) :  "+"}</ul></td>
        </tr>
    );
};

export default Compra;
