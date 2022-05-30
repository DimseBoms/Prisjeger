import React from "react";
import { useTranslation } from 'react-i18next';

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col, CardTitle, CardText } from "reactstrap";

function User() {
  const {t} = useTranslation();
  return (
      <div className="content" style={{display: "flex-inline", width:"100%"}}>
          <Card className="card-body">
                <CardHeader className="ml-auto mr-auto">
                    <CardTitle tag="h5" >{t('about_project_lbl')}</CardTitle>
                </CardHeader>
                <CardBody className="ml-auto mr-auto">
                    <CardText>
                    {t('about_project_text')}
                    </CardText>
                </CardBody>
            </Card>
          <Row className="ml-auto mr-auto" md="6">
            <Card className="card-user">
                <CardHeader className="ml-auto mr-auto">
                    <CardTitle style={{textAlign: "center"}}>Daniel Vikan</CardTitle>
                    <img style={{height: "300px"}}
                        alt="..."
                        src={window.location.origin + '/locales/profile_picture/Daniel.jpg'} />
                </CardHeader>
                <CardBody className="ml-auto mr-auto">
                    <CardText style={{textAlign: "center", paddingTop : "10px"}}>
                    {t('title_daniel')}
                    <br/>    
                    {t('about_daniel')}
                    </CardText>
                </CardBody>
            </Card>
            <Card className="card-user">
                <CardHeader className="ml-auto mr-auto">
                    <CardTitle style={{textAlign: "center"}}>Gaute Hermansen</CardTitle>
                    <img style={{height: "300px"}}
                        alt="..."
                        src={window.location.origin + '/locales/profile_picture/Gaute.jpg'} />
                </CardHeader>
                <CardBody className="ml-auto mr-auto">
                    <CardText style={{textAlign: "center", paddingTop : "10px"}}>
                    {t('title_gaute')}
                    <br/>    
                    {t('about_gaute')}
                    </CardText>
                </CardBody>
            </Card>
            <Card className="card-user">
                <CardHeader className="ml-auto mr-auto">
                    <CardTitle style={{textAlign: "center"}}>Tore Broberg</CardTitle>
                    <img style={{height: "300px"}}
                        alt="..."
                        src={window.location.origin + '/locales/profile_picture/ToreBroberg.jpg'} />
                </CardHeader>
                <CardBody className="ml-auto mr-auto">
                    <CardText style={{textAlign: "center", paddingTop : "10px"}}>
                    {t('title_tore')}
                    <br/>    
                    {t('about_tore')}
                    </CardText>
                </CardBody>
            </Card>
            <Card className="card-user">
                <CardHeader className="ml-auto mr-auto">
                    <CardTitle style={{textAlign: "center"}}>Leonard Rygh</CardTitle>
                    <img style={{height: "300px"}}
                        alt="..."
                        src={'/locales/profile_picture/Leonard.jpg'} />
                </CardHeader>
                <CardBody>
                    <CardText style={{textAlign: "center", paddingTop : "10px"}}>
                    {t('title_leonard')}
                    <br/>    
                    {t('about_leonard')}
                    </CardText>
                </CardBody>
            </Card>
            <Card className="card-user">
                <CardHeader className="ml-auto mr-auto">
                    <CardTitle style={{textAlign: "center"}}>Dmitriy Safiullin</CardTitle>
                    <img style={{height: "300px"}}
                        alt="..."
                        src={window.location.origin + '/locales/profile_picture/Dmitriy.jpg'} />
                </CardHeader>
                <CardBody>
                    <CardText style={{textAlign: "center", paddingTop : "10px"}}>
                        {t('title_dmitriy')}
                    <br/>    
                    {t('about_dmitriy')}
                    </CardText>
                </CardBody>
            </Card>
        </Row>
      </div>
  );
}

export default User;