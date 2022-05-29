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
import { useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
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
} from "reactstrap"; // ferdige stylede elementer fra reactstrap er fundamentet for design
import jsonwebtoken from "jsonwebtoken"; // for å identifisere bruker
import '../assets/css/prisjeger.css'; // litt enkel CSS





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
  setRadsum, 
  epost, 
  listetittel,
  }) {
  
  const {t} = useTranslation();
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
              >{t('item')+(parseFloat(prisliste[vare])).toFixed(2)},-
            </Button>{' '}       
            <Button 
              className="ButtonsRegistrering"
              style={{marginTop: '.4rem'}}
              >{!isNaN(parseFloat(prisliste[vare] * handleliste[vare])) ?  
                t('price')+(parseFloat(prisliste[vare] * handleliste[vare])).toFixed(2) : 
                t('price') +(0).toFixed(2)},-
            </Button>{' '}  
            <Button 
              className="ButtonsRegistrering"
              style={{marginTop: '.4rem'}}
              >{t('total')+grandTotal.toFixed(2)},-
            </Button>{' '}
          </td>         
          {LagKnapper(vare, handleliste, setHandleliste, radsum, setRadsum, prisliste, setPrisliste, epost, listetittel)}
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
            >{t('price')+(parseFloat(prisliste[vare])).toFixed(2)},-
          </Button>{' '}        
          <Button
            className="ButtonsHandling"
            >{!isNaN(parseFloat(prisliste[vare] * handleliste[vare])) ?  
              t('item') +(parseFloat(prisliste[vare] * handleliste[vare])).toFixed(2) : 
              t('item') +(0).toFixed(2)},-
          </Button>{' '}  
          <Button
            className="ButtonsHandling"
            >{t('total')+grandTotal.toFixed(2)},-
          </Button>{' '}
        </td>    
        <td><KryssAv/></td>
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
function KryssAv() {
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
    </>
    )
  }
  const Checkbox = ({ label, value, onChange }) => {
    return (
      <input
        className="CheckVare"
        style={{marginTop: '0em', marginBottom: '0em'}} 
        type="checkbox" checked={value} onChange={onChange} 
        >{label}
      </input>  
    )
  }








/**
 * Hjelpefunksjon for å bygge og returnere inkrementeringsknapper pr rad
 * Oppdaterer radsum : enhetspris * antall
 * 
 * @returns knapper -/+
 */
function LagKnapper(vare, handleliste, setHandleliste, radsum, setRadsum, prisliste, setPrisliste, epost, listetittel) {
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
        style={{
          width:'5em', 
          marginRight:'.2rem', 
          marginTop:'.8rem', 
          paddingLeft:'0em', 
          paddingRight:'0em'
        }} 
        onClick={() => {
          // Hvis vare har radsum reduseres radsum og pris
          if (handleliste[varetekst] > 0) {
            nyHandleliste = handleliste
            nyHandleliste[varetekst] = handleliste[varetekst] - 1
            setHandleliste(nyHandleliste)
            setRadsum(radsum - parseFloat(prisliste[varetekst]))
            BackendApi.HandlelistePop(jsonwebtoken.decode(localStorage.getItem('token')).epost, listetittel, vare)
          }
        }}>{handleliste[varetekst]}
      </Button>
      {/*KNAPP FOR Å ØKE*/}
      <Button 
      className="btn-round" color="success" 
        style={{
          width:'5em', 
          marginRight:'.2rem', 
          marginTop:'.8rem', 
          paddingLeft: '0em',
          paddingRight: '0em'
        }} 
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
          BackendApi.HandlelisteAdd(jsonwebtoken.decode(localStorage.getItem('token')).epost, listetittel, vare)
          setHandleliste(nyHandleliste)
          setPrisliste(nyprisliste)
        }}>{handleliste[varetekst]}
      </Button>
    </td>
  )
}






/**
 * Funksjonen lager søkefelt/ dropdown for butikker. Utvider seg etter behov.
 * 
 * @param {*} param0 
 * @returns 
 */
