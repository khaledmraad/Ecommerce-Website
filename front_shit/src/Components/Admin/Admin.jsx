import React from "react";
import CreateItem from "./CreateItem/CreateItem";
import DeleteItem from "./DeleteItem/DeleteItem";
import UpdateItem from "./UpdateItem/UpdateItem";


export default function Admin(){
    return (
        <>

<div className="container-fluid">
    <div className="row d-flex justify-content-center">
        <div className="col-md-10">
            <div className="card my-2">
                <div className="card-header">dsfkjqsdfqs</div>

                <div className="card-body">
                        <div className="alert alert-success" role="alert">
                            dsfdkf
                        </div>

                    
                    <div className="border rounded shadow-sm  p-2  ">
                        kljdsnjqdngklsjqng
                    </div>
                    <br/>
                    <br/>

                    <div className="border rounded shadow-sm  p-2 ">
                    </div>
                    <div className="border rounded shadow-sm  p-2 my-2">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
            <CreateItem/>

            <br/>
            <DeleteItem/>
            <br/>
            <UpdateItem/>
        </>
    )
}