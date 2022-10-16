import { useParams } from 'react-router-dom'
import styles from './Article.module.css'
import {useApi} from '../../hooks//useHooks'

function Article() {

    const id = useParams()
    const {data, error, loading} = useApi(`/article/article/${id.id}`)

    return (
        <>
                {error && <span>{error}</span>}
            {(
                <div className={styles.article}>
                    <h1>{data.title}</h1>
                    <p>{data.content}</p>
                </div>
            )}
        </>
    )
}

export default Article