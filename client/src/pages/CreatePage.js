import React,{useState, useEffect} from 'react'
import { useHttp } from './../hooks/http.hook';
import { useContext } from 'react';
import { AuthContext } from './../context/AuthContext';
import {useHistory} from 'react-router-dom'
export  const CreatePage = ()=>{
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [ link, setLink] = useState('')
    useEffect(()=>{
        window.M.updateTextFields()
    }, [])
    const pressHandler = async e =>{
        if(e.key ==='Enter'){
            try{
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/detail/${data.link._id}`)
            }catch(e){

            }
        }
    }
    return(
        <div className = 'row'>   
            <div className="input-field col s6">
                <input
                  id="link"
                  type="text"
                  className="validate"
                  value={link}
                  placeholder="Paste your link"
                  onChange={e=>setLink(e.target.value)}
                  onKeyPress = {pressHandler}
                />
                <label htmlFor="link">Paste your link</label>
              </div>
        </div>
    )
} 