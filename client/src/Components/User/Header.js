
import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


function Header() {
    let navigate=useNavigate()
    function logOut(){
        localStorage.removeItem('token')
        navigate('/')
    }
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand >Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {/* <Nav.Link href="#home">Home</Nav.Link> */}
                            {/* <Nav.Link >Logout</Nav.Link> */}
                            <Button variant="danger" onClick={logOut}>Logout</Button>
                           
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header