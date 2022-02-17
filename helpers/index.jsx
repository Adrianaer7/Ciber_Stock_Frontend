//genero fecha formateada
export const generarFecha = fecha => { //tomo la fecha del producto
    const fechaNueva = new Date(fecha+"T00:00:00")  //le agrego T00:00:00 para que no haga conflicto la zona horaria y agende mal el dia de la fecha
    const opciones = {year: "numeric", month: "long", day: "2-digit"}
    return fechaNueva.toLocaleString("es-AR", opciones)
}
//genero id
export const generarId = () => {
    const random = Math.random().toString(36).substring(2)
    const fecha = Date.now().toString(36)
    return random + fecha
}
//genero fecha de hoy, para dejar el input listo
export const hoy = new Date(Date.now()).toISOString().slice(0, 10);