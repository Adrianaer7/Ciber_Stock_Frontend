const Rubro = ({rubro}) => {
  return (
    <>
      <option value={rubro ? rubro : ""} className="uppercase hidden">{rubro ? rubro : "--- Seleccione ---"}</option>
      <option value="" className="uppercase">--- Seleccione ---</option>
      <option value="AUDIO" className={rubro == "MEMORIA" && "hidden" }>AUDIO 30%</option>
      <option value="ACCESORIOS 30%" className={rubro == "ACCESORIOS" && "hidden" }>ACCESORIOS 30%</option>
      <option value="NETWORKING" className={rubro == "NETWORKING" && "hidden" }>NETWORKING</option>
      <option value="CONSUMIBLES" className={rubro == "CONSUMIBLES" && "hidden" }>CONSUMIBLES</option>
      <option value="PERIFERICOS" className={rubro == "PERIFERICOS" && "hidden" }>PERIFERICOS</option>
      <option value="CABLES" className={rubro == "CABLES" && "hidden" }>CABLES</option>
      <option value="MEMORIA" className={rubro == "MEMORIA" && "hidden" }>MEMORIA</option>
      <option value="ALMACENAMIENTO" className={rubro == "ALMACENAMIENTO" && "hidden" }>ALMACENAMIENTO</option>
      <option value="HARDWARE" className={rubro == "HARDWARE" && "hidden" }>HARDWARE</option>
      <option value="LIBRERIA" className={rubro == "LIBRERIA" && "hidden" }>LIBRERIA</option>
      <option value="SEGURIDAD" className={rubro == "SEGURIDAD" && "hidden" }>SEGURIDAD</option>
      <option value="ILUMINACION" className={rubro == "ILUMINACION" && "hidden" }>ILUMINACION</option>
    </>

  )
}

export default Rubro