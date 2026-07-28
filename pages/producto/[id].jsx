import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import clienteAxios from "../../config/axios"
import authContext from '../../context/auth/authContext';
import productoContext from '../../context/productos/productoContext';
import proveedorContext from "../../context/proveedores/proveedorContext"
import Layout from '../../components/layout/Layout';
import VerProducto from '../../components/productos/VerProducto';
import NoEncontrado from '../../components/productos/NoEncontrado';


export async function getServerSideProps(context) {
  const { id } = context.params
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
    const { data } = await clienteAxios(`/productos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (data.redireccionar) {
      return { notFound: true }
    }

    return { props: { producto: data.producto } }
  } catch (error) {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      return { notFound: true }
    }
    return { notFound: true }
  }
}


const Ver = ({ producto }) => {
  const AuthContext = useContext(authContext)
  const { usuarioAutenticado, usuario } = AuthContext

  const productosContext = useContext(productoContext)
  const { productoActual, traerGarantias, garantias } = productosContext

  const ProveedorContext = useContext(proveedorContext)
  const { traerProveedores, proveedores } = ProveedorContext

  const [coincide, setCoincide] = useState(null)
  const [todasGarantias, setTodasGarantias] = useState([])

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    usuarioAutenticado()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (usuario && coincide === null) {
      if (producto.creador !== usuario._id) {
        setCoincide(false)
      } else {
        setCoincide(true)
        productoActual(producto)
        traerGarantias()
        traerProveedores()
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario])

  useEffect(() => {
    const warranty = []
    if (garantias.length > 0) {
      const garantiasProducto = garantias.find(garantia => garantia.idProducto == id)
      if (garantiasProducto) {
        garantiasProducto.detalles.map(todas => proveedores.map(proveedor => todas.proveedor.includes(proveedor._id) && warranty.push({ proveedor: proveedor.empresa, garantia: todas.caducidad })))
      }
    }
    setTodasGarantias(warranty)
  }, [garantias, proveedores, id])

  return (
    <>
      {coincide ? (
        <Layout pagina={`Ver - ${producto.nombre}`}>
          <VerProducto
            key={producto._id}
            producto={producto}
            laGarantia={todasGarantias}
            proveedores={proveedores}
          />
        </Layout>
      ) : coincide === false ? <NoEncontrado /> : null
      }
    </>
  )
};



export default Ver;
