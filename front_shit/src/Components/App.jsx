import React, { useState } from "react";
import Login from "./Login/Login";
import Signup from "./SignUp/Signup";
import { BrowserRouter,Routes,Route ,NavLink} from "react-router-dom";
import Home from "./Home/Home";
import Admin from "./Admin/Admin";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";



export default function App(){

    return (
        <>
        <BrowserRouter>
        <header>
            <NavLink to="signup" >SignUp</NavLink>
            <NavLink to="login">LogIn</NavLink>
            <NavLink to="admin">Admin</NavLink>
        </header>
            <main>
                <Routes>
                    <Route path="signup" element={<Signup/>} />
                    <Route path="login" element={<Login/>} />
                    <Route path="admin" element={<Admin/>} />
                    <Route path="/" element={<Home/>} />

                    

                </Routes>
            </main>
        </BrowserRouter>
        
        </>
    )
}