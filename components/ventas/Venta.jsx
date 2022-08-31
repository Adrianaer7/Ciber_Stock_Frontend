import { useState } from "react";
import ventaContext from "../../context/historial/ventas/ventaContext";


const Venta = ({producto}) => {
    const {
        nombre, 
        marca, 
        modelo, 
        cantidad,
        barras,
    } = producto

    const [detalles, setDetalles] = useState(false)

    return (

        <tr 
          className={`${!detalles && "font-semibold" } border-b dark:border-b-gray-800 dark:last:border-none  hover:bg-gray-50 hover:cursor-pointer active:bg-gray-100 dark:active:bg-gray-800 dark:hover:bg-gray-700`}
          onClick={() => setDetalles(!detalles)}
        >
            <td className="p-3 dark:text-gray-50 text-center">{nombre}</td>
            <td className="p-3 dark:text-gray-50 text-center">{!marca ? "-" : marca}</td>
            <td className="p-3 dark:text-gray-50 text-center">{!modelo ? "-" : modelo}</td>
            <td className="p-3 dark:text-gray-50 text-center">{!barras ? "-" : barras}</td>

        </tr>
    );
};

export default Venta;
