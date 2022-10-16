import styles from './Home.module.css'
import { Link } from 'react-router-dom'
import {useApi} from '../hooks/useHooks'

function Articles() {

    const {data , error, loading} = useApi('/article/category')

    return (
        <>
            <div className={styles.category}>
                <h1>Categorias</h1>
                {loading && <span>Carregando...</span>}
                <div>
                    {data.length > 0 &&
                        data.map((category, i) => (
                            <div key={i} className={styles.category_card}>
                                <Link to={`/category/${category.name}`}>
                                    <div className={styles.card}>
                                        <h1>{category.name}</h1>
                                        <img src={`https://sistema-de-artigos.herokuapp.com/images/category/${category.img.filename}`} alt="category Image" />
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