function VisButikker({ setListetittel, listetittel, setVareListe, setPrisliste, setHandleliste, handleliste, 
  prisliste, lister, listeFilter, butikker, setButikker, finnButikk, setFinnButikk, finnDato}) {

  return (
    <>
      {butikker.map((butikker, index) => (
          <DropdownItem placeholder={butikker} key={index} onClick={(e) => {
            setFinnButikk(butikker)
            oppdaterVisning(butikker, finnDato, setVareListe, setPrisliste)
            }}>{butikker}
          </DropdownItem>
      ))}
    </>
  )
}






/**
 * Funksjonen lager søkefelt/ dropdown for handlelister. Utvider seg etter behov.
 * 
 * @param {*} param0 
 * @returns 
 */
function Vishandlelister({ setListetittel, listetittel, setVareListe, setPrisliste, setHandleliste, 
  handleliste, prisliste, lister, listeFilter}) {

  return (
    <>
      {lister.map((tittel, index) => (
          <DropdownItem placeholder={tittel} key={index} onClick={(e) => {
            setListetittel(tittel)
            hentHandliste(jsonwebtoken.decode(localStorage.getItem('token')).epost, 
              tittel, setVareListe, setPrisliste, setHandleliste, handleliste, prisliste)
            }}>{tittel}
          </DropdownItem>
      ))}
    </>
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
function hentHandliste(epost, listetittel, setVareListe, setPrisliste, setHandleliste, handleliste, prisliste) {
  BackendApi.getHandleliste(epost, listetittel).then((response) => {
    setVareListe(Object.keys(response.data))
    setHandleliste(response.data)
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
    const {t} = useTranslation()
    const [vareListe, setVareListe] = useState([])
    const [varefilter, setVarefilter] = useState("")
    const [handleliste, setHandleliste] = useState({})
    const [radsum, setRadsum] = useState(0)
    const [redigering, setRedigering] = useState(true)
    const [prisliste, setPrisliste] = useState([])
    const [butikker, setButikker] = useState([])
    const [finnPris, setFinnPris] = useState([])
    const [finnButikk, setFinnButikk] = useState("Meny")
    const [finnDato, setFinnDato] = useState("2022-01-23")
    const [listetittel, setListetittel] = useState("")
    const [lister, setLister] = useState([])
    const [toggle, setToggle] = useState(true)
    const [opprettNy, setOpprettNy] = useState(false)
    const [listeFilter, setlisteFilter] = useState("")

    
    // FOR Å SLETTE BRUKERS TOKEN (for testing)
    //  localStorage.removeItem('token')
    const history = useHistory()
    // Kontrollerer for innloggin, ellers redirect
    useEffect(() => {
      if (!localStorage.getItem('token')) {
        alert(t('must_log_in_alert'))
        history.push('/Admin/Login')
      } else {
        // Henter JSON fra DB over alle registrerte butikker
        BackendApi.getButikkliste().then((response) => {
          setButikker(response.data)
        })
        // Henter JSON fra DB over alle registrerte handlelister pr bruker epost
        BackendApi.getHandlelister(jsonwebtoken.decode(localStorage.getItem('token')).epost).then((response) => {
          setLister(response.data)
          setListetittel(response.data[0])
        })
        // Henter JSON over alle varer og priser pr dato pr butikk        
        oppdaterVisning(finnButikk, finnDato, setVareListe, setPrisliste)
      }

    }, [])

  return (redigering && !opprettNy) ? (
    <>
      <div className="content">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Card 
                  className="HeaderBakgrunn">
                  <CardTitle tag="h4" className="text-center">{t('edit_cart')}</CardTitle>             
                    <Row className="justify-content-center">
                      <UncontrolledDropdown                       
                        className="Valgmeny">
                        <DropdownToggle style={{padding: "0px"}}>
                          <Input placeholder={finnButikk} onChange={e => setButikker(e.target.value)}/>
                        </DropdownToggle>
                          <DropdownMenu style={{ maxHeight: "300px", overflow:"scroll"}}>
                            <VisButikker
                              lister={lister} 
                              listeFilter={listeFilter}
                              setListetittel={setListetittel}
                              listetittel={listetittel} 
                              setVareListe={setVareListe} 
                              setPrisliste={setPrisliste} 
                              setHandleliste={setHandleliste} 
                              handleliste={handleliste}
                              prisliste={prisliste}
                              butikker={butikker}
                              setButikker={setButikker}
                              finnButikk={finnButikk}
                              setFinnButikk={setFinnButikk}
                            />
                         </DropdownMenu>
                      </UncontrolledDropdown>
                    </Row>
                    <Row className="justify-content-center">
                      <UncontrolledDropdown                       
                        className="Valgmeny">
                        <DropdownToggle style={{padding: "0px"}}>
                          <Input placeholder={listetittel} onChange={e => setlisteFilter(e.target.value)}/>
                        </DropdownToggle>
                        <DropdownMenu style={{ maxHeight: "300px", overflow:"scroll"}}>
                            <Vishandlelister 
                            lister={lister} 
                            listeFilter={listeFilter}
                            setListetittel={setListetittel}
                            listetittel={listetittel} 
                            setVareListe={setVareListe} 
                            setPrisliste={setPrisliste} 
                            setHandleliste={setHandleliste} 
                            handleliste={handleliste}
                            prisliste={prisliste}
                             />
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </Row>   
                    <Row className="justify-content-center">
                      <Button 
                        className="ButtonsHeader" 
                        style={{marginTop: '.5rem', marginRight: '.8rem', marginLeft: '.8rem'}}  
                        onClick={() => {
                          console.log("Her skal antall settes til 0") 
                          window.confirm(t('confirm_erase_cart')) ?
                            BackendApi.slettHandleliste(jsonwebtoken.decode(localStorage.getItem('token')).epost, 
                              listetittel) :
                            console.log("Bruker har avbrutt")
                            window.location.reload(false); 
                        }} 
                        color="danger" 
                        >{t('delete_cart')}
                      </Button>      
                      <Button
                        className="ButtonsHeader" 
                        style={{marginTop: '.5rem', marginRight: '.8rem', marginLeft: '.8rem'}} 
                        onClick={() => setOpprettNy(true) }         
                        color="danger" 
                        >{t('new_list')}
                      </Button> 
                    </Row>
                    <Row className="justify-content-center">       
                      <Button
                        className="ButtonsHeader" 
                        style={{marginTop: '.5rem', marginRight: '.8rem', marginLeft: '.8rem'}}  
                        onClick={() =>setRedigering(false)}         
                        color="danger" 
                        >{t('change_shopping_view')}
                      </Button>        
                      <Button 
                        className="ButtonsHeader" 
                        style={{marginTop: '.5rem', marginRight: '.8rem', marginLeft: '.8rem'}}   
                        onClick={() => {toggle ? 
                          oppdaterVisning(finnButikk, finnDato, setVareListe, setPrisliste) :
                          setToggle(!toggle)
                        }} 
                        color="danger" 
                        >{t('add_items')}
                      </Button>
                    </Row>
                </Card>
                  <InputGroup className="no-border">
                    <Input placeholder={t('look_up_item')} id="vareFilter" onChange={e => setVarefilter(e.target.value)}/>
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
                        listetittel={listetittel}
                        setListetittel={setListetittel}
                        listeFilter={listeFilter}
                        setlisteFilter={setlisteFilter}
                      />
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  ) : (opprettNy) ? (
    <>
      <div className="content">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Card>
                  <CardTitle tag="h4" className="text-center">{t('create_new_list')}</CardTitle>
                </Card>
              </CardHeader>
                <CardBody>
                  <Input placeholder={t('list_name')} onChange={e => setListetittel(e.target.value)}/>                                
                <Button
                  className="ButtonsHeader" 
                  style={{marginTop: '.5rem', marginRight: '.8rem'}}   
                  onClick={() =>setOpprettNy(false)}         
                  color="danger" 
                  >{t('go_back')}
                </Button> 
                <Button
                  className="ButtonsHeader" 
                  style={{marginTop: '.5rem', marginRight: '.8rem'}}   
                  onClick={(e) => {
                    BackendApi.nyHandlelisteAdd(jsonwebtoken.decode(localStorage.getItem('token')).epost, listetittel) 
                    setOpprettNy(false)
                    window.location.reload(false)
                  }}         
                  color="danger" 
                  >{t('create_new_list')}
                </Button> 
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
              <CardTitle tag="h4" className="text-center">{t('create_new_list')}</CardTitle>
                <Row className="justify-content-center">  
                  <Button onClick={() =>setRedigering(true)} color="danger">{t('change_editable_view')}</Button>
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
                      listetittel={listetittel}
                      setListetittel={setListetittel}
                      listeFilter={listeFilter}
                      setlisteFilter={setlisteFilter}
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


               {/*     <Row className="justify-content-center">
                     <UncontrolledDropdown size="lg">                     
                        <DropdownToggle 
                          style={{backgroundColor: 'transparent', width: '10em'}} 
                          caret>{finnButikk}
                        </DropdownToggle>
                        <DropdownMenu 
                          onClick={() => { }}>
                            <DropdownItem onClick={() =>{
                              setFinnButikk(butikker[0]) 
                              oppdaterVisning(butikker[0], finnDato, setVareListe, setPrisliste)
                              setToggle(!toggle)
                            }}>{butikker[0]}</DropdownItem>
                            <DropdownItem onClick={() => {
                              setFinnButikk(butikker[1])
                              oppdaterVisning(butikker[1], finnDato, setVareListe, setPrisliste)
                              setToggle(!toggle)
                            }}>{butikker[1]}</DropdownItem>
                            <DropdownItem onClick={() =>{
                              setFinnButikk(butikker[2]) 
                              oppdaterVisning(butikker[2], finnDato, setVareListe, setPrisliste)
                              setToggle(!toggle)
                            }}>{butikker[2]}</DropdownItem>
                            <DropdownItem onClick={() =>{
                              setFinnButikk(butikker[3]) 
                              oppdaterVisning(butikker[3], finnDato, setVareListe, setPrisliste)
                              setToggle(!toggle)
                            }}>{butikker[3]}</DropdownItem>
                            <DropdownItem onClick={() =>{
                              setFinnButikk(butikker[4]) 
                              oppdaterVisning(butikker[4], finnDato, setVareListe, setPrisliste)
                              setToggle(!toggle)
                            }}>{butikker[4]}</DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown> */}


                           {/*        </Row>   

         <UncontrolledDropdown size="lg">
                        <DropdownToggle 
                            style={{backgroundColor: 'transparent', width: '10em'}} 
                            caret>{listetittel}
                          </DropdownToggle>
                          <DropdownMenu 
                            onClick={() => {  }}>                              
                              <DropdownItem onClick={() =>{
                                setListetittel(lister[0])
                                hentHandliste(brukerMail.epost, lister[0], setVareListe, setPrisliste, setHandleliste, handleliste, prisliste)
                              }}>{lister[0]}</DropdownItem>
                              <DropdownItem onClick={() => {
                                setListetittel(lister[1])
                                hentHandliste(brukerMail.epost, lister[1], setVareListe, setPrisliste, setHandleliste, handleliste, prisliste)
                              }}>{lister[1]}</DropdownItem>
                              <DropdownItem onClick={() =>{
                                setListetittel(lister[2])
                                hentHandliste(brukerMail.epost, lister[2], setVareListe, setPrisliste, setHandleliste, handleliste, prisliste)
                              }}>{lister[2]}</DropdownItem>
                              <DropdownItem onClick={() =>{
                                setListetittel(lister[3])
                                hentHandliste(brukerMail.epost, lister[3], setVareListe, setPrisliste, setHandleliste, handleliste, prisliste)
                              }}>{lister[3]}</DropdownItem>
                              <DropdownItem onClick={() =>{
                                setListetittel(lister[4])
                                hentHandliste(brukerMail.epost, lister[4], setVareListe, setPrisliste, setHandleliste, handleliste, prisliste)
                              }}>{lister[4]}</DropdownItem>                         
                        </DropdownMenu>
                      </UncontrolledDropdown>   
                    </Row> */}