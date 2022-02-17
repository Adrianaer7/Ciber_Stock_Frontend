import { useContext, useEffect, useState } from "react";
import Producto from "./Producto";
import productoContext from "../../context/productos/productoContext"

const ListadoProductos = () => {

    const productosContext = useContext(productoContext)
    const {traerProductos, productos, eliminarProductos, eliminarRubros, limpiarSeleccionado, filtro, filtrados} = productosContext

    const [filtrando, setFiltrando] = useState()    //contiene lo que voy escribiendo
    const [escribiendo, setEscribiendo] = useState(false)   //cuando escribo pasa a true

    useEffect(() => {
        traerProductos()
        limpiarSeleccionado()
    },[])

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
    
    
  return (
    <>
        <h1 className="font-black dark:text-blue-300 text-4xl text-blue-900 text-center mb-4 ">Listado de productos</h1>
        <div className="flex  justify-between">
            <input 
                type="text" 
                className="w-1/4 my-4 mb-4 p-4 shadow dark:bg-gray-900  focus:outline-none focus:ring focus:border-blue-300 dark:text-gray-50 rounded-lg" //outline-none le quita el borde default, focus-ring le pone borde
                placeholder="Buscar algún producto" 
                onChange={onChangeFiltro}
            />
            <div className="flex flex-col">
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
            </div>
           
            
        </div>
        
        <table className="w-full mt-5 table-auto shadow rounded-lg dark:bg-gray-900 bg-white ">
            <thead className="bg-blue-800 text-white">
                <tr>
                    <th className="p-2 rounded-tl-lg">CODIGO</th>
                    <th>NOMBRE</th>
                    <th>MARCA</th>
                    <th>MODELO</th>
                    <th>DISPONIBLES</th>
                    <th>PRECIO</th>
                    <th className="rounded-tr-lg">ACCIONES</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(filtrados).length === 0 && escribiendo ? (
                    <>
                        <p className="fixed p-3 text-2xl dark:text-gray-50">No hay resultados</p>
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




