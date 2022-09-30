import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ArticleCard from '../partials/ArticleCard'
import api from '../../services/api'
import Message from '../partials/Message'

function CategoryaArticle() {

    const [articles, setArticles] = useState([])
    const category = useParams()
    const [msg, setMessage] = useState({})
    const [error, setError] = useState('')
    const token = localStorage.getItem('@App:token')

    useEffect(() => {
        api.get(`/article/category/articles/${category.name}`, {

            headers: { 'Content-type': 'application/json' }
        })
        .then((resp) => {
            setArticles(resp.data)
        })
        .catch((err) => {
            setError(err.response.data)
        })

}, [msg, category.name])

const deleteArticle = (articleId, e) => {
    e.preventDefault()
    api.delete(`/article/articles/delete/${articleId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then((resp) => {
        setMessage(resp)
    })
        .catch((err) => {
            setError(err.response.data)
        })
}

if (msg) {
    setTimeout(() => {
        setMessage('')
    }, 1000)
}

return (
    <div className='content'>
        <div className="h1_button">
            <h1>Artigos</h1>
            {msg && msg.status === 200 ?
                <Message type="success" msg={msg.data} /> : <Message type='error' msg={msg.data} />
            }
            <Link to='/craeteArticle'><button>Novo artigo</button></Link>
        </div>
        <div className='articles'>
            <ul className='articles'>
                {articles.length > 0 && articles.map((article, i) => (
                    <li key={i}>
                        <ArticleCard key={article._id}
                            title={article.title} id={article._id}
                            summary={article.summary}
                            userId={article.user._id}
                            deleter={deleteArticle}
                        />
                    </li>
                ))}
            </ul>
        </div>
        {error && <span>{error}</span>}
    </div>
)
}

export default CategoryaArticle