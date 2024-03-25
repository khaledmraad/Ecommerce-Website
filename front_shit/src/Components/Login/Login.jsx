import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Input/Button";
import axios from "axios";



export default function Login(props){

    const [loginForm, setloginForm] = useState({
        username: "",
        password: ""
    })

    function logMeIn(event) {
        axios({
        method: "POST",
        url:"http://localhost:5000/token",
        data:{
            username: loginForm.username,
            password: loginForm.password
        }
        })
        .then((response) => {
            console.log(response.data.access_token);
        props.setToken(response.data.access_token)
        }).catch((error) => {
        if (error.response) {
            alert(error.response.data)
            }
        })

        setloginForm(({
        username: "",
        password: ""}))

        event.preventDefault()
    }

    function handleChange(event) { 
        const {value, name} = event.target
        setloginForm(prevNote => ({
            ...prevNote, [name]: value})
        )}

    return (
        <div>
        <h1>Login</h1>
            <form className="login">
            <input onChange={handleChange} 
                    type="text"
                    text={loginForm.username} 
                    name="username" 
                    placeholder="user name" 
                    value={loginForm.username} />
            <input onChange={handleChange} 
                    type="password"
                    text={loginForm.password} 
                    name="password" 
                    placeholder="Password" 
                    value={loginForm.password} />

            <button onClick={logMeIn}>Submit</button>
        </form>
        </div>
    );

    
}
