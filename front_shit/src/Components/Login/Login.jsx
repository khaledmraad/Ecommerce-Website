import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Input/Button";
import axios from "axios";


export default function Login(){

    const [userInput,setUserInput]=useState({
        userName:"",
        userPass:""
    });

    function loginChg(event){
        const {value,name}=event.target;
        setUserInput((prevValue)=>{
            return {
            ...prevValue,
            [name]:value
            }
        })
    }

    async function checkUser(event){
        try{
            await axios.post("http://localhost:5000/login",userInput)
            .then((res)=>{
                console.log(res);
                if (res.status==200){
                    window.alert(res.data);
                }
            });

        }

        catch(error){
            console.log("erooorrrrrrr",error);
        }
        

    }


    return (
        <>
        {/* TDOO : change this to form */}
        <input type="text" placeholder="username"  name="userName" onChange={loginChg}/>
        <br/>
        <br/>
        <input type="password" placeholder="password" name="userPass" onChange={loginChg} />
        <br/>
        <br/>
        <button onClick={checkUser} >LogIn</button>

        </>
    )
}