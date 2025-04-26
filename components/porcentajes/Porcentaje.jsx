import { useContext } from "react"
import Image from "next/image";
import authContext from "../../context/auth/authContext";
import porcentajeContext from "../../context/porcentajes/porcentajeContext";
import mostarAlerta from "../../config/alerts";

const Porcentaje = ({ porcentaje }) => {

    const AuthContext = useContext(authContext)
    const { modo } = AuthContext

    const PorcentajeContext = useContext(porcentajeContext)
    const { porcentajeActual } = PorcentajeContext

    const { _id, nombre, comision } = porcentaje

    const editarPorcentaje = async () => {
        const error = await porcentajeActual(_id)
        if (error) return mostarAlerta(error, modo)
    }

    return (
        <tr className="border-b dark:border-b-gray-800 dark:last:border-none  hover:bg-gray-50 active:bg-gray-100 dark:active:bg-gray-800 dark:hover:bg-gray-700">
            <td className="p-1 dark:text-gray-50 text-center ">{nombre ? nombre : "-"}</td>
            <td className="p-1 dark:text-gray-50 text-center">{comision ? comision : "0"}%</td>
            <td className="p-1 w-40 mt-2">
                <div className="flex justify-around">
                    <div className=" hover:bg-gray-200 dark:hover:bg-gray-600 p-1 pb-0 items-center rounded-md hover:cursor-pointer">

                        <Image
                            src={`${modo ? "/editar_light.svg" : "/editar_dark.svg"}`}
                            alt="Editar"
                            width={30}
                            height={30}
                            priority={true}
                            onClick={editarPorcentaje}
                        />
                    </div>

                </div>

            </td>
        </tr>
    )
}

export default Porcentaje