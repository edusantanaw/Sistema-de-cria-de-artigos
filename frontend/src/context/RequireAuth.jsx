import { useContext } from "react"
import {AuthContext} from './Auth'
import Login from "../pages/Login"

export const RequireAuth = ({children}) =>{
    const auth = useContext(AuthContext)
    if(!auth.signed){
        return <Login />
    }
    return children
}