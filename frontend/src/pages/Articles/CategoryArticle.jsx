import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ArticleCard from '../partials/ArticleCard'
import api from '../../services/api'
import Message from '../partials/Message'

function CategoryaArticle() {

    const [articles, setArticles] = useState([])
    const category = useParams()
    const [msg, setMessage] = useState({})

    const token = localStorage.getItem('@App:token')

    useEffect(() => {
        fetch(`http://localhost:5000/article/category/articles/${category.name}`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        }).then((data) => data.json())
            .then((data) => {
                setArticles(data)
            })
            .catch((err) => {
                console.log(err)
            })

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

        if(msg) {
            setTimeout(()=>{
                setMessage('')
            },1000)
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
                                userId = {article.user._id}
                                deleter= {deleteArticle}
                                />
                        </li>
                    ))}
                </ul>
            </div>
                        {!articles[0] && <span>Nenhuma artigo encontrado!</span>}
        </div>
    )
}

export default CategoryaArticle