import React, { useState, useCallback, useContext} from 'react';    //cuando se esta subiendo un archivo, dropzone hace mucho rendering y carga muchas veces el componente. useCallback optimiza el rendimiento
import {useDropzone} from "react-dropzone"
import productoContext from '../../context/productos/productoContext';
import Image from "next/image"


const Dropzone = () => {


    const productosContext = useContext(productoContext)
    const {cargando, mostrarAlerta, subirArchivo, mostrarImagen, imagen } = productosContext
   


    const onDropRejected = () => {
        mostrarAlerta("Error. El limite de subida es de 1Mb. Obtén una cuenta gratuita para poder subir archivos mas grandes.")
    }

    const onDropAccepted = useCallback( async (acceptedFiles) => { //acceptedFiles es el archivo que subo
        //guardo la imagen en el state
            //URL.createObjectURL crea una url temporal para la imagen, para que pueda mostrarse en miniatura luego. Al momento de abandonar la pagina se elimina
        //Crear un form-data. form-data es el tipo de archivo que subo en postman
        const formData = new FormData()
        formData.append("archivo", acceptedFiles[0])    //formData prepara el archivo con ese tipo para que luego sea enviado a la bd. Como es un archivo, siempre tomo la posicion 0. "archivo" es el nombre en clave que le paso. Está declarado en archivosController.js
        subirArchivo(formData, acceptedFiles[0].path)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Extraer contenido de Dropzone
    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({onDropAccepted, onDropRejected, maxSize: 1048576})  //onDropAcepted se va a ejecutar cuando se cumplan las reglas, en este caso el tamaño maximo del archivo 1mb. onDropRejected se ejecutará cuando no se cumplan las reglas
    const archivos = acceptedFiles.map(archivo => (
        <li key={archivo.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
            <div className=" flex flex-wrap items-center text-center">
                
                <div className="ml-2">
                    <p className="font-bold text-xl block">{archivo.path}</p> {/*nombre del archivo */}
                </div>
            </div>
        </li>
    ))


    return ( 
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col h-80 items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
            { acceptedFiles.length > 0 
                ? (
                    <div className=" w-2/4 h-100">
                        <h4 className="text-2xl font-bold text-center mb-4">Imagenes</h4>
                        <ul>
                            {archivos}
                        </ul>
                        
                        {cargando 
                            ? <p className="my-10 text-center text-gray-600">Subiendo archivo...</p> 
                            : null
                        }  
                    </div>
                ) 
                : (
                    <>
                        <div className="dropzone w-full py-32"{...getRootProps()}>
                            <input className="h-100" {...getInputProps()}/> {/*Para que al presionar en el cuadro, se abra la ventana de windows para seleccionar archivo */}
                            {
                                isDragActive //para que detecte cuando estamos arrastrando un archivo y cambie la layout
                                ?   <p className="text-2xl text-center text-gray-600">Suelta un archivo</p>
                                :   <>
                                        <div className="text-center">
                                            <p className="text-2xl text-center text-gray-600">Selecciona un archivo y arrastralo aquí</p>
                                            <button className="bg-blue-700 w-2/4 py-3 rounded-lg text-white my-10 hover:bg-blue-800" type="button">
                                                Selecciona archivos para subir
                                            </button>
                                        </div>
                                    </>
                            }
                        </div>
                    </>
                )
            }
        </div>
     );
}
 
export default Dropzone;