/*
Skulle være visningen som ble benyttet for å legge inn nytt språk men er for øyeblikket ikke i bruk,
da denne funksjonen ikke har blitt implementert.
*/
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
  const notificationAlert = React.useRef();
  const notify = (place) => {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Welcome to <b>Paper Dashboard React</b> - a beautiful freebie for
            every web developer.
          </div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };
    notificationAlert.current.notificationAlert(options);
  };
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
