import styles from './Home.module.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'


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
                    console.log(data)

                }).catch(err => console.log(err))
    }, [])

    return (
        <>
            <div className={styles.category}>
                <h1>Categorias:</h1>
                <div>
                    {category.length > 0 &&
                        category.map((category) => (
                            <div className={styles.category_card}>
                                <Link to={`/category/${category.name}`}>
                                    <div className={styles.card}>
                                        <h1>{category.name}</h1>
                                        <img src={`http://localhost:5000/images/category/${category.img.filename}`} alt="categoryImg" />
                                        <p>total de articles: {category.totArticles}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </>
    )
}


export default Articles