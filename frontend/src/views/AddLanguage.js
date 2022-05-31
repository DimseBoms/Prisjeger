/* 
Målet i denne filen var å kunne hente JSON fra public/locales/translation/en
for å bruke den som en mal når admin vil legge til nytt språk. Det var 
tenkt at man deretter skulle kunne lagre denne JSON-fila og legge den tilbake i
filstrukturen. Det viste seg at react ikke tillater å endre i filstruktur. Vi kunne ordnet dette
ved å legge translation-filene i backend og hente de via server, men da vi fant ut av dette
var det for sent å omstrukturere. Denne fila er derfor ikke fullført, men vi tenkte at vi ville
vise hva vi hadde tenkt til å gjøre.

Gaute Hermansen
**/
/*eslint-disable*/
import React from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
// reactstrap components
import {
  UncontrolledAlert,
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  TextField,
  Input,
  Form,
  Label,
  FormGroup

} from "reactstrap";

//import data from '/translation.json'

function addLanguage() {  
  const data = {"REGISTRER" : "Register",
                "email" : "email adress",
                "username" : "username",
                "password" : "password",}
  
  return (
    <>
      <div className="content">
        <Row>
          <Col md="10">
            <Card >
              <CardHeader>
                <CardTitle tag="h5">Legg til språk</CardTitle>
                </CardHeader>
                  <CardBody>
                    <Form>
                      <FormGroup>
                      <Input
                          type="textfield"
                          placeholder="lng code"
                        /><Input
                        type="textfield"
                        placeholder="language name"
                      />
                      <Input
                          type="textfield"
                          placeholder="country code"
                        />
                        <Input
                        style={{minHeight : 700}}
                          defaultValue = {JSON.stringify(data, null, 2)}
                          type="textarea"
                        />
                        <Button>
                          Gjenopprett fil
                        </Button>
                        <Button>
                          Legg til språk
                        </Button>
                      </FormGroup>
                    </Form>
                  </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default addLanguage;
