import React,{useState} from "react";
import axios from "axios";

export default function UpdateItem(){

    const [itemRef,setItemRef]=useState("");

    var response;
    var respnseSend=false;
    function itemAllInfo(apiResponse){

        return(
            <input type="text" value="sdjfmsj"/>
        )

    }
    async function get_info(e){

        let itemSearch={
            ref:itemRef
        };

        try{
            await axios.post("http://localhost:5000/getInfo",itemSearch)
        .then((res)=>{
            console.log(res);
            if (res.status==200){
                window.alert(res.data);
                response=res.data;
                respnseSend=true;
            }
        });

    }

    catch(error){
        console.log("erooorrrrrrr",error);
    }

    }


    return (
        <>  
        <input type="text" onChange={(e)=>{setItemRef(e.target.value)}}/>
        <button onClick={get_info}>get Item Details</button>
        {respnseSend ? itemAllInfo(response):null}
        </>
    )
}