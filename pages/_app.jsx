import '../styles/globals.css'
import AuthState from '../context/auth/authState'
import ProductoState from '../context/productos/productoState'
import FaltanteState from '../context/faltantes/faltantesState'
import CompraState from '../context/historial/compras/compraState'
import ProveedorState from '../context/proveedores/proveedorState'
import RubroState from '../context/rubros/rubroState'
import PorcentajeState from '../context/porcentajes/porcentajeState'
import VentaState from '../context/historial/ventas/ventaState'

function MyApp({ Component, pageProps }) {
  return (
    <AuthState>
      <ProductoState>
        <FaltanteState>
          <CompraState>
            <VentaState>
              <ProveedorState>
                <RubroState>
                  <PorcentajeState>
                    <Component {...pageProps} />
                  </PorcentajeState>
                </RubroState>
              </ProveedorState>
            </VentaState>
          </CompraState>
        </FaltanteState>
      </ProductoState>
    </AuthState>

  )
}

export default MyApp
