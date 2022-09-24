import style from './Nav.module.css'
import { Link } from 'react-router-dom'
import {AuthContext} from '../../context/Auth'
import { useContext } from 'react'
import { useState } from 'react'


function Nav(){
    const [visible, setVisible] = useState(false)
    const auth = useContext(AuthContext)
    const signed = auth.signed

    const handleLogout = () =>{
        auth.Logout()
    }

    const isVisible = () =>{
        visible ? setVisible(false) : setVisible(true)
    }

    return(
        <header>
            <h1><Link>logo</Link></h1>
            <ul>
                <li><Link to ='/'>Home</Link></li>
                <li><Link>Artigos</Link></li>
                { signed ?  <li><Link>Meus Artigos</Link></li> : <li><Link to ='/login'>Login</Link></li>}
                { signed && <li onClick={isVisible}><span>Perfil</span> {
                    visible &&  <ul className={style.perfil}>
                        <li><Link> Alterar senha</Link></li>
                        <li><Link> Alterar email/nome</Link></li>
                        <li onClick={handleLogout}>Sair</li>
                    </ul>
                } </li>}
            </ul>
        </header>
    )
}
export default Nav