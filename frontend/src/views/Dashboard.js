/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState, useMemo, useLayoutEffect } from "react";
// react plugin used to create charts
import {
  Line,
  } from "react-chartjs-2";

import { useContext } from "react/cjs/react.production.min";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Table,
} from "reactstrap";

// core components
import BackendApi from "../axios/backendApi";

import {
  labels,
  datasets,
  options
} from "../variables/sampledata"

//Lager graf
function Graf(props) {
  return props.grafLaget !== true ? (
    <></>
  ) : (
    <Card className="card-chart">
      <CardHeader>
        <CardTitle tag="h5">Prishistorikk</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="chart-line-standard">
          <Line
            data={props.chart.data}
            options={props.chart.option}
            width={800}
            height={300} 
          />
        </div>
        <div className="chart-line-potrait">
          Vennligst bytt til landskap for å se graf
        </div>
      </CardBody>
    </Card>
  )
}

function Liste(props) {
  if (props.grafLaget !== true) {
    return <></>
  } else if (props.loading == true) {
    return <>Loading...</>
  } else if (props.loading == false) {
    return (
      <Card className="card-tabell">
        <CardHeader><h6>{props.vareNavn}</h6></CardHeader>
        <CardBody>
          <>Den siste oppdateringen: {props.vare[0].dato} (År-Måned-Dag)</>
          <Table striped bordered hover size="sm">
            <tbody>
              {ListeTR(0, props)}
              {ListeTR(1, props)}
              {ListeTR(2, props)}
              {ListeTR(3, props)}
              {ListeTR(4, props)}
              {ListeTR(5, props)}
            </tbody>
          </Table>
        </CardBody>
      </Card>  
    )  
  } else return <>FUNGER PLS!</>;
}

function ListeTR(butikkNR, props) {
  //For å fargelegge listeradene om de er lavest pris
  let [lavestePris, setLavestePris] = useState(10);

  for (let i = 0; props.antallButikker > i; i++) {
    let iPris = 0;
    console.log("ListeTR() aktiveres!");
    switch (i) {
      case 0: iPris = props.vare[0].priser['Kiwi']; break;
      case 1: iPris = props.vare[0].priser['Meny']; break;
      case 2: iPris = props.vare[0].priser['Coop Obs']; break;
      case 3: iPris = props.vare[0].priser['Rema 1000']; break;
      case 4: iPris = props.vare[0].priser['Spar']; break;
      case 5: iPris = props.vare[0].priser['Coop Extra']; 
    }
    if (iPris < lavestePris) {
      setLavestePris(iPris);
    }
  }

  switch (butikkNR) {
    //Kiwi
    case 0: {
      if (props.vare[0].priser['Kiwi'] <= lavestePris) {
        return (
          <tr>
            <td bgcolor="lightgreen">{props.butikkListe[0]}</td>
            <td bgcolor="lightgreen">{props.vare[0].priser['Kiwi']} kr</td>
          </tr> 
        )   
      } else {
        return (
          <tr>
            <td>{props.butikkListe[0]}</td>
            <td>{props.vare[0].priser['Kiwi']} kr</td>
          </tr>
        ) 
      }
    }
    //Meny
    case 1: {
      if (props.vare[0].priser['Meny'] <= lavestePris) {
        return (
          <tr>
            <td bgcolor="lightgreen">{props.butikkListe[1]}</td>
            <td bgcolor="lightgreen">{props.vare[0].priser['Meny']} kr</td>
          </tr> 
        )   
      } else {
        return (
          <tr>
            <td>{props.butikkListe[1]}</td>
            <td>{props.vare[0].priser['Meny']} kr</td>
          </tr>
        ) 
      }
    }
    //Coop Ops
    case 2: {
      if (props.vare[0].priser['Coop Ops'] <= lavestePris) {
        return (
          <tr>
            <td bgcolor="lightgreen">{props.butikkListe[2]}</td>
            <td bgcolor="lightgreen">{props.vare[0].priser['Coop Obs']} kr</td>
          </tr> 
        )   
      } else {
        return (
          <tr>
            <td>{props.butikkListe[2]}</td>
            <td>{props.vare[0].priser['Coop Obs']} kr</td>
          </tr>
        ) 
      }
    }
    //Rema 1000
    case 3: {
      if (props.vare[0].priser['Rema 1000'] <= lavestePris) {
        return (
          <tr>
            <td bgcolor="lightgreen">{props.butikkListe[3]}</td>
            <td bgcolor="lightgreen">{props.vare[0].priser['Rema 1000']} kr</td>
          </tr> 
        )   
      } else {
        return (
          <tr>
            <td>{props.butikkListe[3]}</td>
            <td>{props.vare[0].priser['Rema 1000']} kr</td>
          </tr>
        ) 
      }
    }
    //Spar
    case 4: {
      if (props.vare[0].priser['Spar'] <= lavestePris) {
        return (
          <tr>
            <td bgcolor="lightgreen">{props.butikkListe[4]}</td>
            <td bgcolor="lightgreen">{props.vare[0].priser['Spar']} kr</td>
          </tr> 
        )   
      } else {
        return (
          <tr>
            <td>{props.butikkListe[4]}</td>
            <td>{props.vare[0].priser['Spar']} kr</td>
          </tr>
        ) 
      }
    }
    //Coop Extra
    case 5: {
      if (props.vare[0].priser['Coop Extra'] <= lavestePris) {
        return (
          <tr>
            <td bgcolor="lightgreen">{props.butikkListe[5]}</td>
            <td bgcolor="lightgreen">{props.vare[0].priser['Coop Extra']} kr</td>
          </tr> 
        )   
      } else {
        return (
          <tr>
            <td>{props.butikkListe[5]}</td>
            <td>{props.vare[0].priser['Coop Extra']} kr</td>
            <td>{lavestePris}</td>
          </tr>
        ) 
      }
    }
  }
}

