import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './Article.module.css'

function Article() {

    const id = useParams()
    const [article, setArticle] = useState([])

    useEffect(() => {
            fetch(`http://localhost:5000/article/article/${id.id}`, {
                method: 'GET',
                headers: {
                    "Content-type": "application/json"
                }
            }).then((data) => data.json())
                .then((data) => {
                    setArticle(data)
                })
                .catch((err) => {
                    console.log(err)
                })

    }, [])

    return (
        <>
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