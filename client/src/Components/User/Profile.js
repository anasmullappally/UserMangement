import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";


function Profile() {
    const navigate = useNavigate()
    const [quote, setQuote] = useState('')
    const [tempQuote, setTempQuote] = useState('')
    async function populateQuote() {
        const req = await fetch('http://localhost:5000/api/quote', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
        const data = await req.json()
        if (data.status === 'ok') {
            setQuote(data.quote)
        } else {
            alert(data.error)
        }
    }
    useEffect(() => {

        const token = localStorage.getItem('token')
        if (token) {
            const user = decodeToken(token)
            console.log(user);
            if (!user) {
                localStorage.removeItem('token')
                navigate('/', { replace: true })
            } else {
                populateQuote()

            }
        }else{
            navigate('/')
        }
    }, [])
    async function updateQuote(event){
        event.preventDefault()
        const req = await fetch('http://localhost:5000/api/quote', {
            method:'post',
            headers: {
                'Content-Type': 'application/json' ,
                'x-access-token': localStorage.getItem('token')
            },
            body : JSON.stringify({
                quote :tempQuote
            })
        })
        const data = await req.json()
        if (data.status === 'ok') {
            setTempQuote('')
            setQuote(tempQuote)
        } else {
            alert(data.error)
        }
    }

    return (
        <div>
            <h1>Your quote :{quote || 'No Quote Found'}</h1>
            <form onSubmit={updateQuote}>
                <input
                    type="text"
                    placeholder='Quote'
                    value={tempQuote}
                    onChange={(e) => setTempQuote(e.target.value)}
                />
                <button type='submit' > submit</button>
            </form>
        </div>
    )
}

export default Profile