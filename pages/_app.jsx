import '../styles/globals.css'
import AuthState from '../context/auth/authState'
import ProductoState from '../context/productos/productoState'
import FaltanteState from '../context/faltantes/faltantesState'
import CompraState from '../context/historial/compras/compraState'

function MyApp({ Component, pageProps }) {
  return (
      <ProductoState>
        <FaltanteState>
          <CompraState>
            <AuthState>
              <Component {...pageProps} />
            </AuthState>
          </CompraState>
        </FaltanteState>
      </ProductoState>
  )
}

export default MyApp
