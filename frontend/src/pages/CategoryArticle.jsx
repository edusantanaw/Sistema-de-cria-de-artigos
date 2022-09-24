import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './CategoryArticle.module.css'
import { Link } from 'react-router-dom'

function CategoryaArticle() {

    const [articles, setArticles] = useState([])
    const category = useParams()

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

    }, [category])

    return (
        <div className={styles.content}>
            <h1>Artigos:</h1>
            <div className={styles.articles}>
                {articles.length > 0 ? articles.map((article) => (
                    <Link to={`/category/article/${article._id}`}>
                        <div className={styles.articles_card} >
                            <h1>{article.title}</h1>
                            <p>{article.summary}</p>
                        </div>
                    </Link>
                )) : (
                    <h1>Nenhum artigo encontrado!</h1>
                )}
            </div>

        </div>
    )
}

export default CategoryaArticle