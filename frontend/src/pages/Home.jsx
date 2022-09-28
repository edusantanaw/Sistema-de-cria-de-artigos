import styles from './Home.module.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Articles() {

    const [category, setCategory] = useState([])
    
    useEffect(() => {
            fetch('http://localhost:5000/article/category', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(resp => resp.json())
                .then((data) => {
                    setCategory(data)
                }).catch(err => console.log(err))
    }, [])

    return (
        <>
            <div className={styles.category}>
                <h1>Categorias</h1>
                <div>
                    {category.length > 0 &&
                        category.map((category, i) => (
                            <div key = {i} className={styles.category_card}>
                                <Link  to={`/category/${category.name}`}>
                                    <div className={styles.card}>
                                        <h1>{category.name}</h1>
                                        <img src={`http://localhost:5000/images/category/${category.img.filename}`} alt="categoryImg" />
                                        <p>total de artigos: {category.totArticles}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>
                {!category && <span>Nenhuma categoria encontrada...</span>}
            </div>
        </>
    )
}


export default Articles