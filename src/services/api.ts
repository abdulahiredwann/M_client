import axios, {CanceledError} from "axios";

const api  = axios.create({
    baseURL:'https://m-server-lovat.vercel.app/api'
})

api.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('x-auth-token')
        if(token){
            config.headers['x-auth-token'] = token
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

export default api
export {CanceledError}