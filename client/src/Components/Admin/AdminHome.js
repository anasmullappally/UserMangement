import React, { useEffect, useState, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { decodeToken } from 'react-jwt';
import { useNavigate } from 'react-router-dom'
import { userContext } from '../../Context/UserData'


function AdminHome() {
    const { setUserDetails } = useContext(userContext)
    const navigate = useNavigate()
    const [userData, setUserData] = useState([])
    const userdetails = async () => {
        const req = await fetch('http://localhost:5000/api/admin/userDetails', {
            headers: {
                'x-access-token': localStorage.getItem('admintoken')
            }
        })
        const data = await req.json()
        if (data.status === 'ok') {
            // console.log('ok');
            setUserData(data.userData)
        } else {
            console.log('not okey');
            setUserData('no user fount')
        }
    }
    async function handleDelete(id) {
        let response = window.confirm('are you sure to delete')
        if (response === true) {
            await fetch('http://localhost:5000/api/admin/deleteUser', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                })
            })
        }

    }
    useEffect(() => {
        const admintoken = localStorage.getItem('admintoken')
        if (admintoken) {
            const admin = decodeToken(admintoken)
            // console.log(admin);
            if (!admin) {
                console.log('not admin present here');
                localStorage.removeItem('admintoken')
                navigate('/admin')
            } else {
                userdetails()
            }
        }else{
            navigate('/admin')
        }
    }, [handleDelete])

    function manageAdd(e) {
        e.preventDefault()
        navigate('/addUser')
    }
    return (
        <div className='row'>
            <div className='mx-auto col-md-2 col-4 mb-2'>
                <button className='btn btn-primary' type='button' onClick={(e) => manageAdd(e)}>Add user</button>
            </div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Sl No</th>
                        <th> Name</th>
                        <th>Email</th>
                        <th>edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((item, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td ><Button onClick={() => {
                                    setUserDetails(item)
                                    navigate('/editUser')
                                }} className='btn btn-success'>Edit</Button></td>
                                <td ><Button className='btn btn-danger' onClick={() => handleDelete(item._id)}>Delete</Button></td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>
        </div>
    )
}

export default AdminHome
