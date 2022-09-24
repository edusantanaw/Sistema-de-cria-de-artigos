import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/Auth"
import style from './Login.module.css'

export default function Login() {

    const context = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleLogin = async (e) => {
        e.preventDefault()
        if (email && password) {
            const isLogged = await context.Login(email, password)
            
            if (isLogged) {
                navigate('/')
            } else {
                alert('erro')
            }
        }
    }

    return (
        <main className={style.login}>
            <form onSubmit={handleLogin}>
                <label>Email</label>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <input type="submit" />
                <span>Deseja criar uma conta? <Link to='/createAccount'>Criar conta</Link></span>
            </form>
        </main>
    )
}