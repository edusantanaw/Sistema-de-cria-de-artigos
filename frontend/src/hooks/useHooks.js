import api from "../services/api";
import { useState, useEffect } from "react";



export const useApi = (url, options) =>{

    const [data, setData] =useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        api.get(url, options).then((response)=>{
            setData(response.data)
        }).catch((err)=>{
            setError(err.data)
        }).finally(()=>{
            setLoading(false)
        })
    }, [])

return { data, loading, error}
}