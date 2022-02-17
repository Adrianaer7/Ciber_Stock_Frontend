import AuthState from '../context/auth/authState'
import ProductoState from '../context/productos/productoState'
import '../styles/globals.css'

import tokenAuth from '../config/tokenAuth'

const token = typeof window !== "undefined" ? localStorage.getItem("token") : ""
  if(token) {
    tokenAuth(token)
  }


function MyApp({ Component, pageProps }) {
  return (
    <AuthState>
      <ProductoState>
        <Component {...pageProps} />
      </ProductoState>
    </AuthState>


  )
}

export default MyApp
