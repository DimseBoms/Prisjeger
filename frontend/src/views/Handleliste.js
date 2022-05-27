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
import jwt from 'jsonwebtoken'
import { useState, useEffect, useRef } from "react";
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

} from "reactstrap";
import jsonwebtoken from "jsonwebtoken";





const KryssAv = () => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <>
      <Checkbox
        value={checked}
        onChange={handleChange}
      />

      <p>{checked.toString()}</p>
    </>
  );
};

const Checkbox = ({ label, value, onChange }) => {
  return (
    <span className="justify-content: space-between"
     >
    <label>
      <Input
      style={{ marginRight: '.2rem', width: '5em',height: '4.5em', 
      marginTop: '0em', marginBottom: '0em', paddingLeft: '0em',paddingRight: '0em' }} 
        type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
    </span>
  );
};




/**
 * Funksjonen filtrerer varenavn i databasen etter input i søkefelt
 * Dette er en endring
 * 
 * @param {*} param0 
 * @returns 
 */
function FiltrertVareliste({vare, vareListe, vareFilter, handleliste, setHandleliste, 
  radsum, setRadsum, teller, 
  redigering, prisliste, setPrisliste, 
  props}) {


  // VISER VARER I VARELISTE BASERT PÅ FILTER (SØKETREFF)
  const filtrertVareliste = vareListe.filter(v => {
    return v.toLowerCase().indexOf((vareFilter.toLowerCase())) !== -1
  })

  // REGNER UT TOTALBELØP OG VISER PÅ HVER RAD
  let grandTotal = 0
  let opptelling = 0
  Object.keys(handleliste).forEach(vare1 => {
    Object.keys(prisliste).forEach(vare2 => {
      if (vare1 === vare2 && handleliste[vare1] > 0) {
        opptelling = parseFloat(prisliste[vare1])* handleliste[vare2]
        grandTotal += opptelling
      }
    })
  })

  let [farge, setFarge] = useState("green");

 // const ventPåTall = isNaN(parseFloat(handleliste[vare])) ? parseFloat(handleliste[vare]) : 0

  // returnerer vareliste og iteratorknapp.
  return (redigering) ? (
    <>
      {filtrertVareliste.map((vare, index) => (
        <tr key={index}>
          <td>{vare}</td>
          <td> 
            <Button 
              style={{ marginRight: '.2rem', width: '5em',marginTop: '.8rem',paddingLeft: '0em',paddingRight: '0em' }} 
              >{'Pris : '+(parseFloat(prisliste[vare])).toFixed(2)},-
            </Button>        
            <Button
              style={{ marginRight: '.2rem', width: '5em',marginTop: '.8rem',paddingLeft: '0em',paddingRight: '0em' }} 
              >{!isNaN(parseFloat(prisliste[vare] * handleliste[vare])) ?  
                  'Vare : '+(parseFloat(prisliste[vare] * handleliste[vare])).toFixed(2) : 'Vare : ' +(0).toFixed(2)},-
            </Button>
            <Button
              style={{ marginRight: '.2rem', width: '5em',marginTop: '.8rem',paddingLeft: '0em',paddingRight: '0em' }} 
              >{'Total : '+grandTotal.toFixed(2)},-
            </Button>
          </td>         
          {LagKnapper(vare, handleliste, setHandleliste, radsum, setRadsum, prisliste, setPrisliste)}
        </tr> 
      ))}
    </>
  ) : (
    <>
    {filtrertVareliste.map((vare, index) => (handleliste[vare] > 0) ? (
      <tr key={index}>
        <td>{vare}</td>
        <td>         
          <Button 
            style={{ marginRight: '.2rem', width: '5em',marginTop: '.8rem',paddingLeft: '0em',paddingRight: '0em' }} 
            >{'Pris : '+(parseFloat(prisliste[vare])).toFixed(2)},-
          </Button>        
          <Button
            style={{ marginRight: '.2rem', width: '5em',marginTop: '.8rem',paddingLeft: '0em',paddingRight: '0em' }} 
            >{!isNaN(parseFloat(prisliste[vare] * handleliste[vare])) ?  
                'Vare : '+(parseFloat(prisliste[vare] * handleliste[vare])).toFixed(2) : 'Vare : ' +(0).toFixed(2)},-
          </Button>
          <Button
            style={{ marginRight: '.2rem', width: '5em',marginTop: '.8rem',paddingLeft: '0em',paddingRight: '0em' }} 
            >{'Total : '+grandTotal.toFixed(2)},-
          </Button>
        </td>    
        <td>
          <KryssAv/>
        </td>
      </tr> 
    ) : (null))}
  </>
  )
}







