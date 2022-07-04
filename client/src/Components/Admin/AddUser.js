import React, { useState ,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom'

function AddUser() {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function addUser(event) {
    event.preventDefault()
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'post',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      }),
    })

    const data = await response.json()
    if (data.status === 'ok') {
      alert('User Added Successfully')
      navigate('/adminHome')
    } else {
      alert('User already Exist')
    }
  }
  useEffect(() => {
    let admintoken = localStorage.getItem('admintoken')
    if (admintoken) {
      navigate('/addUser')
    } else {
      navigate('/admin')
    }
  }, [])


  return (
    <div className="row">
      <Card className="col-md-8 mx-auto mt-2">
        <Card.Header as="h5">Add User</Card.Header>
        <Card.Body>
          <Form.Label htmlFor="inputPassword5">User Name</Form.Label>
          <Form.Control
            type="text"
            id="inputPassword5"
            onChange={(e) => setName(e.target.value)}
            value={name}
            aria-describedby="passwordHelpBlock"
            required
          />
          <Form.Label className="mt-4" htmlFor="inputPassword5">
            Email address
          </Form.Label>
          <Form.Control
            type="email"
            id="inputPassword5"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            aria-describedby="passwordHelpBlock"
            required
          />
          <Form.Label className="mt-4" htmlFor="inputPassword5">
            Password
          </Form.Label>
          <Form.Control
            type="password"
            id="inputPassword5"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            aria-describedby="passwordHelpBlock"
            required
          />
          <Button variant="primary" className='mt-3' onClick={addUser}>
            ADD USER
          </Button>
        </Card.Body>
      </Card>
    </div>
  )
}
export default AddUser