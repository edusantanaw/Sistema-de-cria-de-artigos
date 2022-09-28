import styles from './ArticleCard.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa'
import { useState } from 'react'


export default function ArticleCard({ id, title, summary, userId, deleter }) {

    const [visible, setVisble] = useState(false)
    const navigate = useNavigate()

    let Id = ''
    let user = localStorage.getItem('@App:user')
    if (user) {
        user = JSON.parse(user)
        Id = user._id
    }

    function isVisible(e) {
        e.preventDefault()
        visible ? setVisble(false) : setVisble(true)
    }

    function prevent(e) {
        e.preventDefault()
    }

    function handleEdit(id, e){
        e.preventDefault()
        navigate(`/article/edit/${id}`)
    }

    return (
        <>
            <Link to={`/category/article/${id}`}>
                <div className={styles.articles_card} >
                    <h1>{title}</h1>
                    <p>{summary}</p>
                    <div className={styles.icons}>
                        {userId === Id && <FaTrashAlt onClick={(e) => isVisible(e)} className={styles.trash} />}
                        {userId === Id && <FaRegEdit className={styles.edit} onClick = {(e)=> handleEdit(id, e)} />}
                    </div>
                    {visible && <div onClick={(e) => prevent(e)} className={styles.delete_content}>
                        <p>Realmente deseja excluir o artigo?</p>
                        <div className={styles.delete_buttons}>
                            <button onClick={(e) => deleter(id, e)}>Sim</button>
                            <button onClick={(e) => isVisible(e)} >Cancelar</button>
                        </div>
                    </div>
                    }
                </div>
            </Link>
        </>
    )
}