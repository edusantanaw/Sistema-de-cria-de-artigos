import style from './CreateAccount.module.css'
import { useState } from 'react'
import { useAuth } from "../context/Auth"
import { useNavigate } from 'react-router-dom'

export default function CreateAccount() {
    const navigate = useNavigate()
    const context = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleCreate = async (e) => {
        e.preventDefault()
        const isLogged = await context.Signup(name, email, password, confirmPassword)
        console.log(isLogged)
        if (isLogged) {
            navigate('/')
        } else {
            alert('erro')
        }
    }
    return (
        <main className={style.create_account}>
            <form onSubmit={handleCreate}>
                <h1>Create account</h1>
                <input maxLength='20' type="text" placeholder='Digite o seu nome...' value={name} onChange={e => setName(e.target.value)} />
                <input type="text" value={email} placeholder="Digite o seu email..." onChange={e => setEmail(e.target.value)} />
                <input type="password" value={password} placeholder='Digite a sua senha' onChange={e => setPassword(e.target.value)} />
                <input type="password" value={confirmPassword} placeholder="Digite a confirmação de senha" onChange={e => setConfirmPassword(e.target.value)} />
                <input type="submit" />
            </form>
        </main>
    )
}