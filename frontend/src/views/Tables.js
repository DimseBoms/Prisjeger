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
import React from "react";
import PrisdataService from "../axios/prisdata-service";
import { useState } from "react";
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
} from "reactstrap";
import { useEffect } from "react";

function FiltrertVareliste({vareListe, vareFilter}) {
  const filtrertVareliste = vareListe.filter(v => {
    return v.toLowerCase().indexOf((vareFilter.toLowerCase())) !== -1
  })
  return (
    <>
      {filtrertVareliste.map((vare, index) => (
        <tr key={index}>
          <td>{vare}</td>
        </tr> 
      ))}
    </>
  )
}

function Pristabell() {
  // initialiserer React komponent med de nødvendige state variablene

    const [vareListe, setVareListe] = useState([])
    const [varefilter, setVarefilter] = useState("")
    const [butikkliste, setButikkliste] = useState([])

    useEffect(() => {
      PrisdataService.getVareliste().then((response) => {
        setVareListe(response.data)
      })
    }, [])

  return (
    <>
      <div className="content">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Pristabell</CardTitle>
                  <InputGroup className="no-border">
                    <Input placeholder="Filtrering" id="vareFilter" onChange={e => setVarefilter(e.target.value)}/>
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <i className="nc-icon nc-zoom-split" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Vare</th>
                      
                      <th className="text-right">Gjennomsnitt</th>
                    </tr>
                  </thead>
                  <tbody>
                      <FiltrertVareliste vareListe={vareListe} vareFilter={varefilter}/>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
  }


export default Pristabell;
