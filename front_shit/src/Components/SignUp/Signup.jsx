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
        <div className="input-group mb-3">
  <span className="input-group-text" id="inputGroup-sizing-default">Username</span>
  <input type="email" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" name="userNam" onChange={credChg}/>
</div>
            
            <div className="input-group mb-3">
  <span className="input-group-text" id="inputGroup-sizing-default">Email</span>
  <input type="email" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" name="userEmail" onChange={credChg}/>
</div>


<div className="input-group mb-3">
  <span className="input-group-text" id="inputGroup-sizing-default">Password</span>
  <input type="email" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" name="userPass" onChange={credChg}/>
</div>
            
<button type="button" className="btn btn-primary btn-sm" onClick={pwnUser}>Sign Up</button>

            
        </>
    )
}