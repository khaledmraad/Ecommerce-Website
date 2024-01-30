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
            if(error.response.status==302){
                let the_name=error.response.data.name;
                console.log(the_name);
                window.localStorage.setItem("my_name",the_name );

            }
            console.log("erooorrrrrrr",error);
        }
        

    }


    return (
        <>
        {/* TDOO : change this to form */}
        <div className="container-sm">100% wide until small breakpoint</div>
<div className="container-md">100% wide until medium breakpoint</div>
<div className="container-lg">100% wide until large breakpoint</div>
<div className="container-xl">100% wide until extra large breakpoint</div>
<div className="container-xxl">100% wide until extra extra large breakpoint</div>
        <div className="input-group mb-3">
  <span className="input-group-text" id="inputGroup-sizing-default">Username</span>
  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" name="userName" onChange={loginChg}/>
</div>

<div className="input-group mb-3">
  <span className="input-group-text" id="inputGroup-sizing-default">Password</span>
  <input type="password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" name="userPass" onChange={loginChg}/>
</div>
<button type="button" className="btn btn-primary btn-sm" onClick={checkUser}>LogIn</button>
        

        </>
    )
}
