//Esta pagina se crea para cuando no se ingresa bien la url
import Link from "next/link"
import styles from "../styles/NoEncontrado.module.css"
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
            <Link href="/"><a>Volver a inicio</a></Link>
        </div>
        </>
    )
}

export default NoEncontrado
