import api from "../../services/api"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import styles from './CreateArticle.module.css'

export default function EditArticle() {

    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState('')
    const [user, setUser] = useState({})

    const id = useParams()
    const token = localStorage.getItem('@App:token')
    const history = useNavigate()


    useEffect( () => {
     api.get(`/article/article/${id._id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((resp) => {
            setCategory(resp.data.category)
            setTitle(resp.data.title)
            setSummary(resp.data.summary)
            setContent(resp.data.content)
            setUser(resp.data.user)
        }).catch((err) => {
            setError(err.response.data)
        })
    }, [])


    const editArticle = async () => {

        await api.put(`/article/articles/edit/${id._id}`, {
            category: category,
            summary: summary,
            title: title,
            content: content,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((resp) => {

            history(`/myarticles/${user._id}`, {state : {message: resp.data}})

        }).catch((err) => {
            setError(err.response.data)
        })

    }


    return (
        <div className={styles.create}>
            <h1>Edição de artigo</h1>
            <div className={styles.content}>
                {error}
                <label>Categoria</label>
                <select value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="">Selecione a categoria</option>
                    <option value="songs">songs</option>
                    <option value="games">games</option>
                </select>
                <label>Titulo</label>
                <input maxLength='30' type="text" placeholder="Titulo" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>Resumo</label>
                <input maxLength="120" type="text" placeholder="Resumo" value={summary} onChange={(e) => setSummary(e.target.value)} />
                <label htmlFor="content">Digite aqui o seu artigo</label>
                <textarea name="artiigo" id="art" cols="87" rows="40" value={content} onChange={(e) => setContent(e.target.value)} />
                <button onClick={editArticle}>Enviar</button>
            </div>
        </div>
    )
}