import React from 'react';

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
import Handleliste from './Handleliste';

/* totalPris aggregerer alle enhetspriser lagt til i handlelisten*/
let totalPris = 0

export default class ListeElementer extends React.Component {
  constructor(props) {
    super(props);
    async function getTotal() {
        return totalPris
    }
    const alleElementer = [];
    /* hvilken egenskaper (attributter) + startverdi (state) */
    this.state = {
      antall: 0,
      enhetspris: 10,  /*Pris pr enhet fra server */
      pris: 0,
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

        <table className="">

<tbody>
  {this.renderRows()}
</tbody>

</table>

      </div>
    );
  }
}

