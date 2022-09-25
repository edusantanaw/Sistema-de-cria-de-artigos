import style from './Nav.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth} from '../../context/Auth'
import { useState } from 'react'


function Nav(){
    
    const [visible, setVisible] = useState(false)
    const auth = useAuth()
    const signed = auth.signed
    let id =''

    if(signed){
        id = auth.user._id
    }
    const navigate = useNavigate

    
    const handleLogout = async () =>{
       await auth.Logout()
        navigate('/')
    }

    const isVisible = () =>{
        visible ? setVisible(false) : setVisible(true)
    }

    return(
        <header>
            <h1><Link>logo</Link></h1>
            <ul>
                <li><Link to ='/'>Home</Link></li>
                <li><Link to ='/articles'>Artigos</Link></li>
                { signed ?  <li><Link to= {`myarticles/${id}`} >Meus Artigos</Link></li> : <li><Link to ='/login'>Login</Link></li>}
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