function LoadingScreen(loading) {
  return loading == true ? (
    <h1>Loading...</h1>
  ) : (
    <></>
  )
}

function Dashboard() {
  //Lager HMTL med chart
  let [grafLaget, setGrafLaget] = useState(false);
  let [loading, setLoading] = useState(false);
  const antallButikker = 6;
  const [vareNavn, setVareNavn] = useState("");
  const [chart, setChart] = useState([]);
  const [fradato, setFradato] = useState("2021-12-12");
  const [vare, setVare] = useState([]);
  const [butikkListe, setButikkListe] = useState([]);

  useEffect(() => {
    //Hvis at vare har ikke blitt søkt opp, så lag blank
    if (grafLaget) {
      BackendApi.getVare(vareNavn).then(response => {
        setVare(response.data);
        setLoading(false); 
      });  
      BackendApi.getButikkliste().then((response) => {
        for (let i = 0; i < 6; i++) {
          datasets[i].label = response.data[i];
          setButikkListe(response.data);
        }
      });
      //Setter innholdet i grafen
      setChart({
        data: (canvas) => {
          return {
            labels: labels,
            datasets: datasets,
          }
        },
        options: options,
      });
    } 
  }, [grafLaget, loading]);

  //Dashboard return
  return (
    <>
      <div className="content">
        <Row>
          <Col md = {11}>
            <Card className="card-tabell">
              <CardHeader>
                <LoadingScreen/>
                <CardTitle tag="h5">Pris Sammenligning</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="card-stats">
                  <form className="hor-card-form">
                  <>Fish and Crips, Findus, 480 gram |||| Kims Mexican Fiesta, 200 gram</>
                    <InputGroup className="sok-vare">
                      <Input placeholder="Søk vare..." type="text" id="inputSøkVare"/>
                        <InputGroupAddon addonType="append">
                          <InputGroupText>
                            <i className="nc-icon nc-zoom-split" id="inputclick" onClick={() => {
                              setLoading(true);
                              setGrafLaget(true); 
                              setVareNavn(document.getElementById("inputSøkVare").value)}}/> 
                        </InputGroupText>
                      </InputGroupAddon> 
                    </InputGroup>          
                  </form>
                </div>  
              </CardBody>
            </Card>
            <Liste grafLaget = {grafLaget} 
                   vareNavn = {vareNavn} 
                   vare = {vare} 
                   loading = {loading} 
                   butikkListe = {butikkListe}
                   />
          </Col>
        </Row>
        <Graf chart = {chart} 
              grafLaget = {grafLaget}/>
      </div>
    </>
  );
}

export default Dashboard;
