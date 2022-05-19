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
import BackendApi from "../axios/backendApi";
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
  Button
} from "reactstrap";
import { useEffect } from "react";

function FiltrertVareliste({vareListe, vareFilter, handleliste, setHandleliste}) {
  const filtrertVareliste = vareListe.filter(v => {
    return v.toLowerCase().indexOf((vareFilter.toLowerCase())) !== -1
  })
  return (
    <>
      {filtrertVareliste.map((vare, index) => (
        <tr key={index}>
          <td>{vare}</td>
          {LagKnapp(vare, index, handleliste, setHandleliste)}
        </tr> 
      ))}
    </>
  )
}

// Denne funksjonen returnerer et jsx komponent som skal benyttes til å lage
// og redigere handlelister 
function LagKnapp(vare, index, handleliste, setHandleliste) {
  let vareString = vare
  // Denne deklarasjonen gjør vare om til en lokal variabel som kan benyttes i
  // det anonyme funksjonskallet som skal kjøre på button.onClick()
  return (
    <td>
      <Button
        className="btn-round"
        color="primary"
        // Funksjonskall som skal oppdatere handleliste
        onClick={() => {
          // Itererer og teller gjennom handleliste for å se om varen
          // er lagt til i handlelisten fra før
          let vareFinnes = false
          Object.keys(handleliste).forEach((element) => {
            // Hvis vare finnes i tabell og den allerede er lagt til i handlelisten
            if (handleliste[element] > 0 && element == vareString) {
              vareFinnes = true
            }
          })
          // Hvis vare er lagt til i handlelisten fra før skal den inkrementeres
          if (vareFinnes) {
            let nyHandleliste = handleliste
            nyHandleliste[vareString] = handleliste[vareString] + 1
            setHandleliste(nyHandleliste)
            console.log(`${vare} inkrementert`)
          }
          // Hvis ikke skal det lages en ny nøkkel og så skal denne settes til en
          else {
            let nyHandleliste = handleliste
            nyHandleliste[vareString] = 1
            setHandleliste(nyHandleliste)
          }
          console.log(`Nåværende handleliste: ${JSON.stringify(handleliste)}`)
        }}>
          +
        </Button>
    </td>
  )
}

function Pristabell() {
  // initialiserer React komponent med de nødvendige state variablene

    const [vareListe, setVareListe] = useState([])
    const [allHistorikk, setAllHistorikk] = useState({})
    const [varefilter, setVarefilter] = useState("")
    const [butikkliste, setButikkliste] = useState([])
    const [handleliste, setHandleliste] = useState({})

    useEffect(() => {
      BackendApi.getVareliste().then((response) => {
        setVareListe(response.data)
      })
      BackendApi.getAll().then((response) => {
        setAllHistorikk(response.data)
        console.log(response.data)
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
                      <FiltrertVareliste
                        vareListe={vareListe}
                        vareFilter={varefilter}
                        handleliste={handleliste}
                        setHandleliste={setHandleliste}
                      />
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
