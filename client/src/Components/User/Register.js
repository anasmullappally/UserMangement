
import { useState ,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'


// import './App.css';

function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  useEffect(() => {
    let token = localStorage.getItem('token')
    if (token) {
        navigate('/profile')
    } else {
        navigate('/register')
    }
}, [])
  async function registerUser(event) {
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
      navigate('/', { replace: true })
    }
  }


  return (
    <div className='regiseterForm d-flex justify-content-center '>
      {/* <p className='register'>REGISTER</p> */}
      {/* <form onSubmit={registerUser}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder='Name'
        />
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder='Email'
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder='Password' />
        <br />
        <button type='submit'>Register</button>
      </form> */}



      <>
        {[

          'Secondary',


        ].map((variant) => (
          <Card
            bg={variant.toLowerCase()}
            key={variant}
            text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
            style={{ width: '18rem' }}
            className="mb-2 mt-5"
          >

            <Card.Body >
              <Card.Title> REGISTER </Card.Title>
              <Card.Text>
                
                <Form onSubmit={registerUser} className='mt-5'>
                <Form.Group size="lg" className='' controlId="email">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      autoFocus
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder='Name'
                    />
                  </Form.Group>
                  <Form.Group size="lg" className='' controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      autoFocus
                      type="email"
                      value={email}
                      placeholder='Email'
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      placeholder='Password'
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button className='mt-3' block="true" size="lg" type="submit" >
                    Register
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

export default Register;
