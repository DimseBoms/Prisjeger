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
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
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
  DropdownItem
} from "reactstrap";
import jsonwebtoken from "jsonwebtoken"; // for å identifisere bruker
import '../assets/css/prisjeger.css';





/**
 * Funksjonen bygger opp og returnerer alle radelementer i visning
 * Elementer: varenavn, enhetspris, sum, totalsum, antall -/+
 * 
 * @param {*} param0 
 * @returns 
 */
function FiltrertVareliste({    
  redigering,                    
  vareListe,
  vareFilter,
  prisliste,
  setPrisliste,
  handleliste,
  setHandleliste,
  radsum,
  setRadsum
  }) {


  // Filtrerer vareliste/ handleliste basert på fritekst fra bruker
  const filtrertVareliste = vareListe.filter(v => {
    return v.toLowerCase().indexOf((vareFilter.toLowerCase())) !== -1
  })

  // Regner ut totalsum og viser på rader i filter
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
  
  // Conditional rendering, redigeringsvisning/ handlevisning
  return (redigering) ? (
    <>
      {filtrertVareliste.map((vare, index) => (
        <tr key={index}>
          <td>{vare}</td>
          <td> 
            <Button 
              className="ButtonsRegistrering"
              style={{marginTop: '.4rem'}}
              >{'Vare : '+(parseFloat(prisliste[vare])).toFixed(2)},-
            </Button>{' '}       
            <Button 
              className="ButtonsRegistrering"
              style={{marginTop: '.4rem'}}
              >{!isNaN(parseFloat(prisliste[vare] * handleliste[vare])) ?  
                  'Pris : '+(parseFloat(prisliste[vare] * handleliste[vare])).toFixed(2) : 
                  'Pris : ' +(0).toFixed(2)},-
            </Button>{' '}  
            <Button 
            className="ButtonsRegistrering"
            style={{marginTop: '.4rem'}}
              >{'Total : '+grandTotal.toFixed(2)},-
            </Button>{' '}
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
            className="ButtonsHandling"
            style={{marginTop: '.8rem'}} 
            >{'Pris : '+(parseFloat(prisliste[vare])).toFixed(2)},-
          </Button>{' '}        
          <Button
            className="ButtonsHandling"
            style={{marginTop: '.8rem'}}
            >{!isNaN(parseFloat(prisliste[vare] * handleliste[vare])) ?  
                'Vare : '+(parseFloat(prisliste[vare] * handleliste[vare])).toFixed(2) : 
                'Vare : ' +(0).toFixed(2)},-
          </Button>{' '}  
          <Button
            className="ButtonsHandling"
            style={{marginTop: '.8rem'}}
            >{'Total : '+grandTotal.toFixed(2)},-
          </Button>{' '}
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
 * Funksjon for å lage checkbox for handlevisning
 * 
 * @returns avkryssingboks for handlede varer
 */
function KryssAv(redigering, setRedigering) {
  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked(!checked)
  }

  return (
    <>
      <Checkbox
        value={checked}
        onChange={handleChange}
      />

      <p>Tester{checked.toString()}</p>
    </>
    )
  }

  const Checkbox = ({ label, value, onChange }) => {
    return (
      <span 
      >
      <label>
        <Input
        className="CheckVare"
        style={{marginTop: '0em', marginBottom: '0em'}} 
          type="checkbox" checked={value} onChange={onChange} />{label}</label>
      </span>
    );
  };








/**
 * Hjelpefunksjon for å bygge og returnere inkrementeringsknapper pr rad
 * Oppdaterer radsum : enhetspris * antall
 * 
 * @returns knapper -/+
 */
function LagKnapper(vare, handleliste, setHandleliste, radsum, setRadsum, prisliste, setPrisliste, props) {
  let varetekst = vare        
  let vareFinnes = false
  let nyHandleliste = handleliste
  let nyprisliste = prisliste
  let ventPåVerdi = 0

  return (
    <td className="text-center">
      {/*KNAPP FOR Å REDUSERE*/}
      <Button 
        defaultValue={ventPåVerdi}
        className="btn-round" color="danger"
        style={{width:'5em', marginRight:'.2rem', marginTop:'.8rem', paddingLeft:'0em', paddingRight:'0em'}} 
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
      {/*KNAPP FOR Å ØKE*/}
      <Button 
      className="btn-round" color="success" 
        style={{width:'5em', marginRight:'.2rem', marginTop:'.8rem', paddingLeft: '0em',paddingRight: '0em'}} 
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
 * Funksjon for å oppdatere priser i tabellen basert på valgt butikk og dato
 * 
 * @param {*} finnButikk butikk for priser
 * @param {*} finnDato dato for pris
 * @param {*} setVareListe gjør varenavn tilgjengelige for filteret
 * @param {*} setPrisliste kobler pris pr vare/dato/butikk til filteret
 */
function oppdaterVisning(finnButikk, finnDato, setVareListe, setPrisliste) {
  BackendApi.getButikk(finnButikk, finnDato, finnDato).then((response) => {
    setVareListe(Object.keys(response.data[0].varer))
    setPrisliste(response.data[0].varer)
  })
}






/**
 * Funksjon for å hente brukers handleliste fra DB
 * 
 * @param {*} epost brukers epost
 * @param {*} setVareListe legger varenavn i filter
 * @param {*} setPrisliste 
 * @param {*} setHandleliste 
 * @param {*} handleliste brukers handlsliste, varer og antall
 * @param {*} prisliste pris pr butikk pr dato
 */
function hentHandliste(epost, setVareListe, setPrisliste, setHandleliste, handleliste, prisliste) {
  BackendApi.getHandlelister(epost).then((response) => {
    setVareListe(Object.keys(response.data[0]))
    setHandleliste(response.data[0])
  })    
} 






/**
 * Funksjonen oppretter og returnerer komponentet Handleliste
 * Initialiserer React komponent med de nødvendige state variablene
 * Benytter flere hjelpemetoder for å bygge opp og vise dynamiske elementer
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
    
    // FOR Å SLETTE BRUKERS TOKEN (for testing)
    //  localStorage.removeItem('token')

    // Henter ut brukes epost fra token
    let brukerMail = ""
    const brukerInfo = localStorage.getItem('token')
      if(brukerInfo) {
        brukerMail = jsonwebtoken.decode(brukerInfo)
        console.log(brukerMail.epost)
      }
    const history = useHistory()
    console.log("DATASTRØM UT " + JSON.stringify(handleliste))           ///    her her her

    // Kontrollerer for innloggin, eller redirect
    useEffect(() => {
      if (!brukerInfo) {
        alert("Man må logge seg inn som bruker for å opprette handleliste")
        history.push('/Login')
      }
      // Henter JSON over alle registrerte butikker
      BackendApi.getButikkliste().then((response) => {
        setButikker(response.data)
      })
      // Henter JSON over alle varer og priser pr dato pr butikk
      oppdaterVisning(finnButikk, finnDato, setVareListe, setPrisliste)

    }, [])

  return redigering ? (
    <>
      <div className="content">
        <Row>
          <Col>
            <Card>
              <CardHeader>
              <Card 
                 className="HeaderBakgrunn"
                >
                <CardTitle tag="h4" className="text-center">Rediger handleliste</CardTitle>
                  <Row className="justify-content-center">
                    <Button
                      className="ButtonsHeader" 
                      style={{marginTop: '.5rem', marginRight: '.8rem'}}   
                      onClick={() =>setRedigering(false)}         
                      color="danger" 
                      >Bytt til handlevisning
                    </Button>      
                    <Button 
                      className="ButtonsHeader" 
                      style={{marginTop: '.5rem', marginRight: '.8rem'}}  
                      onClick={() => hentHandliste('tore@mail.com', setVareListe, setPrisliste, setHandleliste, handleliste)}    
                      color="danger" 
                      >Hent handleliste
                    </Button>             
                    <Button 
                      className="ButtonsHeader" 
                      style={{marginTop: '.5rem', marginRight: '.8rem'}}  
                      onClick={() => oppdaterVisning(finnButikk, finnDato, setVareListe, setPrisliste)}    
                      color="danger" 
                      >Legg til varer
                    </Button>
                 </Row>
                 <Row className="justify-content-center">
                    <UncontrolledDropdown size="lg">
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
                    <Button onClick={() =>setRedigering(true)} color="danger">Bytt til redigeringsvisning</Button>
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
