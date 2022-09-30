import styles from './Home.module.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

function Articles() {

    const [category, setCategory] = useState([])
    const [error, setError]  = useState('')

    useEffect(() => {
        api.get('/article/category', {

            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => {
            console.log(resp.data)
            setCategory(resp.data)
        }).catch((err) => {
        
            setError(err.response.data)

        })
    }, [])

    return (
        <>
            <div className={styles.category}>
                <h1>Categorias</h1>
                <div>
                    {category.length > 0 &&
                        category.map((category, i) => (
                            <div key={i} className={styles.category_card}>
                                <Link to={`/category/${category.name}`}>
                                    <div className={styles.card}>
                                        <h1>{category.name}</h1>
                                        <img src={`https://sistema-de-artigos.herokuapp.com/images/category/${category.img.filename}`} alt="categoryImg" />
                                        <p>total de artigos: {category.totArticles}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>
                {error && <span>{error}</span>}
            </div>
        </>
    )
}


export default Articles