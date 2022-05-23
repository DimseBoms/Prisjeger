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
import { useEffect } from "react";
import jwt from 'jsonwebtoken'
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
import jsonwebtoken from "jsonwebtoken";







/**
 * Funksjonen filtrerer varenavn i databasen etter input i søkefelt
 * Dette er en endring
 * 
 * @param {*} param0 
 * @returns 
 */
function FiltrertVareliste({vareListe, vareFilter, handleliste, setHandleliste, 
  enhetspris, setEnhetspris, antall, setAntall, totalsum, setTotalsum, detaljer, setDetaljer, 
  redigering, setRedigering, brukersListe, setBrukersListe, allHistorikk, setAllHistorikk, 
  butikker, setButikker, vareFraDb, setVareFraDb, prisFraDb, setPrisFraDb}) {

  const filtrertVareliste = vareListe.filter(v => {
    return v.toLowerCase().indexOf((vareFilter.toLowerCase())) !== -1
  }) 

  console.log('UTVALGTE Data fra DB lagt i variabel allHistorikk : ' + JSON.stringify(vareFraDb))

  
  let verdi = []
  let i = 0
  let nyBrukersListe = brukersListe
  let nyKey = ""

  Object.keys(vareFraDb).forEach(nøkkel => {
      verdi = Object.values(vareFraDb)
        if (detaljer === butikker[0]) 
          prisFraDb = verdi[i][0]       
        if (detaljer === butikker[1]) 
          prisFraDb = verdi[i][1]        
        if (detaljer === butikker[2]) 
          prisFraDb = verdi[i][2]
        if (detaljer === butikker[3]) 
          prisFraDb = verdi[i][3]
        if (detaljer === butikker[4]) 
          prisFraDb = verdi[i][4]
        if (detaljer === butikker[5]) 
          prisFraDb = verdi[i][5]
        i++ 

        // konsoll:  Kiwi | Bergensk Fiskesuppe | 16.90 
        console.log("RAD AV BUTIKK + VARE + PRIS : | " +detaljer+' | '+nøkkel+' | '+prisFraDb)
        Object.values(vareListe).forEach(verdi => {
            if (verdi === nøkkel) {
              console.log("MATCH " + prisFraDb)
              // ELEMENTER SOM MATCHER = VARETEKSTER SOM LIGGER I FILTERET + HAR PRIS
              nyBrukersListe[verdi] = prisFraDb
            }
        })
        setEnhetspris(nyBrukersListe[nyKey])     
  })


  // returnerer vareliste og iteratorknapp. Detaljer kan hentes frem/ skjules.
  return (redigering) ? (
    <>
      {filtrertVareliste.map((vare, index) => (
        <tr key={index}>
          <td>{vare}</td>
          {visRadverdier(vare, index, handleliste, setHandleliste, enhetspris, setEnhetspris, antall, 
            setAntall, totalsum, setTotalsum, detaljer, setDetaljer, redigering, setRedigering, 
            brukersListe, setBrukersListe, allHistorikk, setAllHistorikk)}
          {LagKnapper(vare, index, handleliste, setHandleliste, enhetspris, setEnhetspris, antall, 
            setAntall, totalsum, setTotalsum, detaljer, setDetaljer, redigering, setRedigering, 
            brukersListe, setBrukersListe, allHistorikk, setAllHistorikk, butikker, setButikker, 
            vareFraDb, setVareFraDb, prisFraDb, setPrisFraDb)}
        </tr> 
      ))}
    </>
  ) : (
    <>
    {filtrertVareliste.map((vare, index) => (handleliste[vare] > 0) ? (
      <tr key={index}>
        <td>{vare}</td>
        {visRadverdier(vare, index, handleliste, setHandleliste, enhetspris, setEnhetspris, antall, 
          setAntall, totalsum, setTotalsum, detaljer, setDetaljer, redigering, setRedigering, 
          brukersListe, setBrukersListe, allHistorikk, setAllHistorikk, butikker, setButikker, 
          vareFraDb, setVareFraDb, prisFraDb, setPrisFraDb)}
        {LagCheck(vare, index, handleliste, setHandleliste, enhetspris, setEnhetspris, antall, 
          setAntall, totalsum, setTotalsum, detaljer, setDetaljer, redigering, setRedigering, 
          brukersListe, setBrukersListe, allHistorikk, setAllHistorikk, butikker, setButikker, 
          vareFraDb, setVareFraDb, prisFraDb, setPrisFraDb)}
      </tr> 
    ) : (null))}
  </>
  )
}





