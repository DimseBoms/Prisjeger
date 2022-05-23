import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import backendApi from "../axios/backendApi";
import axios from '../axios/axiosInit';

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
  
  
  
  export default function Login()  {
  	
    const [epost, setEpost] = useState("");

    const [passord, setPassord] = useState("");
    const [data, setData]= useState("");
    function validateForm() {
  
      return epost.length > 0 && passord.length > 0;
  
    }
  
    async function loginSjekk(postObjekt) {
      console.log("loginsjekker")
      axios.post(`/login`, postObjekt).then(response => {
        console.log(response.data.bruker)
        if(response.data.melding === 'innlogget'){
          localStorage.setItem('token', response.data.bruker)  
        //  response.data.bruker
          console.log(data)
          alert('logget inn')
          //window.location.href = '/dashboard'
        }
        else(alert('feil'))
        return response;
      });
    } 


    async function handleSubmit(event) {
      event.preventDefault();
      try{
      if(epost.length > 0 && passord.length > 0){
  const bruker = {
    epost: epost,
    passord: passord
  }
      loginSjekk(bruker)
    /*
    .then(response => {
      console.log(response.data.bruker)
      if(response.data.melding==='innlogget'){
        alert('innlogget')
      }
      
  });*/


  //  const sjekk  =   backendApi.loginSjekk(bruker);

      }
      else{
        console.log('feil i input')
      }


  }
  catch(err){}
}     


    return (
  
      <div className="content">

     <Card>
       <CardHeader>Innlogging</CardHeader>
        <CardBody>
      <form onSubmit={handleSubmit}> 
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email"
        value={epost}
        onChange={(e) => setEpost(e.target.value)}
    class="form-control" 
    id="inputEmail"    
  aria-describedby="emailHelp"></input>
  </div>

  <div class="mb-3">
    <label for="pw" class="form-label">Passord</label>
    <input type="password" 
    value={passord}
    onChange={(e) => setPassord(e.target.value)}
    class="form-control" 
    id="inputPassword"></input>
  </div>



  <button  type="submit" class="btn btn-primary">Logg in</button>
  
</form>
</CardBody>
    </Card>
      </div>
  
    );
  
  }
    
  
  
  
    