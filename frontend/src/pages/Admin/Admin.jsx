import api from "../../services/api"
import { useState, useEffect } from "react"
import styles from './Admin.module.css'
import { useNavigate } from "react-router-dom"

export default function User() {

    const [users, setUsers] = useState([])
    const token = localStorage.getItem('@App:token')
    const [error, setError] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState()

    const history = useNavigate()
    useEffect(() => {
        api.get(`/user`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((resp) => {
                setUsers(resp.data)
            }).catch((err) => {
                setError(err.response.data)
            })
    }, [token])

  
    const handleUpload = (e) => {
        const image = e.target.files[0]
        setImage(image)
    }

    const handleCategory = async (e) => {
        e.preventDefault()

        const data = new FormData()
        data.append('image', image)
        data.append('category', category)
        
        await api.post('/article/category/createCategory', data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((resp) => {

            history('/', { state: { messageCreate: resp.data } })

        }).catch((err) => {
            setError(err.response.data)
        })
    }

    return (
        <section className={styles.admin} onSubmit={(e) => handleCategory(e)}>

            <div className={styles.create_category}>
                <h1>Criar categoria</h1>
                <form action="criar categoria">
                    <label htmlFor="name">Nome</label>
                    <input type="text" name="category" placeholder="name" value={category} onChange={(e) => setCategory(e.target.value)} />
                    <label htmlFor="imagem">Imagem</label>
                    <input type="file" onChange={(e) => handleUpload(e)} />
                    <input type="submit" />
                    {error && <div className={styles.error}>
                        <span>{error}</span>
                    </div>}
                </form>
            </div>
            <div className={styles.users}>
                <h1>Users</h1>
                <ul>
                    {users.length > 0 && users.map((user) => (
                        <li key={user._id}>
                            <h1>nome: {user.name}</h1>
                            <span>email: {user.email}</span>
                        </li>

                    ))}
                </ul>
            </div>
        </section>
    )
}