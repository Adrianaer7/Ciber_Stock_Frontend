const Rubro = ({rubro}) => {
  return (
    <>
      <option value={rubro ? rubro : ""} className="uppercase hidden">{rubro ? rubro  : "--- Seleccione ---"}</option>
      <option value="" className="uppercase">--- Seleccione ---</option>
      <option value="AUDIO 30%" className={rubro && rubro == "AUDIO 30%" && "hidden" }>AUDIO 30%</option>
      <option value="ACCESORIOS 20%" className={`${rubro && rubro  == "ACCESORIOS 20%" && "hidden" }`}>ACCESORIOS 20%</option>
      <option value="NETWORKING 30%" className={`${rubro && rubro  == "NETWORKING 30%" && "hidden" }`}>NETWORKING 30%</option>
      <option value="CONSUMIBLES 40%" className={`${rubro && rubro  == "CONSUMIBLES 40%" && "hidden" }`}>CONSUMIBLES 40%</option>
      <option value="PERIFERICOS 30%" className={`${rubro && rubro  == "PERIFERICOS 30%" && "hidden" }`}>PERIFERICOS 30%</option>
      <option value="CABLES 75%" className={`${rubro && rubro  == "CABLES 75%" && "hidden" }`}>CABLES 75%</option>
      <option value="MEMORIA 75%" className={`${rubro && rubro  == "MEMORIA 75%" && "hidden" }`}>MEMORIA 75%</option>
      <option value="ALMACENAMIENTO 75%" className={`${rubro && rubro  == "ALMACENAMIENTO 75%" && "hidden" }`}>ALMACENAMIENTO 75%</option>
      <option value="HARDWARE 35%" className={`${rubro && rubro  == "HARDWARE 35%" && "hidden" }`}>HARDWARE 35%</option>
      <option value="LIBRERIA 145%" className={`${rubro && rubro  == "LIBRERIA 145%" && "hidden" }`}>LIBRERIA 145%</option>
      <option value="SEGURIDAD" className={`${rubro && rubro  == "SEGURIDAD" && "hidden" }`}>SEGURIDAD</option>
      <option value="ILUMINACION" className={`${rubro && rubro  == "ILUMINACION" && "hidden" }`}>ILUMINACION</option>
    </>

  )
}

export default Rubro