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
                <label>Nome</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
                <label>Email</label>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <label>Confirm password</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                <input type="submit" />
            </form>
        </main>
    )
}