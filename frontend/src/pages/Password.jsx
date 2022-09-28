import {useState } from "react"
import { useParams } from "react-router-dom"
import api from "../services/api"
import styles from './Password.module.css'

export default function Password(){

    const id = useParams()

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [msg, setMsg] = useState()

    const handlePassword =(e)=>{
        e.preventDefault()
        api.put(`/user/editPassword/${id._id}`,{
            password: password,
            confirmPassword: confirmPassword
        }).then((resp)=>{
            setMsg(resp.data)
        }).catch((err)=>{
            setMsg(err.response.data)
        })
    }

    const handleSetPassword = (e) =>{
        let pass = e.target.value
        setPassword(pass)
    }

    const handleSetConfirmPassword =(e)=>{
        let pass = e.target.value
        setConfirmPassword(pass)
    }

    return(
        <section className={styles.password} >
            {msg && <span>{msg}</span>}
            <form onSubmit={(e)=> handlePassword(e)}>
                <label htmlFor="password">Senha</label>
                <input type="password"  placeholder="Digite a sua nova senha..." name='password' autoComplete="new-password" onChange={(e=> handleSetPassword(e))} />
                <label htmlFor="confirm password">Confirme a sua senha</label>
                <input type="password" name="password"  placeholder="Digite a confirmação de senha..." autoComplete="new-password" onChange={(e=> handleSetConfirmPassword(e))} />
                <input type="submit" />
            </form>
        </section> 
    )
}