import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import BackendApi from "../axios/backendApi";
import axios from '../axios/axiosPostInit'
import jwt from 'jsonwebtoken'
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
  
  
  
  export default function Register() {
   
    const { t, i18n } = useTranslation();
    const history = useHistory()

    BackendApi.testcoookie()

     const [epost, setEpost] = useState("");
     const [brukerNavn, setBruker] = useState("");
     const [passord, setPassord] = useState("");
    
     async function  postReg(postObjekt) {
      console.log("Startet postTest()")
      axios.post(`/reg`, postObjekt).then(response => {
          console.log(response)
      });
    } 
  
  async function handleSubmit(event) {
        event.preventDefault();

 //   console.log(brukerVar);
        try{
        if(epost.length > 0 && passord.length > 0){
    const bruker = {
      epost: epost,
      passord: passord
    }
    postReg(bruker);
 
        }
        else{
          alert('feil i input')
        }


    }     

        
        
catch(err){
  console.log(err)
}  
}
  

  
   
  
    return (
  
      <div className="content">

     <Card>
       <CardHeader>{t('REGISTRER')}</CardHeader>
        <CardBody>
      <form onSubmit={handleSubmit}> 
 
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">{t('email')}</label>
    <input type="text"
        value={epost}
        onChange={(e) => setEpost(e.target.value)}
    class="form-control" 
    id="inputEmail"    
  aria-describedby="emailHelp"></input>
  </div>
 
  <div class="mb-3">
    <label for="eksempel" class="form-label">{t('username')}</label>
    <input type="epost" 
    value={brukerNavn}
    onChange={(e) => setBruker(e.target.value)}
    class="form-control" 
    id="inputBruker"></input>
  </div>

  <div class="mb-3">
    <label for="exampleInputPassword" class="form-label">{t('password')}</label>
    <input type="password" 
    value={passord}
 onChange={(e) => setPassord(e.target.value)}
    class="form-control" 
    id="inputPassword"></input>
  </div>
 




  <button  type="submit" class="btn btn-primary">{t('REGISTRER')}</button>
  
</form>
</CardBody>
    </Card>
      </div>
  
    );
  
  }
    
  
  
  
