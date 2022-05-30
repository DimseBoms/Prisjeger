/*
Komponent som innehar funksjonalitet for å sette innstillinger for loggeren
*/
//Tore broberg 

import React from "react";
import BackendApi from "../axios/backendApi";
import { useState } from "react";
import { useEffect } from "react";

// reactstrap components
import {
  Card,
  Row,
  Button,
  UncontrolledDropdown,
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem,
} from "reactstrap";
import backendApi from "../axios/backendApi";
import { useTranslation } from 'react-i18next';

function Loggføring() {

const { t, i18n } = useTranslation();
const [nivå, setnivå] = useState("velg Log-nivå")
const  [logStatus, setStatus] = useState(false)
const [statusTxt, setStatusTxt] = useState(['skru av ', 'skru på']);
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

</Card>

    <Card>

<Row className="justify-content-center">
<UncontrolledDropdown size="sm">
  <DropdownToggle caret>{t('choose_tier')}</DropdownToggle>
  <DropdownMenu>
    <DropdownItem header>{t('choose_tier')}</DropdownItem>
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
                  {t('turn_off_logger')}
           </Button>

                   <Button 
                      value={statusTxt}
                      onClick={() =>setStatus(false)} 
                      color="success" 
                      size="sm">
                        {t('turn_on_logger')}
                    </Button>
                 </Row>
</Card>
<Card> 
<Row className="justify-content-center">
<Button onClick={()=> sendStatus()}> {t('save_settings')}</Button>
</Row>
</Card>
</div>
)


}


export default Loggføring;