import Layout from '../../components/layout/Layout';
import VerProducto from '../../components/productos/VerProducto';
import dbConnect from '../../lib/dbConnect';
import clienteAxios from "../../config/axios"
import authContext from '../../context/auth/authContext';
import { useContext, useEffect } from 'react';
import productoContext from '../../context/productos/productoContext';
import NoEncontrado from '../../components/productos/NoEncontrado';


const Ver = ({producto}) => { 

  const AuthContext = useContext(authContext)
  const {usuarioAutenticado} = AuthContext
  
  const productosContext = useContext(productoContext)
  const {productoActual} = productosContext

  useEffect(() => {
    usuarioAutenticado()
    if(producto) {
      productoActual(producto)
    }
  },[])
   

  return (
    <>
      {producto ? (
        <Layout pagina={`Ver - ${producto.nombre}`}>
          <VerProducto
            key={producto._id}
            producto={producto}
          />
        </Layout>
      )
      : <NoEncontrado/>
      }
    </>
  )
};


export async function getServerSideProps({ params: {id} }) {
  await dbConnect()
  const respuesta = await clienteAxios.get(`/api/productos/${id}`)
  if(respuesta.data.redireccionar) {  //si es true
    return {notFound: true} //redirecciono a la pagina 404. notFound es una funcion de next
  }
  const producto = respuesta.data.producto
  return { props: { producto }}
}

export default Ver;
