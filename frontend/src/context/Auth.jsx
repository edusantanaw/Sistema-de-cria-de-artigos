import api from "../services/api";
import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({})
    const [signed, setSigned] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const storagedUser = localStorage.getItem('@App:user');
        const storagedToken = localStorage.getItem('@App:token');

        if (storagedToken && storagedUser) {
            setUser(JSON.parse(storagedUser))
            api.defaults.headers.Authorization = `Bearer ${storagedToken}`
            setSigned(true)
        }
    }, [])

    function Logout() {
        localStorage.removeItem('@App:user')
        localStorage.removeItem('@App:token')
        api.defaults.headers.Authorization = null
        setUser(null)
        setSigned(false)
    }

    async function Login(email, password) {

        await api.post('/user/login', {
            email: email,
            password: password
        })
            .then((response) => {
                api.defaults.headers.Authorization = `Bearer ${response.data.token}`
                localStorage.setItem('@App:user', JSON.stringify(response.data.user))
                localStorage.setItem('@App:token', response.data.token)

                setUser(response.data.user)
                setSigned(true)
            })
            .catch((err) => {
                setError(err.response.data)
            })
    }

    async function Signup(name, email, password, confirmPassword) {

        const response = await api.post('/user/createAccount', {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        })
        if (response.data.user && response.data.token) {
            api.defaults.headers.Authorization = `Bearer ${response.data.token}`
            localStorage.setItem('@App:user', JSON.stringify(response.data.user))
            localStorage.setItem('@App:token', response.data.token)

            setUser(response.data.user)
            setSigned(true)
            return true
        }
        else
            return false
    }

    async function newArticle(token, category, summary, title, content) {
        await api.post('/article/articles/newArticle', {
            category: category,
            summary: summary,
            title: title,
            content: content,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })  .then((resp) => console.log(resp))
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <AuthContext.Provider value={{ signed, user, Login, Logout, Signup, error, newArticle }} >
            {children}
        </AuthContext.Provider>
    )
}
export function useAuth() {
    const context = useContext(AuthContext)
    return context
}
