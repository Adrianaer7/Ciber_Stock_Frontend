import '../styles/globals.css'
import AuthState from '../context/auth/authState'
import ProductoState from '../context/productos/productoState'
import FaltanteState from '../context/faltantes/faltantesState'
import CompraState from '../context/historial/compras/compraState'
import ProveedorState from '../context/proveedores/proveedorState'

function MyApp({ Component, pageProps }) {
  return (
    <AuthState>
      <ProductoState>
        <FaltanteState>
          <CompraState>
            <ProveedorState>
              <Component {...pageProps} />
            </ProveedorState>
          </CompraState>
        </FaltanteState>
      </ProductoState>
    </AuthState>

  )
}

export default MyApp
