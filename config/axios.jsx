import axios from "axios"

const backendURL =
  process.env.NEXT_PUBLIC_BACKEND_URL || process.env.backendURL

const clienteAxios = axios.create({
  baseURL: `${backendURL}/api`
})

export default clienteAxios
