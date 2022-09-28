import { useState, useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import ArticleCard from "../partials/ArticleCard"
import { Link } from 'react-router-dom'
import api from "../../services/api"
import Message from "../partials/Message"

export default function MyArticles() {

    const id = useParams().id
    const [MyArticles, setMyArticles] = useState([])
    const token = localStorage.getItem('@App:token')
    const [msg, setMessage] = useState({})
    const location = useLocation()



    useEffect(() => {
        api.get(`http://localhost:5000/article/articles/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then((resp) => {
            setMyArticles(resp.data)
        })
            .catch((err) => {
                setMessage(err)
            }
            )
    }, [msg])

    const deleteArticle = (articleId, e) => {
        e.preventDefault()
        api.delete(`http://localhost:5000/article/articles/delete/${articleId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((resp) => {
            setMessage(resp)
        })
            .catch((err) => {
                console.log(err)
                setMessage(err.response)
            })
    }

    if (msg) {
        setTimeout(() => {
            setMessage('')
        }, 1000)
    }

    return (
        <main className='content'>
            <div className="h1_button">
                <h1>Meus artigos</h1>
                {msg && msg.status === 200 ?
                    <Message type="success" msg={msg.data} /> : <Message type='error' msg={msg.data} />
                }
                {location.state && <Message type = "success" msg = {location.state.message} />} 
                <Link to='/craeteArticle'><button>Novo artigo</button></Link>
            </div>
            <ul className='articles'>
                {MyArticles.length > 0 && MyArticles.map((article) => (
                    <li key={article._id}>
                        <ArticleCard
                            title={article.title} id={article._id}
                            summary={article.summary}
                            userId={article.user._id}
                            deleter={deleteArticle}
                        />
                    </li>
                ))}
            </ul>
            {!MyArticles[0] && <span>Nenhum aritigo encontrado!</span>}
        </main>
    )
}