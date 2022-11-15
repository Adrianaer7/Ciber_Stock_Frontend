import clienteAxios from "../../config/axios";
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
    const {data} = await clienteAxios(`/api/usuarios/olvide-password/${token}`)
    const msg = data.msg
    
    return { props: { msg }}
  }
  
export default ConfirmarToken