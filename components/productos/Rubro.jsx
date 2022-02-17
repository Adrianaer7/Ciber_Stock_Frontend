import React from 'react'

const Rubro = ({rubro}) => {
  return (
    <option value={rubro.nombre}>{rubro.nombre}</option>

  )
}

export default Rubro