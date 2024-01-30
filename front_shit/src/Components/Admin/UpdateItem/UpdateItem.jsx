import React,{useState} from "react";
import axios from "axios";

export default function UpdateItem(){

    const [itemRef,setItemRef]=useState("");
    const [responseSend,setResponseSend]=useState(false);

    const [response,setResponse]=useState();

    const [updatedData, setUpdatedData] = useState({});

    function itemAllInfo(apiResponse){

        let x=Array();
        
        let keys =Object.keys(apiResponse);

        console.log(apiResponse);
        return Object.keys(apiResponse).map((key,i)=>{
            return (<div  key={i}>
                <label>{key}
            <input type="text" value={apiResponse[key]} name={key} onChange={(e) => handleInputChange(e, key)}/>
            </label>
            </div>)
            
        })  

    }

    function handleInputChange(e, key) {
        setUpdatedData({
          ...updatedData,
          [key]: e.target.value,
        });
    }

    async function updateThis() {

        try {
          await axios.post("http://localhost:5000/updateInfo", updatedData)
          .then((res)=>{
            console.log(res);
            if (res.status==200){
                window.alert(res.data);
            }
        });
        } 
        catch (error) {
          console.log("reoorrroro", error);
        }
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
                setResponse(res.data);
                setResponseSend(true);

            }
        });
        
    }
    
    catch(error){
        console.log("erooorrrrrrr",error);
        setResponseSend(false);
    }

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
                setResponse(res.data);
                setResponseSend(true);

            }
        });
        
    }
    
    catch(error){
        console.log("erooorrrrrrr",error);
        setResponseSend(false);
    }

    }


    return (
        <>  
        <input type="text" onChange={(e)=>{setItemRef(e.target.value)}}/>
        <button onClick={get_info}>get Item Details</button>
        {responseSend ? itemAllInfo(response):<></>}
        {responseSend ? <button onClick={updateThis}>UPDATE</button>   :<></>}
        
        </>
    )
}