import { useEffect, useState } from "react"
import ArticleCard from "../partials/ArticleCard"
import api from "../../services/api"
import { Link } from "react-router-dom"
import Message from "../partials/Message"

export default function Articles() {

    const [articles, setArticle] = useState([])
    const [err, setError] = useState('')
    const [msg, setMessage] = useState({})

    const token = localStorage.getItem('@App:token')

    useEffect(() => {
        api.get('/article/articles', {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((resp) => {
                setArticle(resp.data)

            }).catch((err) => {
                setError(err.response.data)
            })
    }, [msg])

    const deleteArticle = (articleId, e) => {
        e.preventDefault()
        api.delete(`/article/articles/delete/${articleId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((resp) => {
            console.log(resp)
            setMessage(resp)
        })
            .catch((err) => {
                console.log(err)
                setMessage(err.response.data)
            })
    }

        if(msg) {
            setTimeout(()=>{
                setMessage('')
            },1000)
        }


    return (         
            <main className='content'>
                {err ? err : ''}
                <div className="h1_button">
                    <h1>Artigos</h1>
                    {msg && msg.status === 200 ?
                <Message type="success" msg={msg.data} /> : <Message type='error' msg={msg.data} />
            }
                    <Link to='/craeteArticle'><button>Novo artigo</button></Link>
                </div>
                <ul className='articles'>
                    {articles.length > 0 && articles.map((article) => (

                        <li key={article._id} >
                            <ArticleCard title={article.title}
                                id={article._id}
                                summary={article.summary}
                                userId={article.user._id}
                                deleter= {deleteArticle}
                            />
                        </li>
                    ))}
                </ul>
                {err && <span>{err}</span>}
            </main>
    )
}