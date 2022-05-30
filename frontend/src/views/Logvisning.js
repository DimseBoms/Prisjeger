/*
Komponent/side som viser loggen
*/
//Tore Broberg
import backendApi from "../axios/backendApi";
import { useHistory } from 'react-router-dom'
import {useState} from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Col,
  } from "reactstrap";
  

export default function Logvisning()  {
    const history = useHistory()
    const [logOutput, setOutput] = useState();

backendApi.sjekkAdmin().then(response=> {
    if(response.data === '!OK'){
      alert('kun administrator har tilgang til denne siden')
      history.push('/dashboard')
    }   else{
  backendApi.hentLogg().then(response => {  
   
    setOutput(response.data) 
    })
  }
  })
 




return(
    <div className="content">

     <Card>
       
       <CardHeader>Log</CardHeader>
       
        <CardBody>
        
       <Col> {logOutput} </Col> 
        
        </CardBody>
 
  </Card>
 
 
 
  </div>



  );




}

