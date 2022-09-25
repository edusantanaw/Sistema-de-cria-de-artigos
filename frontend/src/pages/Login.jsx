import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/Auth"
import style from './Login.module.css'

export default function Login() {

    const context = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorExists, setErrorExists] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()

       await context.Login(email, password)
        if (context.signed) {
            navigate('/')
        }
        else {
            const error = context.error
            setErrorExists(error)
        }
    }

        return (
            <main className={style.login}>
                <p>{errorExists}</p>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Digite seu email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="Digite a sua senha" value={password} onChange={e => setPassword(e.target.value)} />
                    <input type="submit" />
                    <span>Deseja criar uma conta? <Link to='/createAccount'>Criar conta</Link></span>
                </form>
            </main>
        )
    }