function LagCheck(vare, index, handleliste, setHandleliste, enhetspris, setEnhetspris, antall, 
  setAntall, totalsum, setTotalsum, detaljer, setDetaljer, redigering, setRedigering, 
  brukersListe, setBrukersListe, allHistorikk, setAllHistorikk, butikker, setButikker, 
  vareFraDb, setVareFraDb, prisFraDb, setPrisFraDb) {

    return (
      <>
        <td>
          <Input
            type="checkbox" 
            style={{
              width: '2em', 
              height: '2em',
              paddingBottom: '1em'
            }} 
          />              
        </td>
      </>
    )
  }




/**
 * Funskjonen legger til ekstra rad-elementer i visning
 * Gir verdi til feltet som viser summert pris pr rad/ vare
 * 
 * @param {*} vare 
 * @param {*} index 
 * @param {*} handleliste 
 * @param {*} setHandleliste 
 * @param {*} enhetspris 
 * @param {*} setEnhetspris 
 * @param {*} antall 
 * @param {*} setAntall 
 * @param {*} totalsum 
 * @param {*} setTotalsum 
 * @param {*} detaljer 
 * @param {*} setDetaljer 
 * @param {*} redigering 
 * @param {*} setRedigering 
 * @returns 
 */
function visRadverdier(vare, index, handleliste, setHandleliste, enhetspris, setEnhetspris, 
  antall, setAntall, totalsum, setTotalsum, detaljer, setDetaljer, redigering, setRedigering, 
  brukersListe ) {

  const visantall = (!isNaN(JSON.stringify(handleliste[vare]))) ? JSON.stringify(handleliste[vare]) : 0

  return (
    <>
      <td className="text-center">
        <Button
          color="info"
          style={{ 
            marginRight: '.2rem', 
            width: '5em',
            marginTop: '.8rem',
            paddingLeft: '0em',
            paddingRight: '0em' 
          }} 
          >{parseFloat(JSON.stringify(brukersListe[vare]*1)).toFixed(2)},-
        </Button>
        <Button
        color="info"
          style={{ 
            marginRight: '.2rem', 
            width: '5em',
            marginTop: '.8rem',
            paddingLeft: '0em',
            paddingRight: '0em' 
          }} 
          >{(visantall * parseFloat(JSON.stringify(brukersListe[vare]*1))).toFixed(2)},-
          </Button>
      </td>
    </>
  )
}




/**
 * Funksjonen returnerer en knapp for å iterere varer i handleliste
 * Kobler varenavn fra DB med antall lagt inn av bruker
 * Vil kunne sende data til DB (type og antall varer pr bruker)
 * 
 * @returns 
 */
 function LagKnapper(vare, index, handleliste, setHandleliste, enhetspris, setEnhetspris, 
  antall, setAntall, totalsum, setTotalsum, detaljer, setDetaljer, redigering, setRedigering, 
  brukersListe, setBrukersListe, allHistorikk, setAllHistorikk, butikker, setButikker, vareFraDb, 
  setVareFraDb, prisFraDb, setPrisFraDb) {

  return (
    <td className="text-center">
        <Button 
          className="btn-round"
          color="danger"
          style={{ 
            width: '5em',
            marginRight: '.2rem',
            marginTop: '.8rem',
            paddingLeft: '0em',
            paddingRight: '0em'
          }} 
          onClick={() => dekrementer(vare, index, handleliste, setHandleliste, enhetspris, setEnhetspris, 
            antall, setAntall, totalsum, setTotalsum, detaljer, setDetaljer, redigering, setRedigering, 
            brukersListe, setBrukersListe, allHistorikk, setAllHistorikk, butikker, setButikker, 
            vareFraDb, setVareFraDb, prisFraDb, setPrisFraDb)}
          >{JSON.stringify(handleliste[vare])}
        </Button>
        <Button
          className="btn-round"
          color="success"
          style={{ 
            width: '5em',
            marginRight: '.2rem',
            marginTop: '.8rem',
            paddingLeft: '0em',
            paddingRight: '0em' 
          }} 
          onClick={() => inkrementer(vare, index, handleliste, setHandleliste, enhetspris, setEnhetspris, 
            antall, setAntall, totalsum, setTotalsum, detaljer, setDetaljer, redigering, setRedigering, 
            brukersListe, setBrukersListe, allHistorikk, setAllHistorikk, butikker, setButikker, 
            vareFraDb, setVareFraDb, prisFraDb, setPrisFraDb)}
          >{JSON.stringify(handleliste[vare])}
        </Button>
    </td>
  )
}





