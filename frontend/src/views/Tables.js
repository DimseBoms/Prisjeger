/*
Varefilter som ligger til grunn for handlelisten.
Dette komponentet viser for øyeblikket kun listen over alle tilgjengelige varer.
*/
import React from "react";
import BackendApi from "../axios/backendApi";
import { useState } from "react";
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
    const { t, i18n } = useTranslation();
    const [vareListe, setVareListe] = useState([])
    const [varefilter, setVarefilter] = useState("")
    const [butikkliste, setButikkliste] = useState([])

    useEffect(() => {
      BackendApi.getVareliste().then((response) => {
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
                <CardTitle tag="h4">{t('ITEMS')}</CardTitle>
                  <InputGroup className="no-border">
                    <Input placeholder={t('filter')} id="vareFilter" onChange={e => setVarefilter(e.target.value)}/>
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
