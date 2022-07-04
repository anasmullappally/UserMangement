import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
function AdminLogin() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // useEffect(() => {
    //     let token = localStorage.getItem('token')
    //     if (token) {
    //         navigate('/')
    //     } else {
    //         navigate('/')
    //     }
    // }, [])
    async function loginAdmin(event) {
        event.preventDefault()
        const response = await fetch('http://localhost:5000/api/admin/login', {
            method: 'post',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            }),
        })

        const data = await response.json()
        console.log(data);
        if (data.admin) {
            alert('login Successfull')
            localStorage.setItem('admintoken', data.admin)
            navigate('/adminHome')
        } else {
            alert('please Check login details ')
        }
    }
    useEffect(() => {
        let admintoken = localStorage.getItem('admintoken')
        if (admintoken) {
          navigate('/adminHome')
        } else {
          navigate('/admin')
        }
      }, [])


    return (

        <div className='regiseterForm d-flex justify-content-center' >
            <>
                {[
                    'Light'
                ].map((variant) => (
                    <Card
                        bg={variant.toLowerCase()}
                        key={variant}
                        text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                        style={{ width: '18rem' }}
                        className="mb-2 mt-5"
                    >
                        <Card.Body >
                            <Card.Title> ADMIN LOGIN  </Card.Title>
                            <Card.Text>

                                <Form onSubmit={loginAdmin} className='mt-5'>
                                    <Form.Group size="lg" className='' controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="email"
                                            placeholder='Email'
                                            required />
                                    </Form.Group>
                                    <Form.Group size="lg" controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            type="password"
                                            placeholder='Password'
                                            required />
                                    </Form.Group>
                                    <Button className='mt-3' block="true" size="lg" type="submit" >
                                        Login
                                    </Button>
                                </Form>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </>
        </div>
    );
}

export default AdminLogin