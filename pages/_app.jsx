import '../styles/globals.css'
import AuthState from '../context/auth/authState'
import ProductoState from '../context/productos/productoState'
import FaltanteState from '../context/faltantes/faltantesState'

function MyApp({ Component, pageProps }) {
  return (
    <AuthState>
      <ProductoState>
        <FaltanteState>
            <Component {...pageProps} />
        </FaltanteState>
      </ProductoState>
    </AuthState>
  )
}

export default MyApp
