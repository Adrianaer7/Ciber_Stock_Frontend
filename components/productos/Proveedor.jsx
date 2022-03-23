const Proveedor = ({proveedor}) => {
  return (
    <option value={proveedor.nombre}>{proveedor.nombre}</option>
  )
}

export default Proveedor