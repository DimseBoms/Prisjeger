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
  Button,
  Label,
} from "reactstrap";
import { useEffect } from "react";
import ListeElementer from "./ListeElementer";
import HandleKlasse from "./HandleKlasse";

/* totalPris aggregerer alle enhetspriser lagt til i handlelisten*/
let totalPris = 0

async function getTotal() {
  return totalPris
}

 class ListeFyll extends React.Component {
  constructor(props) {
    super(props);

    const alleElementer = [];
    /* hvilken egenskaper (attributter) + startverdi (state) */
    this.state = {
      antall: 0,
      enhetspris: 10,  /*Pris pr enhet fra server */
      pris: 10,
      prisListe: [],
      items: [],
    }

  }

  /*
  getTotalsum() {
      let oppdater = this.state.alleElementer
      let hentPris = this.state.pris
      let totalsum = 
      oppdater.forEach(element => {
        hentPris += hentPris  
    });
    return hentPris
  }

  */

   async getTotalpris() {
      return totalPris
  }


 
  /* TRENGER VI DENNE? */
  updateantall(event) {
    this.setState({
      pris: event.target.value
    });
  }

    /* TRENGER VI DENNE? */
    finnTotalsum(radPris) {
        this.state.prisListe.push(radPris)
        this.setState({
     
        });
      }

  /**
   * Metode for å øke tellevariabel "antall"
   * Øker med 1 for hvert trykk på knapp
   */
  inkrementer() {
     let leggTil = this.state.antall + 1
     let nyPris = this.state.enhetspris * leggTil

     console.log("Pris pr rad : " + this.state.pris)
     totalPris += this.state.enhetspris
     console.log("TotalSum : " + totalPris)

     this.setState({
       antall: leggTil,
       pris: nyPris,
     });

   }

   oppdaterTotalpris() {
    
  }

   /**
    * Metode for å redusere tellevariabel "antall"
    * Reduserer med 1 for hvert trykk på knapp
    */
   dekrementer() {
     let leggTil = this.state.antall - 1
     let nyPris = this.state.enhetspris * leggTil

     console.log("Pris pr rad : " + this.state.pris)
     totalPris -= this.state.enhetspris
     console.log("TotalPris : " + totalPris)
 
     this.setState({
       antall: leggTil,
       pris: nyPris
     });
   }

   /**
    * Metode for å legge til nytt element i ny rad
    * Kan eks. benyttes til sletteknapp, infoknapp +
    */
  handleClick() {
    let items = this.state.items;
    items.push(this.state.antall);

    this.setState({
      items: items 
    });
  }

  /**
   * Metode for å oppdatere innhold i tabell "items"
   * @param {*} i 
   * @param {*} event 
   */
  handleItemChanged(i, event) {
    var items = this.state.items;
    items[i]  = event.target.value;

    this.setState({
      items: items
    });
  }

  /**
   * Metode for å slette opprettet rad
   * @param {*} i 
   */
  handleItemDeleted(i) {
    var items = this.state.items;

    items.splice(i, 1);

    this.setState({
      items: items
    });
  }

  renderRows() {
    var context = this;

    return  this.state.items.map(function(o, i) {
              return (
                <tr>
                  <td>
                    <Button className="btn-round" color="primary"
                      onClick={context.handleItemDeleted.bind(context, i)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            });
  }

  render() {
    return (
      <div>

        <Button
          type="text"
          value={this.state.antall}
          onChange={this.finnTotalsum.bind(this)}
        >{this.state.pris}
        </Button>   


        <Button
          className="btn-round" 
          color="danger"
          value={this.state.antall}
          onClick={this.dekrementer.bind(this)}
        >{this.state.antall}
        </Button>   

        <Button 
          className="btn-round" 
          color="primary"
          value={this.state.antall}
          onClick={this.inkrementer.bind(this)}
        >{this.state.antall}
        </Button>


        <button 
          className="btn-round" 
          color="warning"
          value={totalPris}
        >{totalPris}
        </button>

        <table className="">

<tbody>
  {this.renderRows()}
</tbody>

</table>

      </div>
    );
  }
}



/* DATA FRA SERVER MÅ INNEHOLDE PRIS PR VARE PR BUTIKK +  ANTALL PR VARE PR BRUKER */
/* HVIS BRUKER IKKE HAR ET ANTALL AV DE VARENE SOM LIGGER I FILTER (VISNING), MÅ ANTALL VÆRE 0 */
/* SUMMERT PRIS PR RAD I HANDLELISTE KAN REGNES UT (PRIS * ANTALL) */
/* DA KAN VERDIENE LEGGES I SAMME DYNAMISKE TABELL/ MAP, SOM KAN VISES TIL BRUKER SOM : TEKST, SUM, ANTALL (KNAPP)*/
/* HVERT TRYKK PÅ KNAPPEN SKAL ØKE ANTALL MED EN - PR RAD. SUM OG TOTALSUM MÅ REGNES UT PÅ NYTT */

/* TOTALSUM SKAL VISES PÅ TOPPEN */
/* BRUKER MÅ KUNNE VELGE SIN LISTE - EN ELLER FLER */
/* BRUKER BØR KUNNE HENTE OPP EN ANNEN BRUKERS (DELTE) LISTE(R) */
/* HVERT TRYKK PÅ KNAPPEN SKAL ØKE ANTALL MED EN - PR RAD. SUM OG TOTALSUM MÅ REGNES UT PÅ NYTT */

function FiltrertHandleliste({vareListe, vareFilter, totalsum, antallListe, teller}) {

  const filtrertHandleliste = vareListe.filter(v => {
    console.log( v.toLowerCase().indexOf((vareFilter.toLowerCase())) !== -1 ) /*utskrift */
    return v.toLowerCase().indexOf((vareFilter.toLowerCase())) !== -1   /*returnerer true / false (finnes i filter?) */
  })

  const [knappTeller, setKnappTeller] = useState(0)
  const [radTeller, setRadTeller] = useState(0)
  const [testTab, setTestTab] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const [test, setTest] = useState({
    antall: 0,
    enhetspris: 10,
    pris: 10,
    prisListe: [],
    items: [],
  })

  return (
    <>
      {filtrertHandleliste.map((vare, index) => { /* her kommer varene som ligger i filteret */


return (
   <tr key={index}>
          <td>{vare}</td>
      {/*   <td><Button onClick={() => setRadTeller(radTeller + 1)}>{radTeller}</Button></td> 
          <td><Button onClick={() => setKnappTeller(knappTeller + 1)}  className="btn-round" color="primary">{knappTeller}</Button></td> */}
          <td>{<ListeFyll/>}</td>
     {/*}    <td><ListeFyll/></td> */}
        </tr> 
      )})}
    </>
  )
}



function Handleliste(totalPris) {
  // initialiserer React komponent med de nødvendige state variablene
  
    const [vareListe, setVareListe] = useState([])
    const [varefilter, setVarefilter] = useState("")
    const [butikkliste, setButikkliste] = useState([])
    const [antallListe, setAntallListe] = useState([])
    const [teller, setTeller] = useState(0)
    const [rad, setRad] = useState([])
    const [handel, setHandel] = useState({})
    const [totalsum, setTotalsum] =useState(0)


    useEffect(() => {
      PrisdataService.getVareliste().then((response) => {
        setVareListe(response.data)

    /*    ListeElementer.getTotal().then((response) => {setTotalsum(response.data)}) */
 
      })
    }, [])

  return (
    <>
      <div className="content">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Handleliste</CardTitle>
                  <h1>Totalt beløp : {totalsum}</h1>
                  <InputGroup className="no-border">
                    <Input placeholder="Filtrering" id="vareFilter" onChange={e => {
                      setVarefilter(e.target.value) 
                      setRad(rad + 1)
                      setTotalsum(totalsum += totalPris)
                    }}/> 
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
                      <th className="text-center">Legg til varer i handleliste</th>
                    </tr>
                  </thead>
                  <tbody>
                      <FiltrertHandleliste vareListe={vareListe} vareFilter={varefilter} 
                      rad={rad} handel={handel} totalsum={totalsum}/>             
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
