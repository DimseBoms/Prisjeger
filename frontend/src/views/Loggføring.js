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
  Label
} from "reactstrap";
import backendApi from "../axios/backendApi";
import { useTranslation } from 'react-i18next';

function Loggføring() {

const { t, i18n } = useTranslation();
const [nivå, setnivå] = useState("velg Log-nivå")
const  [logStatus, setStatus] = useState(true)
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

function handleClick(){

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
                      value={statusTxt}
                      onClick={() =>setStatus(false)} 
                      color="success" 
                      size="sm">
                        {t('turn_off_logger')}
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