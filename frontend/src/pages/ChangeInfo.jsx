import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import api from "../services/api"
import styles from './ChangeInfo.module.css'

export default function ChangeInfo() {

    const id = useParams()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [msg, setMsg] = useState('')

    useEffect(() => {
        api.get(`/user/getUser/${id._id}`)
            .then((resp) => {
                setName(resp.data.user.name)
                setEmail(resp.data.user.email)
            }).catch((err) => {
                setMsg(err.data)
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        api.put(`/user/editEmail/${id._id}`,{
            name: name,
            email: email
        })
            .then((resp) => {
                setMsg(resp.data)
            }).catch((err) => {
                setMsg(err.response.data)
            })
    }


    const handleName = (e) => {
        let name = e.target.value
        setName(name)
    }

    const handleEmail = (e) => {
        let email = e.target.value
        setEmail(email)
    }

    return (
        <section className={styles.change_name}>
            {msg && <span>{msg}</span>}
            <form action="change infos" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="name">Nome</label>
                <input type="text" placeholder="Digite o seu nome..." name='name' value={name} onChange={(e) => handleName(e)} />
                <label htmlFor="email">Email</label>
                <input type="text" name='email' placeholder="Digite o seu novo email..." value ={email} onChange={(e) => handleEmail(e)} />
                <input type="submit" />
            </form>

        </section>
    )
}