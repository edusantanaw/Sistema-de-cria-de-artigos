import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './Article.module.css'
import api from '../../services/api'

function Article() {

    const id = useParams()
    const [article, setArticle] = useState([])
    const [error, setError] = useState()


    useEffect(() => {
        api.get(`/article/article/${id.id}`, {
                headers: {
                    "Content-type": "application/json"
                }
            })
                .then((resp) => {
                    setArticle(resp.data)
                })
                .catch((err) => {
                    setError(err.response.data)
                })

    }, [id.id])


    return (
        <>
                {error && <span>{error}</span>}
            {(
                <div className={styles.article}>
                    <h1>{article.title}</h1>
                    <p>{article.content}</p>
                </div>
            )}
        </>
    )
}

export default Article