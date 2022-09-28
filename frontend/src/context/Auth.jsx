import api from "../services/api";
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({})
    const [signed, setSigned] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const storagedUser = localStorage.getItem('@App:user');
        const storagedToken = localStorage.getItem('@App:token');

        if (storagedToken && storagedUser) {
            setUser(JSON.parse(storagedUser))
            api.defaults.headers.Authorization = `Bearer ${storagedToken}`
            setSigned(true)
        }
    }, [signed])


     function Login(email, password) {

         api.post('/user/login', {
            email: email,
            password: password
        })
            .then((response) => {
                api.defaults.headers.Authorization = `Bearer ${response.data.token}`
                localStorage.setItem('@App:user', JSON.stringify(response.data.user))
                localStorage.setItem('@App:token', response.data.token)

                setSigned(true)
                setUser(response.data.user)
                navigate('/')
                return true
            })
            .catch((err) => {
                setError(err.response.data)
                return  false
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

    function Logout() {
        localStorage.removeItem('@App:user')
        localStorage.removeItem('@App:token')
        api.defaults.headers.Authorization = null
        setUser(null)
        setSigned(false)
        return (' ')
    }


    return (
        <AuthContext.Provider value={{ signed, user, Login, Logout, Signup, error }} >
            {children}
        </AuthContext.Provider>
    )
}
export function useAuth() {
    const context = useContext(AuthContext)
    return context
}
