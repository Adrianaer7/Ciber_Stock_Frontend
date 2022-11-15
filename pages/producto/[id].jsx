import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import clienteAxios from "../../config/axios"
import authContext from '../../context/auth/authContext';
import productoContext from '../../context/productos/productoContext';
import proveedorContext from "../../context/proveedores/proveedorContext"
import Layout from '../../components/layout/Layout';
import VerProducto from '../../components/productos/VerProducto';
import NoEncontrado from '../../components/productos/NoEncontrado';


export async function getServerSideProps({ params: {id} }) {
  const {data} = await clienteAxios(`/api/productos/${id}`)
  if(data.redireccionar) {  //si es true
    return {notFound: true} //redirecciono a la pagina 404. notFound es una funcion de next
  }
  const producto = data.producto
  return { props: { producto }}
}


const Ver = ({producto}) => { 

  const AuthContext = useContext(authContext)
  const {usuarioAutenticado, usuario} = AuthContext
  
  const productosContext = useContext(productoContext)
  const {productoActual, traerGarantias, garantias} = productosContext 

  const ProveedorContext = useContext(proveedorContext)
  const {traerProveedores, proveedores} = ProveedorContext

  const [coincide, setCoincide] = useState(true)
  const [todasGarantias, setTodasGarantias] = useState([])

  const router = useRouter()
  const {id} = router.query

  //Autentico al usuario y agrego el producto actual al state
  useEffect(() => {
    usuarioAutenticado()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  //Cuando me autentique, verifico que el producto que traigo es el del usuario que está logueado
  useEffect(() => {
  if(usuario) {
    productoActual(producto)
    if(producto.creador !== usuario._id) {
      setCoincide(false)
    }
    traerGarantias()
    traerProveedores()
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario])

  useEffect(() => {
    const warranty = [] //guardo momentaneamente las garantias
    if(garantias.length > 0) {  //garantias del state
        const garantiasProducto = garantias.find(garantia => garantia.idProducto == id)    //garantia que contiene id de este producto
        if(garantiasProducto) {
            garantiasProducto.detalles.map(todas => proveedores.map(proveedor => todas.proveedor.includes(proveedor._id) && warranty.push({proveedor: proveedor.empresa, garantia: todas.caducidad})))
        }
    }
    setTodasGarantias(warranty)
  }, [garantias, proveedores])

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
      ): <NoEncontrado/>
      }
    </>
  )
};



export default Ver;
