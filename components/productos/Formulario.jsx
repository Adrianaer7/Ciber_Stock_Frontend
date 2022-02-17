import { useState, useContext, useEffect } from "react"
import Alerta from "./Alerta"
import productoContext from "../../context/productos/productoContext"
import { hoy } from "../../helpers"
import Rubro from "./Rubro"


const Formulario = ({productoEditar}) => {

    const productosContext = useContext(productoContext)
    const {productos, agregarProducto, agregarRubro, agregarProveedor, editarProducto, mensajeCodigo, mensajeRubro, traerProductos, traerRubros, rubros, proveedores, traerProveedores} = productosContext
   
    const [valores, setValores] = useState("")    //contiene lo que voy escribiendo
    const [escribiendo, setEscribiendo] = useState(false)   //cuando escribo pasa a true
    const [rubroSelect, setRubroSelect] = useState(productoEditar ? productoEditar.rubro : "")
    const [msj, setMsj] = useState({
        nombre: ""
    })

    useEffect(() => {
        traerProductos()
    }, [])

    useEffect(() => {
        traerRubros()
    },[productos])

    
    //se fija si en el state de filtrando hay algo, es porque se está escribiendo
    useEffect(() => {
        if(valores) {
            setEscribiendo(true)
        } else {
            setEscribiendo(false)
        }
    }, [valores])


    const [producto, setProducto] = useState({
        nombre: productoEditar?.nombre ?? "",
        modelo: productoEditar?.modelo ?? "",
        marca: productoEditar?.marca ?? "",
        codigo: productoEditar?.codigo ?? "",
        rubro: productoEditar?.rubro ?? "",
        precio_venta: productoEditar?.precio_venta ?? "",
        precio_compra_dolar: productoEditar?.precio_compra_dolar ?? "",
        precio_compra_peso: productoEditar?.precio_compra_peso ?? "",
        fecha_compra: productoEditar?.fecha_compra ?? hoy,
        proveedor: productoEditar?.proveedor ?? "",
        disponibles: productoEditar?.disponibles ?? "",
        rentabilidad: productoEditar?.rentabilidad ?? "",
        notas: productoEditar?.notas ?? ""
    })

    const {nombre, marca, modelo, codigo, rubro, precio_venta, precio_compra_dolar, fecha_compra, precio_compra_peso, proveedor, disponibles, rentabilidad, notas} = producto

    const onChange = e => {
        setProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }
    
    const onChangeRubroinput = e => {
        setValores(e.target.value)
    }
    if(valores) {
        producto.rubro = valores
    }

    
    const onChangeRubroSelect = e => {
        setRubroSelect(e.target.value)
    }
    //vacío el input si el select tiene algo
    if(rubroSelect) {
        producto.rubro = ""
    }
    
    const onSubmit = e => {
            e.preventDefault()
            //validar nombre
            if(producto.nombre === ""){
                setMsj({
                    nombre: "El nombre es obligatorio"
                })
                setTimeout(() => {
                    setMsj({
                        nombre: "",
                    })
                }, 3000);
                return
            }
            //si seleccione el rubro, lo mando al state
            if(rubroSelect) {
                producto.rubro = rubroSelect
            }
            
            //si es nuevo producto
            if(!productoEditar) {
                try {
                    agregarProducto(producto)
                    agregarRubro(rubro)
                    setRubroSelect("")
                    
                } catch (error) {
                    console.log(error)
                }              
            } else {
                //si hay que editar
                producto._id = productoEditar._id
                editarProducto(producto)
            }
  
        setValores("")
        setProducto({
            nombre: "",
            modelo: "",
            marca: "",
            codigo: "",
            rubro: "",
            precio_venta: "",
            precio_compra_dolar: "",
            precio_compra_peso: "",
            fecha_compra: hoy,
            proveedor: "",
            disponibles: "",
            rentabilidad: "",
            notas: ""
        })
    }


    return (
        <>
            <h1 className="font-black text-4xl text-blue-900 dark:text-blue-300 text-center">{productoEditar ? "Editar Producto": "Agregar Producto"}</h1>
            <p className="mt-3 text-center text-black dark:text-gray-50">Llena los siguientes campos para {productoEditar ? "editar" : "agregar"} un producto</p>
            <div className='bg-white dark:bg-gray-900 mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto relative '>
                <h1 className='text-gray-600 dark:text-white font-bold text-xl uppercase text-center'></h1>
                
                <form 
                    className="mt-10"
                    onSubmit={onSubmit}
                >
                    <div className="grid grid-cols-2 gap-4">

                        <div className="mb-4">
                            <div className="flex justify-between">
                                <label htmlFor="nombre" className="text-gray-800 dark:text-gray-300 font-bold font ">Nombre</label>
                                {msj.nombre && <p className="bg-red-700 rounded-lg uppercase text-white pl-2 pr-2">{msj.nombre}</p>}
                            </div>
                            <input  //esta etiqueta crea un input
                                type="text"
                                autoComplete="off"
                                className="mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="nombre"
                                placeholder="El nombre del producto"
                                name="nombre"
                                value={nombre}
                                onChange={onChange}
                            />
                            
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="marca" className="text-gray-800 dark:text-gray-300 font-bold font ">Marca</label>
                            <input  //esta etiqueta crea un input
                                type="text"
                                autoComplete="off"
                                className="mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="marca"
                                placeholder="Marca"
                                name="marca"
                                value={marca}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="modelo" className="text-gray-800 dark:text-gray-300 font-bold ">Modelo</label>
                            <input
                                type="text"
                                autoComplete="off"
                                className="mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="modelo"
                                placeholder="Ingresa tu modelo"
                                name="modelo"
                                value={modelo}
                                onChange={onChange}
                            />
                        </div>
                        
                        <div className="mb-4">
                            <div className="flex justify-between">
                                <label htmlFor="codigo" className="text-gray-800 dark:text-gray-300 font-bold font ">Código</label>
                                {mensajeCodigo && <p className="bg-red-700 rounded-lg uppercase text-white pl-2 pr-2">{mensajeCodigo}</p>}
                            </div>
                            <input  //esta etiqueta crea un input
                                type="number"
                                autoComplete="off"
                                className="mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="codigo"
                                placeholder="El código de 3 dígitos"
                                name="codigo"
                                value={codigo}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between">
                                <label htmlFor="rubro" className="text-gray-800 dark:text-gray-300 font-bold ">Rubro</label>
                                {mensajeRubro && <p className="bg-red-700 rounded-lg uppercase text-white pl-2 pr-2">{mensajeCodigo}</p>}
                            </div>
                            <div className="flex">
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className={`${rubroSelect && "hover:cursor-not-allowed"} mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300`}
                                    id="rubro"
                                    placeholder="Rubro"
                                    name="rubro"
                                    value={valores}
                                    disabled={rubroSelect && true}
                                    onChange={onChangeRubroinput}
                                />
                                <select  onChange={onChangeRubroSelect} value={escribiendo ? "" : rubroSelect} disabled={escribiendo && true} className="text-center mt-2 ml-4 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300">
                                    <option value="" className="">Selecciona algún rubro</option>
                                    {Object.keys(rubros).length > 0  ? (
                                        <>
                                            {rubros.map(rubro => (
                                                <Rubro
                                                    key={rubro._id}
                                                    rubro={rubro}
                                                />
                                                
                                            ))}
                                        </>
                                    ) : null}
                                </select>
                            </div>
                        </div>
                        {mensajeRubro && <Alerta>{mensajeRubro}</Alerta>}
                        <div className="mb-4">
                            <label htmlFor="proveedor" className="text-gray-800 dark:text-gray-300 font-bold ">Proveedor</label>
                            <input
                                type="text"
                                autoComplete="nope"
                                className="mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="proveedor"
                                placeholder="Proveedor"
                                name="proveedor"
                                value={proveedor}
                                onChange={onChange}
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="precio_compra_dolar" className="text-gray-800 dark:text-gray-300 font-bold ">Precio compra dolar U$S</label>
                            <input
                                type="number"
                                autoComplete="nope"
                                className="mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="precio_compra_dolar"
                                placeholder="Precio al que se lo compró"
                                name="precio_compra_dolar"
                                value={precio_compra_dolar}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="precio_compra_peso" className="text-gray-800 dark:text-gray-300 font-bold ">Precio compra peso AR$</label>
                            <input
                                type="number"
                                autoComplete="nope"
                                className="mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="precio_compra_peso"
                                placeholder="Precio al que se lo compró"
                                name="precio_compra_peso"
                                value={precio_compra_peso}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="precio_venta" className="text-gray-800 dark:text-gray-300 font-bold ">Precio venta</label>
                            <input
                                type="number"
                                autoComplete="nope"
                                className="mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="precio_venta"
                                placeholder="Precio de venta al público"
                                name="precio_venta"
                                value={precio_venta}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="rentabilidad" className="text-gray-800 dark:text-gray-300 font-bold ">% Rentabilidad</label>
                            <input
                                type="number"
                                autoComplete="nope"
                                className="mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="rentabilidad"
                                placeholder="% de ganancia"
                                name="rentabilidad"
                                value={rentabilidad}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="fecha_compra" className="text-gray-800 dark:text-gray-300 font-bold ">Fecha de compra</label>
                            <input
                                type="date"
                                autoComplete="off"
                                className="mt-2 block w-full p-3 appearance-none rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="fecha_compra"
                                placeholder="fecha_compra"
                                name="fecha_compra"
                                value={fecha_compra}
                                onChange={onChange}
                            />
                        </div>
                        
                        
                        
                        <div className="mb-4">
                            <label htmlFor="disponibles" className="text-gray-800 dark:text-gray-300 font-bold ">En stock</label>
                            <input
                                type="number"
                                autoComplete="nope"
                                className="mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="disponibles"
                                placeholder="Cantidad disponible"
                                name="disponibles"
                                value={disponibles}
                                onChange={onChange}
                            />
                        </div>
                        
                    
                    </div>
                    <div className="mb-4">
                        <label htmlFor="notas" className="text-gray-800 dark:text-gray-300 font-bold ">Notas</label>
                        <textarea
                            className="mt-2 block w-full h-20 p-3 rounded-md  bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                            id="notas"
                            placeholder="Ingresa tu notas"
                            name="notas"
                            value={notas}
                            onChange={onChange}
                        />
                    </div>
                    <input
                        type="submit"
                        value={productoEditar ? "Editar producto" : "Agregar producto"}
                        className="mt-5 w-full bg-blue-800 dark:bg-blue-500 p-3 text-white uppercase font-bold text-lg rounded-md cursor-pointer"
                    />
                </form>
            </div>
        </>
    )
}

export default Formulario

