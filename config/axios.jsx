import axios from "axios"

const clienteAxios = axios.create({
    baseURL: `${process.env.backendURL}/api`
})

export default clienteAxios;