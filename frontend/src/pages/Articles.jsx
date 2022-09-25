import { useEffect, useState } from "react"
import ArticleCard from "./partials/ArticleCard"

export default function Articles() {

    const [articles, setArticle] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/article/articles', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => resp.json())
            .then((resp) => {
                setArticle(resp)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <main className='content'>
            <h1>Artigos</h1>
            <ul className='articles'>
                {articles.length > 0 && articles.map((article) => (
                    <li key={article._id}>
                        <ArticleCard key ={article._id} title={article.title}
                            id={article._id}
                            summary={article.summary} />
                    </li>
                ))}
            </ul>
        </main>
    )
}