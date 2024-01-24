import React, { useEffect } from "react";
import axio from "axios";


export default function Shop(props){

    async function get_shop_items(){
        try {
            await axio.get("http://localhost:5000/get_shop_item")
            .then((res)=>{
                console.log(res.data);
                console.log("kjdfshdf");
            })
            }
            catch(error){
                console.log("erroorrrrr",error);
            }
    }

    useEffect(()=>{
        get_shop_items();
        
    })


    return (
        <h1>{window.localStorage.getItem("my_name")}</h1>
    )
}