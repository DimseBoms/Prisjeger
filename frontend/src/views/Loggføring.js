import React from "react";
import BackendApi from "../axios/backendApi";
import { useState } from "react";
import { useEffect } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  Button,
  UncontrolledDropdown,
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem,
  Label,
  Fade
} from "reactstrap";
import backendApi from "../axios/backendApi";
import { convertToObject, factory } from "typescript";

function Loggføring() {

const [nivå, setnivå] = useState("velg Log-nivå")
const  [logStatus, setStatus] = useState(false)
const nivåer = ['info','error', 'warn', 'verbose', 'silly' ];


async function sendStatus(){
try{
   backendApi.getLogStatus(nivå,logStatus).then(res=>{
    console.log(res)
  })
}

catch(err){
  console.log(err)
}
}


async function handleClick(){
  console.log('håndterer klikk')
if (logStatus === false ){
  setStatus(true)
console.log(logStatus)
}
else {
  setStatus(false) 
  console.log(logStatus)
}
}


return (
    <div className="content">



    <Card>

<Row className="justify-content-center">
<UncontrolledDropdown size="sm">
  <DropdownToggle caret>{'velg nivå'}</DropdownToggle>
  <DropdownMenu>
    <DropdownItem header>Velg Nivå :</DropdownItem>
    <DropdownItem onClick={() =>setnivå(nivåer[0])}>{nivåer[0]}</DropdownItem>
    <DropdownItem onClick={() =>setnivå(nivåer[1])}>{nivåer[1]}</DropdownItem>
    <DropdownItem onClick={() =>setnivå(nivåer[2])}>{nivåer[2]}</DropdownItem>
    <DropdownItem onClick={() =>setnivå(nivåer[3])}>{nivåer[3]}</DropdownItem>
    <DropdownItem onClick={() =>setnivå(nivåer[4])}>{nivåer[4]}</DropdownItem>
  </DropdownMenu>
</UncontrolledDropdown>
</Row>
<Row className="justify-content-center">

                   <Button
                      onClick={() =>setStatus(true)} 
                      color="danger" 
                      size="sm">
                        Skru av logger
                  
           </Button>
           
           <Button
                      onClick={() =>setStatus(false)} 
                      color="success" 
                      size="sm">
                        Skru på logger
                  
           </Button>
   
                 </Row>
</Card>
<Card> 
<Row className="justify-content-center">
<Button onClick={()=> sendStatus()}> lagre innstillinger</Button>
</Row>
</Card>
</div>
) 


}


export default Loggføring;