/**
 * Denne viewen har i mål å vise priser på de forskjellige butikkene på et enkel vare
 * Det er også meningen å være diagrammer og grafer for å vise hvordan prisene endrer seg 
 * og lettere for å sammenligne.
 * 
 * Laget av Daniel og Gaute
 */

//React-hooks
import React, { useEffect, useState } from "react";

//Graf
import { Bar } from "react-chartjs-2";

//Oversetting
import { useTranslation } from 'react-i18next';

//React-strap
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Col,
  Input,
  Table,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

//backendApi er for å hente vare
import BackendApi from "../axios/backendApi";

//sampledata inneholder dataene som trengs for å lage diagrammer
import {
  labels,
  datasets,
  options
} from "../variables/sampledata"


/**
 * @param {*} props 
 * @returns
 * 
 * Dette er funksjonen som return komponentene til å lage diagrammer.
 * Hvis at vare har ikke blitt valgt ennå, vil den return ingenting
 * Hvis at vare har blitt valgt, vil den sette data inn i <Bar> som er en React-diagram 
 */
function Graf(props) {
  return props.grafLaget !== true ? (
    <></>
  ) : (
    <Card className="card-graf">
      <CardBody>
        <div className="chart-line-standard">
          <Bar
            data={props.chart.data}
            options={props.chart.options}
            width={700}
            height={400} 
          />
        </div>
        <div className="chart-line-potrait">
          Vennligst bytt til landskap for å se graf
        </div>
      </CardBody>
    </Card>
  )
}

/**
 * @param {*} props 
 * @returns 
 * Dette er funksjonen som return listen med priser på varen som blir valgt.
 * Hvis at vare ikke er valgt, return ingenting
 * Hvis at vare blir fortsatt hentet fra database, return <Loading..>
 * Hvis at vare er hentet, lag komponent og hent <ListeTR/> komponetene
 */
function Liste(props) {
  const {t} = useTranslation();
  if (props.grafLaget !== true) {
    return <></>
  } else if (props.loading == true) {
    return (
      <Card className="card-tabell">
        <CardBody><h2>Loading...</h2></CardBody>
      </Card>
    )
  } else if (props.loading == false) {
    return (
      <Card className="card-tabell">
        <CardHeader><h6>{props.vareNavn}</h6></CardHeader>
        <CardBody>
          <>{t('last_update_lbl')} {props.vare[0].dato} {t('date_format')}</>
          <Table bordered hover size="sm" style={{backgroundColor: "unset"}}>
            <tbody>
              <ListeTR butikkNR={0} props={props}/>
              <ListeTR butikkNR={1} props={props}/>
              <ListeTR butikkNR={2} props={props}/>
              <ListeTR butikkNR={3} props={props}/>
              <ListeTR butikkNR={4} props={props}/>
              <ListeTR butikkNR={5} props={props}/>
            </tbody>
          </Table>
        </CardBody>
      </Card>  
    )  
  } else return <>Error</>;
}

/**
 * @param {*} param0 
 * @returns 
 * 
 * Dette er funksjonen som return <tr> med prisene på de forskjellige butikkene
 * Feltet blir også grønn hvis at prisen er mindre eller = lavestePris
 * Ene parameteren er butikkNr, som gjør at funksjonen vet hvilken butikk som skal returneres
 */
function ListeTR({butikkNR, props}) {
  //For å fargelegge listeradene om de er lavest pris
  let [lavestePris, setLavestePris] = useState(999);

  for (let i = 0; 6 > i; i++) {
    let iPris;
    switch (i) {
      case 0: iPris = props.vare[0].priser['Kiwi']; break;
      case 1: iPris = props.vare[0].priser['Meny']; break;
      case 2: iPris = props.vare[0].priser['Coop Obs']; break;
      case 3: iPris = props.vare[0].priser['Rema 1000']; break;
      case 4: iPris = props.vare[0].priser['Spar']; break;
      case 5: iPris = props.vare[0].priser['Coop Extra']; 
    }
    if (iPris < lavestePris) {
      setLavestePris(iPris);
    }
  }

  switch (butikkNR) {
    //Kiwi
    case 0: {
      if (props.vare[0].priser['Kiwi'] <= lavestePris) {
        return (
          <tr>
            <td bgcolor="lightgreen">{props.butikkListe[0]}</td>
            <td bgcolor="lightgreen">{props.vare[0].priser['Kiwi']} kr</td>
          </tr> 
        )   
      } else {
        return (
          <tr>
            <td>{props.butikkListe[0]}</td>
            <td>{props.vare[0].priser['Kiwi']} kr</td>
          </tr>
        ) 
      }
    }
    //Meny
    case 1: {
      if (props.vare[0].priser['Meny'] <= lavestePris) {
        return (
          <tr>
            <td bgcolor="lightgreen">{props.butikkListe[1]}</td>
            <td bgcolor="lightgreen">{props.vare[0].priser['Meny']} kr</td>
          </tr> 
        )   
      } else {
        return (
          <tr>
            <td>{props.butikkListe[1]}</td>
            <td>{props.vare[0].priser['Meny']} kr</td>
          </tr>
        ) 
      }
    }
    //Coop Ops
    case 2: {
      if (props.vare[0].priser['Coop Obs'] <= lavestePris) {
        return (
          <tr>
            <td bgcolor="lightgreen">{props.butikkListe[2]}</td>
            <td bgcolor="lightgreen">{props.vare[0].priser['Coop Obs']} kr</td>
          </tr> 
        )   
      } else {
        return (
          <tr>
            <td>{props.butikkListe[2]}</td>
            <td>{props.vare[0].priser['Coop Obs']} kr</td>
          </tr>
        ) 
      }
    }
    //Rema 1000
    case 3: {
      if (props.vare[0].priser['Rema 1000'] <= lavestePris) {
        return (
          <tr>
            <td bgcolor="lightgreen">{props.butikkListe[3]}</td>
            <td bgcolor="lightgreen">{props.vare[0].priser['Rema 1000']} kr</td>
          </tr> 
        )   
      } else {
        return (
          <tr>
            <td>{props.butikkListe[3]}</td>
            <td>{props.vare[0].priser['Rema 1000']} kr</td>
          </tr>
        ) 
      }
    }
    //Spar
    case 4: {
      if (props.vare[0].priser['Spar'] <= lavestePris) {
        return (
          <tr>
            <td bgcolor="lightgreen">{props.butikkListe[4]}</td>
            <td bgcolor="lightgreen">{props.vare[0].priser['Spar']} kr</td>
          </tr> 
        )   
      } else {
        return (
          <tr>
            <td>{props.butikkListe[4]}</td>
            <td>{props.vare[0].priser['Spar']} kr</td>
          </tr>
        ) 
      }
    }
    //Coop Extra
    case 5: {
      if (props.vare[0].priser['Coop Extra'] <= lavestePris) {
        return (
          <tr>
            <td bgcolor="lightgreen">{props.butikkListe[5]}</td>
            <td bgcolor="lightgreen">{props.vare[0].priser['Coop Extra']} kr</td>
          </tr> 
        )   
      } else {
        return (
          <tr>
            <td>{props.butikkListe[5]}</td>
            <td>{props.vare[0].priser['Coop Extra']} kr</td>
          </tr>
        ) 
      }
    }
  }
}

