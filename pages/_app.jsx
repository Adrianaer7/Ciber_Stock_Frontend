import '../styles/globals.css'
import AuthState from '../context/auth/authState'
import ProductoState from '../context/productos/productoState'
import FaltanteState from '../context/faltantes/faltantesState'

function MyApp({ Component, pageProps }) {
  return (
      <ProductoState>
        <FaltanteState>
          <AuthState>
            <Component {...pageProps} />
          </AuthState>
        </FaltanteState>
      </ProductoState>
  )
}

export default MyApp
