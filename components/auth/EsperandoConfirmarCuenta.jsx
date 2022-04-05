import Head from "next/head"
import Link from "next/link"

const EsperandoConfirmarCuenta = () => {



  return (
    <>
        <Head>
            <title>Verificacion de la cuenta</title>
        </Head>
        <div className="grid grid-cols-1 gap-52 mt-10 mx-auto">
            <h1 className="font-black text-4xl text-center my-auto text-blue-900 dark:text-blue-300 uppercase">Verificación de la cuenta</h1>
            <div className="block mx-auto bg-red-600 rounded-lg  text-white text-4xl xs:2xl text-center my-auto font-black p-6 shadow-xl ">Revisa el email para activar tu cuenta</div>
            <Link href={"/"}>
                <a className=" uppercase mx-auto text-4xl ">
                    Volver a inicio
                </a>
            </Link>
        </div>
    </>
  )
}

export default EsperandoConfirmarCuenta