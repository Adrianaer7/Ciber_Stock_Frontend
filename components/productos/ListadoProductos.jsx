import { useContext, useEffect, useState } from "react";
import Producto from "./Producto";
import productoContext from "../../context/productos/productoContext"



const ListadoProductos = () => {

    const productosContext = useContext(productoContext)
    const {
        traerProductos, 
        productos, 
        eliminarProductos, 
        eliminarProveedores, 
        eliminarRubros, 
        limpiarSeleccionado, 
        filtro, 
        filtrados, 
        traerDolarAPI, 
        traerDolarBD, 
        dolarBD, 
        editarProductos, 
        orderCodigo, 
        orderCodigoFiltrados, 
        orderPrecio, 
        orderPrecioFiltrados,
        orderNombre,
        orderNombreFiltrados,
        orderMarca,
        orderMarcaFiltrados,
        orderModelo,
        orderModeloFiltrados,
        orderDisponibles,
        orderDisponiblesFiltrados,
    } = productosContext

    const [filtrando, setFiltrando] = useState("")    //contiene lo que voy escribiendo
    const [escribiendo, setEscribiendo] = useState(false)   //cuando escribo pasa a true
    const [ordenCodigo, setOrdenCodigo] = useState(false)
    const [ordenNombre, setOrdenNombre] = useState(false)
    const [ordenMarca, setOrdenMarca] = useState(false)
    const [ordenModelo, setOrdenModelo] = useState(false)
    const [ordenDisponibles, setOrdenDisponibles] = useState(false)
    const [ordenPrecio, setOrdenPrecio] = useState(false)



    useEffect(() => {
        traerProductos()
    }, [])
   
    useEffect(() => {
        limpiarSeleccionado()
        traerDolarBD()
        traerDolarAPI()
    },[])

    useEffect(() => {
        editarProductos(dolarBD)
    }, [dolarBD])

    useEffect(() => {
        if(filtrando) {
            orderCodigoFiltrados(ordenCodigo)
        }
        orderCodigo(ordenCodigo)
    }, [ordenCodigo])
    useEffect(() => {
        if(filtrando) {
            orderPrecioFiltrados(ordenPrecio)
        }
        orderPrecio(ordenPrecio)
    },[ordenPrecio])
    useEffect(() => {
        if(filtrando) {
            orderNombreFiltrados(ordenNombre)
        }
        orderNombre(ordenNombre)
    }, [ordenNombre])
    useEffect(() => {
        if(filtrando) {
            orderMarcaFiltrados(ordenMarca)
        }
        orderMarca(ordenMarca)
    }, [ordenMarca])
    useEffect(() => {
        if(filtrando) {
            orderModeloFiltrados(ordenModelo)
        }
        orderModelo(ordenModelo)
    }, [ordenModelo])
    useEffect(() => {
        if(filtrando) {
            orderDisponiblesFiltrados(ordenDisponibles)
        }
        orderDisponibles(ordenDisponibles)
    }, [ ordenDisponibles])

    //cambia el estado a true si escribo
    useEffect(() => {
        if(filtrando) {
            setEscribiendo(true)
        } else {
            setEscribiendo(false)
        }
    }, [filtrando])


    const onChangeFiltro = e => {
        setFiltrando(e.target.value)
        filtro(e.target.value)  //envio al productoState
    }

    const ordenarCodigo = () => {
        setOrdenCodigo(!ordenCodigo)
    }
    const ordenarPrecio = () => {
        setOrdenPrecio(!ordenPrecio)
    }
    const ordenarNombre = () => {
        setOrdenNombre(!ordenNombre)
    }
    const ordenarMarca = () => {
        setOrdenMarca(!ordenMarca)
    }
    const ordenarModelo = () => {
        setOrdenModelo(!ordenModelo)
    }
    const ordenarDisponibles = () => {
        setOrdenDisponibles(!ordenDisponibles)
    }
    
    

  return (
    <>  
        <div className="  absolute  lg:relative">
            <h1 className="font-black dark:text-blue-300 text-4xl text-blue-900 text-center mb-4 ">Listado de productos</h1>
            <div className="flex flex-col lg:flex-row justify-between w-4/4">
                <input 
                    type="text" 
                    className="lg:w-2/6  p-4 shadow dark:bg-gray-900  focus:outline-none focus:ring focus:border-blue-300 dark:text-gray-50 rounded-lg" //outline-none le quita el borde default, focus-ring le pone borde
                    placeholder="Buscar algún producto" 
                    onChange={onChangeFiltro}
                />
                <div className="flex flex-row gap-2">
                    <input 
                        type="button" 
                        value="Eliminar Productos" 
                        className="bg-red-600 p-2 mt-2 text-white font-bold rounded-lg hover:cursor-pointer " 
                        onClick={() => eliminarProductos()} 
                    />
                    <input 
                        type="button" 
                        value="Eliminar Rubros" 
                        className="bg-red-600 p-2 mt-2 text-white font-bold rounded-lg hover:cursor-pointer " 
                        onClick={() => eliminarRubros()} 
                    />
                    <input 
                        type="button" 
                        value="Eliminar Proveedores" 
                        className="bg-red-600 p-2 mt-2 text-white font-bold rounded-lg hover:cursor-pointer " 
                        onClick={() => eliminarProveedores()} 
                    />
                </div>
                {dolarBD && <p className=" p-4 pl-0 my-auto font-bold dark:text-white">Dolar hoy: <span className="text-red-600">${dolarBD}</span></p>}
                
            </div>
        </div>
        
        <table className="relative top-44 sm:top-44 lg:top-0 w-full mt-5 table-auto shadow rounded-lg dark:bg-gray-900 bg-white ">
            <thead className="bg-blue-800 text-white">
                <tr className="hover:cursor-pointer select-none">
                    <th onClick={() => ordenarCodigo()} className="p-2 rounded-tl-lg">CODIGO</th>
                    <th onClick={() => ordenarNombre()}>NOMBRE</th>
                    <th onClick={() => ordenarMarca()}>MARCA</th>
                    <th onClick={() => ordenarModelo()}>MODELO</th>
                    <th onClick={() => ordenarDisponibles()}>DISPONIBLES</th>
                    <th onClick={() => ordenarPrecio()}>PRECIO</th>
                    <th className="rounded-tr-lg">ACCIONES</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(filtrados).length === 0 && escribiendo ? (
                    <>
                        <tr className="relative p-3 dark:text-gray-50 text-xl">
                            <td>Sin resultados</td>
                        </tr>
                    </>) 
                : Object.keys(filtrados).length > 0 && escribiendo ?(
                    <>
                        {filtrados.map(producto => (
                            <Producto
                                key={producto._id}
                                producto={producto}
                            />
                        ))}
                    </>)
                : (
                <>
                    {productos.map(producto => (
                        <Producto
                            key={producto._id}
                            producto={producto}
                        />
                    ))}
                </>
                )}  
            </tbody>
            
        </table>
    </>
    )
    
};

export default ListadoProductos;




