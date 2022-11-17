import Layout from "../../../components/layout/Layout";
import clienteAxios from "../../../config/axios";
import { useContext, useEffect, useState } from 'react';
import Formulario from "../../../components/productos/Formulario";
import productoContext from "../../../context/productos/productoContext";
import authContext from "../../../context/auth/authContext";
import NoEncontrado from "../../../components/productos/NoEncontrado";



export async function getServerSideProps({ params: {url} }) {
  const {data} = await clienteAxios(`/api/productos/${url}`)
  if(data.redireccionar) {
    return {notFound: true}
  }
  const productoEditar = data.producto
  return { props: { productoEditar }}
}



const Edicion = ({productoEditar}) => {
  

  const AuthContext = useContext(authContext)
  const {usuarioAutenticado, usuario} = AuthContext

  const productosContext = useContext(productoContext)
  const {productoActual} = productosContext

  const [coincide, setCoincide] = useState(true)

  //Autentico al usuario y agrego el producto actual al state
  useEffect(() => {
    usuarioAutenticado()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //Cuando me autentique, verifico que el producto que traigo es el del usuario que está logueado
  useEffect(() => {
    if(usuario) {
      productoActual(productoEditar)
      if(productoEditar.creador !== usuario._id){
        setCoincide(false)
      }  
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario])

  return (
    <>
      {coincide ? (
        <Layout pagina={`Editar - ${productoEditar.nombre}`}>
          <Formulario
            key={productoEditar._id}
            productoEditar={productoEditar}
          />
        </Layout>
      ): <NoEncontrado/>
      }
    </>
  )
};


export default Edicion;