/**
 * @param {*} loading 
 * @returns 
 * Hvis at loading er true, ha <>Loading</> på skjermen
 */
function LoadingScreen(loading) {
  return loading == true ? (
    <h1>Loading...</h1>
  ) : (
    <></>
  )
}

/**
 * @returns 
 * Dette er hoved-funksjonen som inneholder alt av komponenter som blir laget
 */
function Dashboard() {
  //Hooks og variabler
  const {t} = useTranslation();
  const arr = [t('last_update_lbl'), t('date_format')]
  let [grafLaget, setGrafLaget] = useState(false);
  let [loading, setLoading] = useState(false);
  const [vareNavn, setVareNavn] = useState("");
  const [chart, setChart] = useState([]);
  const [vare, setVare] = useState([]);
  const [butikkListe, setButikkListe] = useState([]);
  const [vareListe, setVareListe] = useState([]);
  const [varefilter, setVarefilter] = useState("");

  //grafLaget og loading er dependency, så når de er forandre til useEffect() skje
  useEffect(() => {
    //Hvis at vare har ikke blitt søkt opp, så lag blank
    if (grafLaget) {
      BackendApi.getVare(vareNavn).then(response => {
        setVare(response.data);
        for (let i = 0; i < 6; i++) {
          switch (i) {
            case 0: datasets[0].data[i] = response.data[0].priser['Kiwi']; break;
            case 1: datasets[0].data[i] = response.data[0].priser['Meny']; break;
            case 2: datasets[0].data[i] = response.data[0].priser['Coop Obs']; break;
            case 3: datasets[0].data[i] = response.data[0].priser['Rema 1000']; break;
            case 4: datasets[0].data[i] = response.data[0].priser['Spar']; break;
            case 5: datasets[0].data[i] = response.data[0].priser['Coop Extra']; break;
          }
        }
        setLoading(false); 
      });  
      BackendApi.getButikkliste().then((response) => {
        for (let i = 0; i < 6; i++) {
          setButikkListe(response.data);
        }
      });
      //Setter innholdet i grafen
      setChart({
        data: (canvas) => {
          return {
            labels: labels,
            datasets: datasets,
          }
        },
        options: options,
      });
    } 
    BackendApi.getVareliste().then((response) => {
      setVareListe(response.data)
    })
  }, [grafLaget, loading]);

  //Lager dropdown items når søker varer
  function FiltrertVareliste({vareListe, vareFilter}) {
    const filtrertVareliste = vareListe.filter(v => {
      return v.toLowerCase().indexOf((vareFilter.toLowerCase())) !== -1
    })
    return (
      <>
        {filtrertVareliste.map((vare, index) => (
            <DropdownItem key={index} onClick={(e) => {
              setLoading(true);
              setGrafLaget(true); 
              setVareNavn(e.target.innerText)}}>
                {vare}
            </DropdownItem>
        ))}
      </>
    )
  }

  //Dashboard return
  return (
    <>
      <div className="content">
          <Col md = {11}>
          <Card className="card-tabell">
              <CardHeader>
                <CardTitle tag="h4">{t('price_comparison')}</CardTitle>
                <>{vareNavn}</>
              </CardHeader>
              <CardBody>
                <UncontrolledDropdown style={{padding: "0px"}}>
                  <DropdownToggle style={{padding: "0px"}}>
                    <Input placeholder={t('look_up_item')} id="vareFilter" onChange={e => setVarefilter(e.target.value)}/>
                  </DropdownToggle>
                  <DropdownMenu style={{ maxHeight: "300px", overflow:"scroll"}}>
                      <FiltrertVareliste vareListe={vareListe} vareFilter={varefilter} />
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardBody>
            </Card>
            <Liste grafLaget = {grafLaget} 
                   vareNavn = {vareNavn} 
                   vare = {vare} 
                   loading = {loading} 
                   butikkListe = {butikkListe}
                   />
          </Col>
        <Graf chart = {chart} 
              grafLaget = {grafLaget}/>
      </div>
    </>
  );
}

export default Dashboard;