/**
 * Funksjonen returnerer en knapp for å iterere varer i handleliste
 * Kobler varenavn fra DB med radsum lagt inn av bruker
 * Vil kunne sende data til DB (type og radsum varer pr bruker)
 * 
 * @returns 
 */
function LagKnapper(vare, handleliste, setHandleliste, radsum, setRadsum, prisliste, setPrisliste, props) {

  let varetekst = vare 
  let pristekst = vare         
  let vareFinnes = false
  let nyHandleliste = handleliste
  let nyprisliste = prisliste
  let vent = 0


  return (
    <td className="text-center">
      {/*KNAPP FOR Å REDUSERE radsum*/}
      <Button 
      defaultValue={vent}
        className="btn-round" color="danger"
        style={{  width: '5em',marginRight: '.2rem',marginTop: '.8rem',paddingLeft: '0em',paddingRight: '0em'}} 
        onClick={() => {
          // Hvis vare har radsum reduseres radsum og pris
          if (handleliste[varetekst] > 0) {
            nyHandleliste = handleliste
            nyHandleliste[varetekst] = handleliste[varetekst] - 1
            setHandleliste(nyHandleliste)
            setRadsum(radsum - parseFloat(prisliste[varetekst]))
          }
        }}>{handleliste[varetekst]}
      </Button>
      {/*KNAPP FOR Å ØKE radsum*/}
      <Button className="btn-round" color="success" style={{ width: '5em',marginRight: '.2rem',marginTop: '.8rem',
        paddingLeft: '0em',paddingRight: '0em'}} 
        onClick={() => {
          setRadsum(radsum + parseFloat(prisliste[vare]))
          // Itererer handlelista og finner valgte varer
          Object.keys(handleliste).forEach((element) => {
            // Hvis vare finnes i tabell og den allerede er lagt til i handlelisten
            if (handleliste[element] > 0 && element === varetekst) {
              vareFinnes = true
            }
          }) // Hvis finnes inkrementeres antall
          if (vareFinnes) {
            nyHandleliste[varetekst] = handleliste[varetekst] + 1
          } // Hvis ikke settes antall til 1
          else {
            nyHandleliste[varetekst] = 1
          }
          setHandleliste(nyHandleliste)
          setPrisliste(nyprisliste)
        }}>{handleliste[varetekst]}
      </Button>
    </td>
  )
}







/**
 * Funksjon for å oppdatere priser i tabellen basert på valgt butikk
 * @param {*} finnButikk 
 * @param {*} finnDato 
 * @param {*} setVareListe 
 * @param {*} setPrisliste 
 */
function oppdaterVisning(finnButikk, finnDato, setVareListe, setPrisliste) {
    // Henter JSON fra valgt vare på valgt dato
    BackendApi.getButikk(finnButikk, finnDato, finnDato).then((response) => {
      setVareListe(Object.keys(response.data[0].varer))
      setPrisliste(response.data[0].varer)
    })
}






/**
 * Funksjonen oppretter og returnerer komponentet Handleliste
 * Initialiserer React komponent med de nødvendige state variablene
 * 
 * @returns Komplett handleliste-komponent
 */