/**
 * Funksjonen inkrementerer antall vare
 * Kalles av onClick på inkrementer-knapp
 * 
 */
function dekrementer(vare, index, handleliste, setHandleliste, enhetspris, setEnhetspris, 
  antall, setAntall, totalsum, setTotalsum, detaljer, setDetaljer, redigering, setRedigering, 
  brukersListe, setBrukersListe, allHistorikk, setAllHistorikk, butikker, setButikker, 
  vareFraDb, setVareFraDb, prisFraDb, setPrisFraDb) {

  let vareString = vare
  let antallFinnes = false
  Object.keys(handleliste).forEach((element) => {
    // Kontrollerer om antall er større enn 0
    if (handleliste[vare] > 0) {
      antallFinnes = true
      setAntall(JSON.stringify(handleliste[vare] - 1))
      setTotalsum(totalsum - parseFloat(brukersListe[vare]))
    }
  })
  // Dekrementerer antall på aktuell rad
  if (antallFinnes) {
    let nyHandleliste = handleliste
    nyHandleliste[vareString] = handleliste[vareString] - 1
    setHandleliste(nyHandleliste)
  }          
}






/**
 * Funksjonen dekrementerer antall vare
 * Kalles ved onClick på dekrement-knapp
 */
function inkrementer(vare, index, handleliste, setHandleliste, enhetspris, setEnhetspris, 
  antall, setAntall, totalsum, setTotalsum, detaljer, setDetaljer, redigering, setRedigering, 
  brukersListe, setBrukersListe, allHistorikk, setAllHistorikk, butikker, setButikker, vareFraDb, prisFraDb, setPrisFraDb) {

  let vareString = vare
  //let leggTil = parseFloat(brukersListe[vare])
  setTotalsum(totalsum + parseFloat(brukersListe[vare]))
  // Itererer handlelista og finner valgte varer
  let vareFinnes = false
  let nyBrukersListe = brukersListe
  Object.keys(handleliste).forEach((element) => {
    // Hvis vare finnes i tabell og den allerede er lagt til i handlelisten
    if (handleliste[element] > 0 && element === vareString) {
      vareFinnes = true
    }
  })

  // Hvis finnes inkrementeres antall
  if (vareFinnes) {
    let nyHandleliste = handleliste
    let nyBrukersListe = brukersListe
    nyHandleliste[vareString] = handleliste[vareString] + 1
    nyBrukersListe[vareString] = prisFraDb
    setHandleliste(nyHandleliste)
    setBrukersListe(nyBrukersListe)
    console.log(`${vare} inkrementert`)
  }

  // Hvis ikke lages ny nøkkel
  else {
    let nyHandleliste = handleliste
    nyHandleliste[vareString] = 1
    nyBrukersListe[vareString] = 0
    setHandleliste(nyHandleliste)
    setBrukersListe(nyBrukersListe)
  }

  // UTSKRIFT AV OPPDATERT HANDLELISTE
  console.log(`Nåværende handleliste: ${JSON.stringify(handleliste)}`)

  // UTSKRIFT AV ANTALL PR VARE - BRUKES SOM VALUE PÅ KNAPPER
  console.log(`Nåværende TALL: ${JSON.stringify(handleliste[vare])}`)
  
  // DENNE LOOPEN MÅ MED - HVORFOR?? - OG HVORFOR MÅ JSON.STRINGIFY KALLES PÅ NYTT I JSX??
  Object.keys(handleliste).forEach((element) => {
    setAntall(JSON.stringify(handleliste[vare] + 1))
  })

}


//Number(Math.round(parseFloat(value + 'e' + decimalPlaces)) + 'e-' + decimalPlaces)







/**
 * Funksjonen oppretter og returnerer komponentet Handleliste
 * Initialiserer React komponent med de nødvendige state variablene
 * 
 * @returns Komplett handleliste-komponent
 */
