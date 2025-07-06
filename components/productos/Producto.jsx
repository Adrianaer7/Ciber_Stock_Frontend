import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import productoContext from "../../context/productos/productoContext";
import faltanteContext from "../../context/faltantes/faltantesContext";
import ventaContext from "../../context/historial/ventas/ventaContext";
import authContext from "../../context/auth/authContext";
import proveedorContext from "../../context/proveedores/proveedorContext"
import { hoy } from "../../helpers";
import Swal from "sweetalert2";
import mostarAlerta from "../../config/alerts";

const Producto = ({ producto }) => {
    const AuthContext = useContext(authContext)
    const { modo } = AuthContext

    const productosContext = useContext(productoContext)
    const { productoActual, venderProducto, garantias, dolarBD, mostrarModal } = productosContext
    const ProveedorContext = useContext(proveedorContext)
    const { proveedores } = ProveedorContext

    const faltantesContext = useContext(faltanteContext)
    const { agregarFaltante, eliminarFaltante } = faltantesContext

    const ventasContext = useContext(ventaContext)
    const { agregarVenta } = ventasContext

    const [colorFaltante, setColorFaltante] = useState(producto.faltante)
    const [todasGarantias, setTodasGarantias] = useState([])
    const {
        nombre,
        marca,
        codigo,
        precio_venta_conocidos,
        precio_venta_efectivo,
        precio_venta_tarjeta,
        precio_venta_ahoraDoce,
        precio_venta_cuotas,
        disponibles,
        modelo,
        imagen,
        _id,
        faltante,
        limiteFaltante
    } = producto

    const conocidos = (nombre + " " + marca + " " + modelo + " " + "$" + Math.round(precio_venta_conocidos)).trim().replace(/\s\s+/g, ' ')   //datos que se copian al hacer click en el precio. El replace quita 2 o mas espacio entre palabra y palabra
    const efectivo = (nombre + " " + marca + " " + modelo + " " + "$" + Math.round(precio_venta_efectivo)).trim().replace(/\s\s+/g, ' ')
    const tarjeta = (nombre + " " + marca + " " + modelo + " " + "$" + Math.round(precio_venta_tarjeta)).trim().replace(/\s\s+/g, ' ')
    const textoUnPago = (nombre + " " + marca + " " + modelo + " " + "Total final ahora 12: " + "$" + Math.round(precio_venta_ahoraDoce)).trim().replace(/\s\s+/g, ' ') + " - " + "Valor de cada cuota: " + "$" + precio_venta_cuotas


    useEffect(() => {
        if (!garantias.length) return setTodasGarantias([])

        const garantiasProducto = garantias.filter(g => g.idProducto === _id);

        const warranty = garantiasProducto.flatMap(g =>
            g.detalles.flatMap(todas =>
                proveedores
                    .filter(proveedor => todas.proveedor.includes(proveedor._id))
                    .map(proveedor => ({
                        proveedor: proveedor.empresa,
                        garantia: todas.caducidad
                    }))
            )
        );

        setTodasGarantias(warranty);
    }, []);


    useEffect(() => {
        setColorFaltante(faltante)
    }, [producto])




    const Copiado = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    })

    const venderElProducto = async () => {
        const valor = await Swal.fire({ //modal del input
            title: `${modo ? '<h5 style="color:white">Unidades</h5>' : '<h5 style="color:#545454">Unidades</h5>'}`,
            background: `${modo ? "rgb(31 41 55)" : "white"}`,
            html: `${modo ? '<input id="swal-input" type="tel" value="1" style="color: white; width: 100px; text-align:center" class="swal2-input">' : '<input id="swal-input" type="tel" value="1" style="color: black; width: 100px; text-align:center;" class="swal2-input">'}`,
            width: "25rem",
            focusConfirm: true,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input').value
                ]
            },
            showCloseButton: true,
        })
        if (valor.isConfirmed) {
            const unidades = Number(valor.value[0])
            if (unidades < 1 || !unidades || isNaN(unidades) || !Number.isInteger(unidades)) {
                await Swal.fire({ //le pongo el await para que la siguiente funcion se ejecute cuando quite el modal de error
                    icon: 'error',
                    title: 'Error',
                    color: `${modo ? "white" : "rgb(31 41 55)"}`,
                    background: `${modo ? "rgb(31 41 55)" : "white"}`,
                    html: `${modo ? '<p style="color:#a59ff3">Los <b>unidades a vender</b> deben ser un número entero mayor a 0.</p>' : '<p style="color: #545454">Los <b>unidades a vender</b> deben ser un número entero mayor a 0.</p>'}`,
                })
                return venderElProducto()   //luego de mostrar el modal de error, vuelvo a ejecutar la funcion desde 0
            }
            if (unidades > disponibles) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    color: `${modo ? "white" : "rgb(31 41 55)"}`,
                    background: `${modo ? "rgb(31 41 55)" : "white"}`,
                    html: `${modo ? '<p style="color:#a59ff3"><b>No se pueden vender</b> más unidades de las que hay.</p>' : '<p style="color: #545454">No se pueden vender</b> más unidades de las que hay..</p>'}`,
                })
                return venderElProducto()
            }
            let error = await venderProducto(producto, unidades)
            if (error) return mostarAlerta(error, modo)
            error = await agregarVenta(producto, dolarBD, unidades, hoy)
            if (error) return mostarAlerta(error, modo)
            setColorFaltante(true)
            await Copiado.fire({    //luego de descontar de la bd, muestro alerta de venta correcta
                icon: 'success',
                title: `${unidades > 1 ? "Se vendieron " + unidades + " unidades de" + nombre : "Se vendió " + unidades + " unidad de " + nombre}`,
                background: `${modo ? "#505050" : "white"}`,
                width: "25%",
                color: `${modo ? "white" : "#545454"}`,
            })

            let resta
            if (limiteFaltante !== null) {
                resta = disponibles - unidades  //obtengo cuantas unidades me quedan
            }
            if (resta <= limiteFaltante) { //si el producto que vendi entró a faltantes, muestro alerta luego de la alerta de vendido
                Copiado.fire({
                    icon: 'success',
                    title: 'Agregado a faltante',
                    color: `${modo ? "white" : "#545454"}`,
                    background: `${modo ? "#505050" : "white"}`,
                })
            }
        }
    }




    const cambiarFaltante = async () => {
        if (colorFaltante) {
            await eliminarFaltante(_id)
            setColorFaltante(false)
            Copiado.fire({
                icon: 'error',
                title: 'Quitado de faltantes',
                background: `${modo ? "#505050" : "white"}`,
                color: `${modo ? "white" : "#545454"}`,
            })
        } else {
            const error = await agregarFaltante(_id)
            if (error) return mostarAlerta(error, modo)
            setColorFaltante(true)
            Copiado.fire({
                icon: 'success',
                title: 'Agregado a faltante',
                color: `${modo ? "white" : "#545454"}`,
                background: `${modo ? "#505050" : "white"}`,
            })
        }
    }


    const copiarPrecioTarjeta = () => {
        navigator.clipboard.writeText(`${tarjeta}`)
        Copiado.fire({
            icon: 'success',
            title: 'Copiado',
            color: `${modo ? "white" : "#545454"}`,
            background: `${modo ? "#505050" : "white"}`,
        })
    }
    const copiarPrecioEfectivo = () => {
        navigator.clipboard.writeText(`${efectivo}`)
        Copiado.fire({
            icon: 'success',
            title: 'Copiado',
            color: `${modo ? "white" : "#545454"}`,
            background: `${modo ? "#505050" : "white"}`,
        })
    }
    const copiarPrecioConocidos = () => {
        navigator.clipboard.writeText(`${conocidos}`)
        Copiado.fire({
            icon: 'success',
            title: 'Copiado',
            color: `${modo ? "white" : "#545454"}`,
            background: `${modo ? "#505050" : "white"}`,
        })
    }
    const copiarAhoraDoce = () => {
        navigator.clipboard.writeText(`${textoUnPago}`)
        Copiado.fire({
            icon: 'success',
            title: 'Copiado',
            color: `${modo ? "white" : "#545454"}`,
            background: `${modo ? "#505050" : "white"}`,
        })
    }

    const mostrarElModal = () => {
        mostrarModal(true)
        productoActual(producto)
    }


    return (
        <tr className={` dark:last:border-none  hover:bg-gray-50 hover:cursor-pointer active:bg-gray-100 dark:active:bg-gray-800 dark:hover:bg-gray-700`}>
            <td className="p-3 dark:text-gray-50 text-center font-semibold break-words" >{codigo}</td>
            <td className=" text-center">
                {imagen
                    ? <Image
                        src={`/imagenes/${imagen}`}
                        width={100}
                        height={100}
                        quality={50}
                        alt="img"
                        style={{ objectFit: 'contain', width: 'auto', height: 'auto' }}
                        onClick={mostrarElModal}
                    />
                    : null
                }
            </td>
            <td className="dark:text-gray-50 p-3 text-center break-words">{nombre}</td>
            <td className="p-3 dark:text-gray-50 text-center break-words">{marca ? marca : "-"}</td>
            <td className="p-3 dark:text-gray-50 text-center break-words">{modelo ? modelo : "-"}</td>
            <td className="dark:text-gray-50 text-center uppercase break-words">
                {
                    !disponibles 
                        ? 
                            <span className="bg-red-600 font-black text-white p-1  rounded-sm">
                                Sin stock
                            </span> 
                        :  
                            disponibles && !faltante && colorFaltante === null || disponibles && colorFaltante === false 
                                ? 
                                    disponibles 
                                : 
                                    disponibles && faltante || disponibles && colorFaltante || disponibles && faltante && colorFaltante === false 
                                    ? 
                                        <span className="text-red-600 font-bold">
                                            {disponibles}
                                        </span> 
                                    : null
                }
            </td>
            <td className="p-3 dark:text-gray-50 text-center break-words">
                {
                    todasGarantias.length > 0 
                        ? 
                            todasGarantias.map((garantia, i) => (
                                <div 
                                    key={i}
                                >
                                    <p 
                                        key={i} 
                                        className="font-medium "
                                    >   
                                        {garantia.garantia}
                                    </p>
                                    <p className="mb-1">
                                        {garantia.proveedor}
                                    </p>
                                </div>
                            )) 
                        :
                            "-"
                } 
            </td>
            <td className="p-2 dark:text-gray-50 text-center text-lg hover:cursor-pointer break-words">
                <div className="flex flex-col">
                    <p className="mb-4 pb-2 pt-2 px-2 hover:rounded-md hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 text-3xl font-black " onClick={copiarPrecioTarjeta}>${precio_venta_tarjeta}</p>
                    <p className="pb-2 pt-2 hover:rounded-md hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 text-2xl font-medium" onClick={copiarPrecioEfectivo}>${precio_venta_efectivo}</p>
                    <p className="mt-4 pb-2 pt-2 hover:rounded-md hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 text-xl" onClick={copiarPrecioConocidos}>${precio_venta_conocidos}</p>
                </div>
            </td>
            <td className="p-2 dark:text-gray-50 text-center  text-lg hover:cursor-pointer break-words">
                <div className="flex flex-col">
                    <p className="mb-4 pb-2 pt-2 px-2 hover:rounded-md hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 text-xl font-normal " onClick={copiarAhoraDoce}>
                        Un pago
                        <span className="block font-black text-3xl">${precio_venta_ahoraDoce}</span>
                    </p>
                    <p className="pb-2 pt-2 hover:rounded-md hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 text-xl font-normal " onClick={copiarAhoraDoce}>
                        12 cuotas de:
                        <span className="block font-black text-2xl">${precio_venta_cuotas}</span>
                    </p>

                </div>
            </td>

            <td className="p-3 mt-2  h-full break-words">
                <button
                    type="button"
                    className="block bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 mb-2 w-full cursor-pointer text-black p-2 uppercase font-bold text-xs  rounded-md"
                    onClick={venderElProducto}
                >Vender</button>
                <Link
                    passHref
                    href={`/producto/${_id}`}
                    type="button"
                    className="bg-blue-600 hover:bg-blue-900 mb-2 w-full cursor-pointer text-white text-center p-2 uppercase font-bold text-xs block  rounded-md"
                    onClick={() => productoActual(producto)}
                >
                    Detalles
                </Link>
                <Link
                    passHref
                    href={`/producto/editar/${_id}`}
                    type="button"
                    className="bg-green-600 hover:bg-green-900 mb-2 w-full cursor-pointer text-white text-center p-2 uppercase font-bold text-xs block rounded-md"
                    onClick={() => productoActual(producto)}
                >
                    Editar
                </Link>
                <button
                    type="button"
                    className="bg-red-600 hover:bg-red-900  w-full cursor-pointer text-white p-2 uppercase font-bold text-xs block rounded-md"
                    onClick={cambiarFaltante}
                >{!colorFaltante || !faltante ? "Agregar faltante" : "Quitar faltante"}</button>

            </td>
        </tr>
    );
};

export default Producto;
