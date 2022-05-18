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

import {
  dashboardNASDAQChart
} from "../variables/charts.js"

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
} from "reactstrap";
// core components

import PrisdataService from "../axios/prisdata-service";

import {
  labels,
  datasets,
  options
} from "../variables/sampledata"

function Dashboard() {
  //Oppdatere chart
  const [chart, setChart] = useState([]);

  //Vareliste
  const [vareListe, setVareListe] = useState([]);
  
  useEffect(() => {
    PrisdataService.getButikkliste().then((response) => {
    //Plasserer navnet på butikkene i legend-labels
    for (let i = 0; i < response.data.length; i++) {
      datasets[i].label = response.data[i];
    }
    setVareListe(response.data);
    });
    
    setChart({
      data: (canvas) => {
        return {
          labels: labels,
          datasets: datasets,
        }
      },
      options: options,
    })

  }, [])

  //Oppdatere text
  const [content,setContent] = useState("");

  //Lager HMTL med chart
  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">Pris Historikk</CardTitle>
                <p className="card-category">{content}</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={chart.data}
                  options={chart.option}
                  width={800}
                  height={300} 
                />
              </CardBody>
              <CardFooter>
                <div className="card-stats">
                  <form className="hor-card-form">
                    <Input type="text" id="inputSøkVare"/>
                    <Button className="btn-rectangle" onClick={e =>  
                      setContent(document.getElementById("inputSøkVare").value)}>Søk vare</Button>
                  </form>
                  <Button className="btn-rectangle" onClick={e =>  
                    test()}>Oppdatere chart</Button>

                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

function test() {}
export default Dashboard;
