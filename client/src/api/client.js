import axios from "axios"
const client = axios.create({ baseURL: "https://movie-backend-pzju.onrender.com/api" })
export default client;