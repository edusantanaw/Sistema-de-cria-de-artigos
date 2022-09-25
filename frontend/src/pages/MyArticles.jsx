import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ArticleCard from "./partials/ArticleCard"

export default function MyArticles() {

    const id = useParams().id
    const [MyArticles, setMyArticles] = useState([])
    const token = localStorage.getItem('@App:token')

    useEffect(() => {
        fetch(`http://localhost:5000/article/articles/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then(resp => resp.json())
            .then((resp) => {
                setMyArticles(resp)
            })
            .catch((err) => {
                console.log(err)
            }
            )

    }, [id, token])

    return (
        <main className='content'>
            <h1>Artigos</h1>
            <ul className='articles'>
                {MyArticles.length > 0 && MyArticles.map((article) => (
                    <li key = {article._id}>
                        <ArticleCard
                            title={article.title} id={article._id}
                            summary={article.summary}
                        /></li>
                ))}
            </ul>
        </main>
    )
}