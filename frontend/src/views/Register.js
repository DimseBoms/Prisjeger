import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import BackendApi from "../axios/backendApi";
import jwt from 'jsonwebtoken'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
  } from "reactstrap";
  
  
  
  export default function Register() {
   
   
    const history = useHistory()


     const [epost, setEpost] = useState("");
     const [brukerNavn, setBruker] = useState("");
     const [passord, setPassord] = useState("");
    
  
  async function handleSubmit(event) {
        event.preventDefault();

 //   console.log(brukerVar);
        try{
        if(epost.length > 0 && passord.length > 0){
    const bruker = {
      epost: epost,
      passord: passord
    }
          BackendApi.postTest(bruker);
 
        }
        else{
          console.log('feil i input')
        }


    }     

        
        
catch(err){
  console.log(err)
}  
}
  

  
   
  
    return (
  
      <div className="content">

     <Card>
       <CardHeader>Registrering</CardHeader>
        <CardBody>
      <form onSubmit={handleSubmit}> 
 
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="text"
        value={epost}
        onChange={(e) => setEpost(e.target.value)}
    class="form-control" 
    id="inputEmail"    
  aria-describedby="emailHelp"></input>
  </div>
 
  <div class="mb-3">
    <label for="eksempel" class="form-label">Brukernavn</label>
    <input type="epost" 
    value={brukerNavn}
    onChange={(e) => setBruker(e.target.value)}
    class="form-control" 
    id="inputBruker"></input>
  </div>

  <div class="mb-3">
    <label for="exampleInputPassword" class="form-label">Password</label>
    <input type="password" 
    value={passord}
 onChange={(e) => setPassord(e.target.value)}
    class="form-control" 
    id="inputPassword"></input>
  </div>
 




  <button  type="submit" class="btn btn-primary">Registrer</button>
  
</form>
</CardBody>
    </Card>
      </div>
  
    );
  
  }
    
  
  
  
