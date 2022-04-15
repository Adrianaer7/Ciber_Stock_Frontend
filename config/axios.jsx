import axios from "axios"

const clienteAxios = axios.create({
    baseURL: process.env.backendURL
})
console.log(process.env.backendURL)
export default clienteAxios;