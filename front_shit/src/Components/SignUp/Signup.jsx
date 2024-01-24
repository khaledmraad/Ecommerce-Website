import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Input/Button";
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function Signup(){

    const [userCred,setUserCred]=useState({
        userNam:"",
        userEmail:"",
        userPass:""
    })


    function credChg(event){
        console.log(userCred);
        var {value,name}=event.target;
        setUserCred((prevValue)=>{
            return {
                ...prevValue,
                [name]:value
            }

        })
    }


    async function pwnUser(event){
        try{
                await axios.post("http://localhost:5000/signup",userCred)
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


    return(
        <>
        {/* TDOO : change this to form */}
            <input type="text" placeholder="username" name="userNam" onChange={credChg}/>
            <br/>
            <br/>
            <input type="email" placeholder="email" name="userEmail" onChange={credChg}/>
            <br/>
            <br/>

            <input type="text" placeholder="password" name="userPass" onChange={credChg}/>
            <br/>
            <br/>

            <button val="SignUp" onClick={pwnUser}>SignUp</button>
            
        </>
    )
}