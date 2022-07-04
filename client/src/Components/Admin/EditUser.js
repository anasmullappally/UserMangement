import React, { useContext, useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../Context/UserData';

function EditUser() {
  const navigate = useNavigate();
  useEffect(() => {
    let admintoken = localStorage.getItem('admintoken')
    if (admintoken) {
      navigate('/editUSer')
    } else {
      navigate('/admin')
    }
  }, [])
  const { userDetails } = useContext(userContext);
  const [name, setName] = useState(userDetails.name);
  const [email, setEmail] = useState(userDetails.email);
  let id = userDetails._id;
  async function handleEdit() {
    const response = await fetch('http://localhost:5000/api/admin/editUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        id,
      }),
    });
    let data = await response.json();
    if (data.status === 'ok') {
      navigate('/adminHome');
      alert('User Updated succesfully');
    } else {
      alert('some issus fount');
    }
  }
 

  if (userDetails === '') {
    navigate('/adminHome');
  }

  return (
    <div className="row">
      <Card className="col-md-8 mx-auto mt-2">
        <Card.Header as="h5">Edit user</Card.Header>
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
            type="text"
            id="inputPassword5"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            aria-describedby="passwordHelpBlock"
            required
          />
          <Button variant="primary" onClick={handleEdit}>
            Edit
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default EditUser;