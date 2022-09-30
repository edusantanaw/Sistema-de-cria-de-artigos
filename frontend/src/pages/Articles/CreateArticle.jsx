import { useState } from "react"
import styles from './CreateArticle.module.css'
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function CreateArticle() {

    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState('')
    const [categories, setCategoires] = useState([])

    const history = useNavigate()

    const token = localStorage.getItem('@App:token')
    let user = localStorage.getItem('@App:user')
    if (user) {
        user = JSON.parse(user)
    }

    useEffect(() => {
        api.get('/article/category')
            .then((resp) => {
                setCategoires(resp.data)
            }).catch((err) => {
                setError(err.response.data)
            })
    }, [])

    const createArticle = async () => {

        await api.post('/article/articles/newArticle', {
            category: category,
            summary: summary,
            title: title,
            content: content,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((resp) => {

            history(`/myarticles/${user._id}`, { state: { message: resp.data } })


        }).catch((err) => {
            setError(err.response.data)

        })

    }


    return (
        <div className={styles.create}>
            <h1>Crie o seu artigo</h1>
            <div className={styles.content}>
                {error && error}
                <label>Categoria</label>
                <select value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="">Selecione a categoria</option>
                    {categories && categories.map((categorie)=>(
                        <option value={categorie.name}>{categorie.name}</option>
                    ))}
                </select>
                <label>Titulo</label>
                <input maxLength='30' type="text" placeholder="Titulo" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>Resumo</label>
                <input maxLength="120" type="text" placeholder="Resumo" value={summary} onChange={(e) => setSummary(e.target.value)} />
                <label htmlFor="content">Digite aqui o seu artigo</label>
                <textarea name="artiigo" id="art" cols="87" rows="40" onChange={(e) => setContent(e.target.value)} />
                <button onClick={createArticle}>Enviar</button>
            </div>
        </div>
    )
}