function Handleliste() {
  // 

    const [vareListe, setVareListe] = useState([])
    const [allHistorikk, setAllHistorikk] = useState({})
    const [varefilter, setVarefilter] = useState("")
    const [butikkliste, setButikkliste] = useState([])
    const [handleliste, setHandleliste] = useState({})
    const [enhetspris, setEnhetspris] = useState(0)
    const [antall, setAntall] = useState(0)
    const [totalsum, setTotalsum] = useState(0)
    const [detaljer, setDetaljer] = useState("Velg butikk")
    const [redigering, setRedigering] = useState(true)
    const [brukersListe, setBrukersListe] = useState([])
    const [butikker, setButikker] = useState([])
    const [vareFraDb, setVareFraDb] = useState({})
    const [prisFraDb, setPrisFraDb] = useState(0)


    useEffect(() => {
      BackendApi.getVareliste().then((response) => {
        setVareListe(response.data)
      })

      BackendApi.getButikkliste().then((response) => {
        setButikkliste(response.data)
      })
      BackendApi.getAll().then((response) => {
        setButikker(response.data[0].butikker)
        setVareFraDb(response.data[0].varer)
        console.log('Direkte fra DB, "id_" ' + JSON.stringify(response.data[0]._id))
        console.log('Direkte fra DB, "butikker" ' + JSON.stringify(response.data[0].butikker))
        console.log('Direkte fra DB " varer" ' + JSON.stringify(response.data[0].varer))
      })
      BackendApi.getAll().then((response) => {
        setAllHistorikk(response.data)
     //   console.log('Direkte fra DB, "id_" ' + JSON.stringify(response.data[0]._id))
    //    console.log('Direkte fra DB, "butikker" ' + JSON.stringify(response.data[0].butikker))
    //    console.log('Direkte fra DB " varer" ' + JSON.stringify(response.data[0].varer))
     //   console.log('Data fra DB lagt i variabel allHistorikk : ' + JSON.stringify(allHistorikk))
      })
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
                      <DropdownToggle caret>{detaljer}</DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Velg butikk :</DropdownItem>
                        <DropdownItem onClick={() =>setDetaljer(butikker[0])}>{butikker[0]}</DropdownItem>
                        <DropdownItem onClick={() =>setDetaljer(butikker[1])}>{butikker[1]}</DropdownItem>
                        <DropdownItem onClick={() =>setDetaljer(butikker[2])}>{butikker[2]}</DropdownItem>
                        <DropdownItem onClick={() =>setDetaljer(butikker[3])}>{butikker[3]}</DropdownItem>
                        <DropdownItem onClick={() =>setDetaljer(butikker[4])}>{butikker[4]}</DropdownItem>
                        <DropdownItem onClick={() =>setDetaljer(butikker[5])}>{butikker[5]}</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Row>
                </Card>
                <CardTitle tag="h4" className="text-center">Totalt beløp : {totalsum},-</CardTitle>
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
                        vareListe={vareListe}
                        vareFilter={varefilter}
                        handleliste={handleliste}
                        setHandleliste={setHandleliste}
                        enhetspris={enhetspris}
                        setEnhetspris={setEnhetspris}
                        antall={antall}
                        setAntall={setAntall}
                        totalsum={totalsum}
                        setTotalsum={setTotalsum}
                        detaljer={detaljer}
                        setDetaljer={setDetaljer}
                        redigering={redigering}
                        setRedigering={setRedigering}
                        brukersListe={brukersListe}
                        setBrukersListe={setBrukersListe}
                        allHistorikk={allHistorikk}
                        setAllHistorikk={setAllHistorikk}
                        butikker={butikker}
                        setButikker={setButikker}
                        vareFraDb={vareFraDb}
                        setVareFraDb={setVareFraDb}
                        prisFraDb={prisFraDb}
                        setPrisFraDb={setPrisFraDb}
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
                <CardTitle tag="h2" className="text-center">Totalt beløp : {totalsum.toFixed(2)}</CardTitle>
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
                        enhetspris={enhetspris}
                        setEnhetspris={setEnhetspris}
                        antall={antall}
                        setAntall={setAntall}
                        totalsum={totalsum}
                        setTotalsum={setTotalsum}
                        detaljer={detaljer}
                        setDetaljer={setDetaljer}
                        redigering={redigering}
                        setRedigering={setRedigering}
                        brukersListe={brukersListe}
                        setBrukersListe={setBrukersListe}
                        allHistorikk={allHistorikk}
                        setAllHistorikk={setAllHistorikk}
                        butikker={butikker}
                        setButikker={setButikker}
                        vareFraDb={vareFraDb}
                        setVareFraDb={setVareFraDb}
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
