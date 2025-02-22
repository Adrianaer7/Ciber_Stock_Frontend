import clienteAxios from "../../config/axios";
import Link from "next/link";
import Head from "next/head";

const ConfirmarToken = ({msg}) => { 
    
  return (
    <>
        <Head>
            <title>Verificacion de la cuenta</title>
        </Head>
        <div className="grid grid-cols-1 gap-52 mt-24">
            <h1 className="font-black text-4xl text-center text-blue-900 dark:text-blue-300 uppercase">Verificación de la cuenta</h1>
            <div className="block mx-auto bg-red-600 rounded-lg mt-10 text-white text-4xl xs:2xl text-center font-black p-6 shadow-xl  w-2/4">{msg}</div>
            <Link href="/" className=" uppercase mx-auto text-4xl hover:text-blue-900 duration-300"> 
              Volver a inicio
            </Link>
        </div>
    </>
  )
};  


export async function getServerSideProps({ params: {token} }) {
    const {data} = await clienteAxios(`/usuarios/confirmar/${token}`)
    const msg = data.msg
    
    return { props: { msg }}
  }
  

export default ConfirmarToken