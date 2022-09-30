import style from './Nav.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/Auth'
import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaAngleRight } from 'react-icons/fa'


export default function Nav() {

    const [visible, setVisible] = useState(false)
    const auth = useAuth()
    const navigate = useNavigate()
    const [menuVisible, setMenuVisible] = useState(false)

    let user = localStorage.getItem('@App:user')
    if (user) {
        user = JSON.parse(user)
    }

    const handleLogout = async () => {
        await auth.Logout()
        navigate('/')
    }

    const isVisible = () => {
        visible ? setVisible(false) : setVisible(true)
    }
    const handleMenu = () => {
        menuVisible ? setMenuVisible(false) : setMenuVisible(true)
    }

    return (
        <header>
            <h1><Link to='/'>logo</Link></h1>
            {!menuVisible && <GiHamburgerMenu onClick={handleMenu} id={style.menu} />}
            <ul className={menuVisible ? style.menuVisible : ''}>
                <FaAngleRight className={style.close} onClick ={handleMenu} />
                <li><Link to='/'>Home</Link></li>
                {user ? user.admin && <li><Link to='/admin'>Admin</Link></li> : ''}
                <li><Link to='/articles'>Artigos</Link></li>
                {user ? <li><Link to={`myarticles/${user._id}`} >Meus Artigos</Link></li> : <li><Link to='/login'>Login</Link></li>}
                {user && <li onClick={isVisible}><span>{user.name}</span> {
                    visible && <ul className={style.perfil}>
                        <li><Link to={`/editPassword/${user._id}`}> Alterar senha</Link></li>
                        <li><Link to={`/editEmail/${user._id}`}> Alterar email/nome</Link></li>
                        <li onClick={handleLogout}>Sair</li>
                    </ul>
                } </li>}
            </ul>
        </header>
    )
}