function Handleliste(props, vare) {
    const [vareListe, setVareListe] = useState([])
    const [varefilter, setVarefilter] = useState("")
    const [handleliste, setHandleliste] = useState({})
    const [radsum, setRadsum] = useState(0)
    const [redigering, setRedigering] = useState(true)
    const [prisliste, setPrisliste] = useState([])
    const [butikker, setButikker] = useState([])
    const [finnPris, setFinnPris] = useState([])
    const [finnButikk, setFinnButikk] = useState("Meny");
    const [finnDato, setFinnDato] = useState("2022-01-23");
    

    useEffect(() => {
      // Henter JSON over alle registrerte butikker
      BackendApi.getButikkliste().then((response) => {
        setButikker(response.data)
      })
      oppdaterVisning(finnButikk, finnDato, setVareListe, setPrisliste)

    }, [])

  return redigering ? (
    <>
      <div className="content">
        <Row>
          <Col>
            <Card>
              <CardHeader>
              <Card>
                <CardTitle tag="h4" className="text-center">Rediger handleliste</CardTitle>
                  <Row className="justify-content-center">
                    <Button 
                      onClick={() =>setRedigering(false)}         
                      color="success" 
                      size="sm">
                        Handle
                    </Button>
                 </Row>
                 <Row className="justify-content-center">
                    <UncontrolledDropdown size="sm">
                      <DropdownToggle caret>{finnButikk}</DropdownToggle>
                      <DropdownMenu 
                        onClick={() => { }}>
                          <DropdownItem onClick={() =>{
                            setFinnButikk(butikker[0]) 
                            oppdaterVisning(butikker[0], finnDato, setVareListe, setPrisliste)
                          }}>{butikker[0]}</DropdownItem>
                          <DropdownItem onClick={() => {
                            setFinnButikk(butikker[1])
                            oppdaterVisning(butikker[1], finnDato, setVareListe, setPrisliste)
                          }}>{butikker[1]}</DropdownItem>
                          <DropdownItem onClick={() =>{
                            setFinnButikk(butikker[2]) 
                            oppdaterVisning(butikker[2], finnDato, setVareListe, setPrisliste)
                          }}>{butikker[2]}</DropdownItem>
                          <DropdownItem onClick={() =>{
                            setFinnButikk(butikker[3]) 
                            oppdaterVisning(butikker[3], finnDato, setVareListe, setPrisliste)
                          }}>{butikker[3]}</DropdownItem>
                          <DropdownItem onClick={() =>{
                            setFinnButikk(butikker[4]) 
                            oppdaterVisning(butikker[4], finnDato, setVareListe, setPrisliste)
                          }}>{butikker[4]}</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Row>
                </Card>
                  <InputGroup className="no-border">
                    <Input placeholder="Søk opp vare" id="vareFilter" onChange={e => setVarefilter(e.target.value)}/>
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

                  </thead> 
                  <tbody>
                      <FiltrertVareliste
                        redigering={redigering}
                        setRedigering={setRedigering}
                        butikker={butikker}
                        setButikker={setButikker}
                        vareListe={vareListe}
                        vareFilter={varefilter}
                        prisliste={prisliste}
                        setPrisliste={setPrisliste}
                        handleliste={handleliste}
                        setHandleliste={setHandleliste}
                        radsum={radsum}
                        setRadsum={setRadsum}
                        finnPris={finnPris}
                        setFinnPris={setFinnPris}
                      />
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  ) : (
    <>
      <div className="content">
        <Row>
          <Col>
            <Card>
              <CardHeader>
              <Card>
                <CardTitle tag="h4" className="text-center">Kryss av varer i handlekurv</CardTitle>
                  <Row className="justify-content-center">  
                    <Button onClick={() =>setRedigering(true)} color="danger" size="sm">Rediger</Button>
                  </Row>
                </Card>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">

                  </thead> 
                  <tbody>
                      <FiltrertVareliste
                        vareListe={vareListe}
                        vareFilter={varefilter}
                        handleliste={handleliste}
                        setHandleliste={setHandleliste}
                        radsum={radsum}
                        setRadsum={setRadsum}
                        redigering={redigering}
                        setRedigering={setRedigering}
                        prisliste={prisliste}
                        setPrisliste={setPrisliste}
                        butikker={butikker}
                        setButikker={setButikker}
                        finnPris={finnPris}
                        setFinnPris={setFinnPris}
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

export default Handleliste;
