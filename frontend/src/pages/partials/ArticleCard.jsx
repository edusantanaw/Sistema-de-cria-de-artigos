import styles from './ArticleCard.module.css'
import { Link } from 'react-router-dom'

export default function ArticleCard({ id, title, summary }) {
    return (
        <Link to={`/category/article/${id}`}>
            <div className={styles.articles_card} >
                <h1>{title}</h1>
                <p>{summary}</p>
            </div>
        </Link>
    )
}