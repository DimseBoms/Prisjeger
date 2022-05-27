import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import backendApi from "../axios/backendApi";
import axios from '../axios/axiosPostInit';
import { useTranslation } from 'react-i18next';

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

    const { t, i18n } = useTranslation();
    const [epost, setEpost] = useState("");

    const [passord, setPassord] = useState("");
    const [data, setData]= useState("");
    function validateForm() {
  
      return epost.length > 0 && passord.length > 0;
  
    }
  
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
       <CardHeader>{t('SIGN_IN')}</CardHeader>
        <CardBody>
      <form onSubmit={handleSubmit}> 
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">{t('email')}</label>
    <input type="email"
        value={epost}
        onChange={(e) => setEpost(e.target.value)}
    class="form-control" 
    id="inputEmail"    
  aria-describedby="emailHelp"></input>
  </div>

  <div class="mb-3">
    <label for="pw" class="form-label">{t('password')}</label>
    <input type="password" 
    value={passord}
    onChange={(e) => setPassord(e.target.value)}
    class="form-control" 
    id="inputPassword"></input>
  </div>




  <button  onClick={handleSubmit} 
  type="submit" class="btn btn-primary">{t('SIGN_IN')}
  </button>
  
  <button             
                      onClick={logUt} 
                      className="btn btn-primary">
                    {t('SIGN_OUT')}                 
  </button>
  
</form>
</CardBody>
    </Card>
      </div>
  
    );
  
  }
    
  
  
  
    