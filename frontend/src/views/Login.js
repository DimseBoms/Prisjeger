import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import backendApi from "../axios/backendApi";
import axios from '../axios/axiosPostInit';
import ck from 'cookie'
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
/*
    async function loginSjekk1(postObjekt) {
    axios.post('http://localhost:6969/api/login', postObjekt, {
      

 headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000"
     },
   baseURL:  "http://localhost:6969/api/"
})
.then(response => {
  console.log('Success ', response)
})
.catch(function(error) {
  console.log('Error ', error)
});*/
    

   //kilde for logikk for å sette og hente localstorage
    async function loginSjekk(postObjekt) {
      backendApi.testcoookie()

      console.log("loginsjekker")
      axios.post(`/login`, postObjekt ).then(response => {

        console.log(response)
        if(response.data.melding === 'innlogget'){
          console.log(response)
          localStorage.setItem('token', response.data.bruker)  
          backendApi.lagCookie(epost)
       // document.cookie = 'bruker='+epost
               //  response.data.bruker
          alert('logget inn')
          //window.location.href = '/dashboard'
        }
        else(alert('feil info'))
      //  return response;
      });
    } 



    async function logUt(event){
      event.preventDefault();
      console.log('lgoger ut')
      if(localStorage.getItem('token')){
     alert('logget ut')
        localStorage.removeItem('token')  
        backendApi.logut()
    }
    else{
      alert('du er ikke logget inn')
    }
    }

    async function handleSubmit(event) {
      event.preventDefault();
      try{
       // document.cookie = {epost, passord};
      if(epost.length > 0 && passord.length > 0 && !localStorage.getItem('token')){
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
      <form > 
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email"
        value={epost}
        onChange={(e) => setEpost(e.target.value)}
    className="form-control" 
    id="inputEmail"    
  aria-describedby="emailHelp"></input>
  </div>

  <div className="mb-3">
    <label htmlFor="pw" class="form-label">Passord</label>
    <input type="password" 
    value={passord}
    onChange={(e) => setPassord(e.target.value)}
    className="form-control" 
    id="inputPassword"></input>
  </div>



  <button  onClick={handleSubmit} 
  type="submit" class="btn btn-primary">Logg in
  </button>
  
  <button             
                      onClick={logUt} 
                      className="btn btn-primary">
                    logg ut                 
  </button>
  
</form>
</CardBody>
    </Card>
      </div>
  
    );
  
  }
    
  
  
  
    