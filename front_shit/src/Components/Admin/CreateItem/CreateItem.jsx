import React,{useState} from "react";
import axios from "axios";



export default function CreateItem(){


    const [itemCred,setItemCred]=useState({
        ref:"",
        image_url:"",
        price:"",
        item_name:"",
        factory_name:"",
        specs:"",
        quantity:"",
        detailed_desc:""

    })


    function prodChg(event){
        console.log(itemCred);
        var {value,name}=event.target;
        setItemCred((prevValue)=>{
            return {
                ...prevValue,
                [name]:value
            }

        })
    }



    async function pwnItem(event){
        try{
                await axios.post("http://localhost:5000/add_shop_item",itemCred)
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
            <input type="text" placeholder="ref" name="ref" onChange={prodChg}/>
            <br/>
            <br/>
            <input type="text" placeholder="image url" name="image_url" onChange={prodChg}/>
            <br/>
            <br/>

            <input type="text" placeholder="price" name="price" onChange={prodChg}/>
            <br/>
            <br/>
            <input type="text" placeholder="name" name="item_name" onChange={prodChg}/>
            <br/>
            <br/>
            <input type="text" placeholder="factory" name="factory_name" onChange={prodChg}/>
            <br/>
            <br/>
            <input type="text" placeholder="specs" name="specs" onChange={prodChg}/>
            <br/>
            <br/>

            <input type="text" placeholder="quantity" name="quantity" onChange={prodChg}/>
            <br/>
            <br/>
            <input type="text" placeholder="detailed dicription" name="detailed_desc" onChange={prodChg}/>
            <br/>
            <br/>

            <button onClick={pwnItem}>Add Item to stock</button>
        </>
    )
}