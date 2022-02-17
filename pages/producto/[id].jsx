import Layout from '../../components/layout/Layout';
import VerProducto from '../../components/productos/VerProducto';
import dbConnect from '../../lib/dbConnect';
import clienteAxios from "../../config/axios"
import Link from 'next/link';
import styles from "../../styles/NoEncontrado.module.css"
import authContext from '../../context/auth/authContext';
import { useContext, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import productoContext from '../../context/productos/productoContext';

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
  
 
  const noEncontrado = "Página no encontrada"

  

  return (
    <>
      {producto ? (
        <Layout pagina={producto.nombre}>
          <VerProducto
            key={producto._id}
            producto={producto}
          />
        </Layout>
      )
      :(
        <>
        <Head>
          <title>{noEncontrado}</title>
        </Head>
        <div className={styles.no_encontrado}>
            <h1 className="heading">Pagina no encontrada</h1>
            <Link href="/"><a>Volver a inicio</a></Link>
        </div>
        </>
      )}

    </>
  )
};


export async function getServerSideProps({ params: {id} }) {
    await dbConnect()
    const respuesta = await clienteAxios.get(`/api/productos/${id}`)
    const producto = respuesta.data.producto

  return { props: { producto }}
}

export default Ver;
