import axios from 'axios'

const api = axios.create({
    baseURL: 'https://sistema-de-artigos.herokuapp.com'
})

export default api
