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
import React, { useEffect, useState } from "react";
// react plugin used to create charts
import {
  Line,
  } from "react-chartjs-2";

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

function Dashboard() {
  //Oppdatere chart
  const [chart, setChart] = useState([]);

  //Vareliste
  const [vareListe, setVareListe] = useState([])

  useEffect(() => {
    PrisdataService.getAll().then((response) => {
      setVareListe(response.data)
    })
  }, [])

  //Labels
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  //Datasets
  const datasets = [
    //Rema 1000
    {
      label: 'Rema 1000',
      data: [1, 1, 1, 1, 20, 27, 30, 34, 42, 45, 55, 63],
      fill: true,
      borderColor: "#ce13136d",
      backgroundColor: "transparent",
      pointBorderColor: "#ce13136d",
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    },
    //Meny
    {
      label: 'Meny',
      data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
      fill: true,
      borderColor: "#ce13136d",
      backgroundColor: "transparent",
      pointBorderColor: "#ce13136d",
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    },
    //Kiwi
    {
      label: 'Kiwi',
      labelTextColor: "#00ff11",
      data: [59, 36, 50, 17, 20, 27, 45, 67, 69, 43, 21, 43],
      fill: true,
      borderColor: "#00ff11",
      backgroundColor: "transparent",
      pointBorderColor: "#00ff11",
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    },
    //Spar
    {
      label: 'Spar',
      data: [59.75, 49.7, 55.75, 39.75, 49.75, 49.75, 49.75, 59.75, 39.75, 49.75, 49.75, 49.75],
      fill: true,
      borderColor: "#ef8157",
      backgroundColor: "transparent",
      pointBorderColor: "#ef8157",
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    },
    //Joker
    {
      label: 'Joker',
      data: [0, 60, 49, 12, 10, 27, 30, 34, 30, 45, 55, 63],
      fill: true,
      borderColor: "#d753c6",
      backgroundColor: "transparent",
      pointBorderColor: "#d753c6",
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    },
  ];

  //Options
  const options = {
    plugins: {
      legend: { 
        pointRadius: 1,
        display: true, 
        labels: {
          font: {
            size: 17,
            weight: 'bold',
          },
        },
        layout: {
          padding: 20,
        } 
      },
    },
  }

  //Setter chart
  useEffect(() => {
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
                    testVareliste({vareListe})}>Oppdatere chart</Button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

function test(datasets) {
  for (let i = 0; i < datasets.length; i++) {
    console.log("Henter data fra " + datasets[i].label + ": " + datasets[i].data);
  }
}

function testVareliste(vareListe) {
  console.log(vareListe);  
}

export default Dashboard;
