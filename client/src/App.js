import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Profile from "./pages/Profile";
import Register from './pages/Register'
import './App.css'
import AdminLogin from "./pages/Admin/Login"; 
import AdminHome from './pages/Admin/AdminHome'
import EditUser from './pages/Admin/EditUser'
import UserData from './Context/UserData'
import AddUser from './pages/Admin/AddUser'


const App = () => {
    return (
        <div>
            <UserData>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/admin" element={<AdminLogin />} />
                        <Route path="/adminHome" element={<AdminHome />} />
                        <Route path="/editUSer" element={<EditUser/>}/>
                        <Route path="/addUser" element={<AddUser/>}/>
                    </Routes>
                </BrowserRouter>
            </UserData>
        </div>
    )
}

export default App