import React from "react";
import CreateItem from "./CreateItem/CreateItem";
import DeleteItem from "./DeleteItem/DeleteItem";
import UpdateItem from "./UpdateItem/UpdateItem";


export default function Admin(){
    return (
        <>
            <CreateItem/>
            <br/>
            <DeleteItem/>
            <br/>
            <UpdateItem/>
        </>
    )
}