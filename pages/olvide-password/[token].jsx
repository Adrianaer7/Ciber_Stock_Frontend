import clienteAxios from "../../config/axios";
import dbConnect from "../../lib/dbConnect";
import Head from "next/head";
import NuevaContraseña from "../../components/auth/NuevaContraseña";
import NoEncontrado from "../../components/productos/NoEncontrado";

const ConfirmarToken = ({msg}) => { 
    


  return (
    <>  
        <Head>
            <title>Reestablecer contraseña</title>
        </Head>
        {msg ? (
            <NuevaContraseña/>
        ) : (
        <NoEncontrado/>
        )}
       
        
    </>
  )
};


export async function getServerSideProps({ params: {token} }) {
    await dbConnect()
    const respuesta = await clienteAxios.get(`/api/auth/olvide-password/${token}`)
    const msg = respuesta.data.msg
    
    return { props: { msg }}
  }
  

export default ConfirmarToken