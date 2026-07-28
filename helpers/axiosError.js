/**
 * Extrae un mensaje legible de errores de Axios (red, timeout o respuesta del API).
 */
export const mensajeAxios = (error, fallback = "Ocurrió un error") => {
  if (error?.response?.data?.msg) return error.response.data.msg
  if (typeof error?.response?.data === "string") return error.response.data
  if (error?.message === "Network Error") return "No se pudo conectar con el servidor"
  if (error?.code === "ECONNABORTED") return "La solicitud tardó demasiado"
  return fallback
}
