import Layout from "../../../components/layout/Layout";
import clienteAxios from "../../../config/axios";
import { useContext, useEffect, useState } from 'react';
import Formulario from "../../../components/productos/Formulario";
import productoContext from "../../../context/productos/productoContext";
import authContext from "../../../context/auth/authContext";
import NoEncontrado from "../../../components/productos/NoEncontrado";

export async function getServerSideProps(context) {
  const { url } = context.params
  const token = context.req.cookies?.token

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  try {
    const { data } = await clienteAxios(`/productos/${url}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (data.redireccionar) {
      return { notFound: true }
    }

    return { props: { productoEditar: data.producto } }
  } catch (error) {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      return { notFound: true }
    }
    return { notFound: true }
  }
}

const Edicion = ({ productoEditar }) => {
  const AuthContext = useContext(authContext)
  const { usuarioAutenticado, usuario } = AuthContext

  const productosContext = useContext(productoContext)
  const { productoActual } = productosContext

  const [coincide, setCoincide] = useState(null)

  useEffect(() => {
    usuarioAutenticado()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (usuario && coincide === null) {
      if (productoEditar.creador !== usuario._id) {
        setCoincide(false)
      } else {
        setCoincide(true)
        productoActual(productoEditar)
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
      ) : coincide === false ? <NoEncontrado /> : null
      }
    </>
  )
};

export default Edicion;
