import React, { useState } from "react";
import Login from "./Login/Login";
import Signup from "./SignUp/Signup";



export default function App(){


    const [loggedin,setLoggedin]=useState(false);

    return (
        <>
        <button onClick={e=>setLoggedin(true)}>LogIn</button>
        <button onClick={e=>setLoggedin(false)}>SignUp</button>
        <br/>
        <br/>
        {loggedin ? <Login></Login> : <Signup></Signup>}
        </>
    )
}