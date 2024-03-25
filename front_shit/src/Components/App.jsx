import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React, { useEffect } from "react";
import useToken from "./useToken";
import Profile from "./Home/Profile"
import Header from './Header/Header';
import Login from './Login/Login';
import axio from "axios";
import Signup from "./SignUp/Signup";
import Home from "./Home/Home";


export default function Shop() {
    const { token, removeToken, setToken } = useToken();
  
    return (
      <BrowserRouter>
        <div className="App">
          <Header token={removeToken}/>
          {!token && token!=="" &&token!== undefined?  
          <>
          <h1>login</h1>
          <Login setToken={setToken} />

          <h1>signup</h1>
          <Signup/>
          </>
          :(
            <>
              <Routes>
                <Route exact path="/profile" element={<Profile token={token} setToken={setToken}/>}></Route>
              </Routes>
            </>
          )}
          <Routes>
          <Route path="/" element={<Home/>} /> 
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
  