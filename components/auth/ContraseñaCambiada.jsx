import Head from "next/head"
import Link from "next/link"

const ContraseñaCambiada = () => {
  return (
      <>
        <Head>
            <title>Reestablecer contraseña</title>
        </Head>
        <div className="grid grid-cols-1 gap-52 mt-10 mx-auto">
            <h1 className="font-black text-4xl text-center my-auto text-blue-900 dark:text-blue-300 uppercase">Reestablecer contraseña</h1>
            <div className="block mx-auto bg-red-600 rounded-lg  text-white text-4xl xs:2xl text-center my-auto font-black p-6 shadow-xl ">Su contraseña ha sido cambiada correctamente</div>
            <Link href="/" className=" uppercase mx-auto text-4xl hover:text-blue-900 duration-300 ">
                Volver a inicio
            </Link>
        </div>
      </>
    
  )
}

export default ContraseñaCambiada