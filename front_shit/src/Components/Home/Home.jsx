import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React, { useEffect } from "react";
import useToken from "../useToken";
import Profile from "./Profile";
import Login from '../Login/Login';
import axio from "axios";
import { useNavigate } from 'react-router-dom';



export default function Shop() {
  
  const navigate = useNavigate();

  const redir = () => {
    navigate('/profile');
  };



    return (
      <>
      <h1>this is home </h1>
      <button onClick={redir}>profile</button>
      </>
    );
  }
  