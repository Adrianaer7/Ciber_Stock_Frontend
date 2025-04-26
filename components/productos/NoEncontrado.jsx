import Link from "next/link"
import styles from "../../styles/NoEncontrado.module.css"
import Head from "next/head"

const NoEncontrado = () => {

  const noEncontrado = "Página no encontrada"

  return (
    <>
      <Head>
        <title>{noEncontrado}</title>
      </Head>
      <div className={styles.no_encontrado}>
        <h1 className="heading">Pagina no encontrada</h1>
        <Link href="/productos">Volver a inicio</Link>
      </div>
    </>
  )
}

export default NoEncontrado