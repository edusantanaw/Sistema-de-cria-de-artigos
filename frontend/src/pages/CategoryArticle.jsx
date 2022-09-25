import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ArticleCard from './partials/ArticleCard'

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
        <div className='content'>
            <h1>Artigos:</h1>
            <div className='articles'>
                <ul className='articles'>
                    {articles.length > 0 && articles.map((article) => (
                        <li>
                            <ArticleCard key={article._id}
                                title={article.title} id={article._id}
                                summary={article.summary} />
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}

export default CategoryaArticle