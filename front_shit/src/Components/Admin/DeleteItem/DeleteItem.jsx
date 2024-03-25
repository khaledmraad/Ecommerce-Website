import React,{useState} from "react";
import axios from "axios";


export default function DeleteItem(){

    const [itemRef,setItemRef]=useState("");


    async function deleteItemRef(){
        try{
            await axios.post("http://localhost:5000/delete_item",{itemRef})
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
            <input type="text" onChange={(e)=> {setItemRef(e.target.value);console.log(itemRef)}}/>
            <button onClick={deleteItemRef}>Delete that shit</button>
        </>
    )
}