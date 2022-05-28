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
                    <CardTitle><h4>{t('about_project_lbl')}</h4></CardTitle>
                </CardHeader>
                <CardBody className="ml-auto mr-auto">
                    <CardText><h5>
                    {t('about_project_text')}
                    </h5>
                    </CardText>
                </CardBody>
            </Card>
          <Row className="ml-auto mr-auto" md="6">
            <Card className="card-user">
                <CardHeader className="ml-auto mr-auto">
                    <CardTitle style={{textAlign: "center"}}><h5>Daniel Vikan</h5></CardTitle>
                    <img style={{height: "300px"}}
                        alt="..."
                        src={window.location.origin + '/locales/profile_picture/Daniel.jpg'} />
                </CardHeader>
                <CardBody className="ml-auto mr-auto">
                    <CardText>
                    <h6 style={{textAlign: "center", paddingTop : "10px"}}>
                    {t('title_daniel')}
                    </h6> 
                    <br/>    
                    {t('about_daniel')}
                    </CardText>
                </CardBody>
            </Card>
            <Card className="card-user">
                <CardHeader className="ml-auto mr-auto">
                    <CardTitle style={{textAlign: "center"}}><h5>Gaute Hermansen </h5></CardTitle>
                    <img style={{height: "300px"}}
                        alt="..."
                        src={window.location.origin + '/locales/profile_picture/Gaute.jpg'} />
                </CardHeader>
                <CardBody className="ml-auto mr-auto">
                    <CardText>
                    <h6 style={{textAlign: "center", paddingTop : "10px"}}>
                    {t('title_gaute')}
                    </h6> 
                    <br/>    
                    {t('about_gaute')}
                    </CardText>
                </CardBody>
            </Card>
            <Card className="card-user">
                <CardHeader className="ml-auto mr-auto">
                    <CardTitle style={{textAlign: "center"}}><h5>Tore Broberg</h5></CardTitle>
                    <img style={{height: "300px"}}
                        alt="..."
                        src={window.location.origin + '/locales/profile_picture/ToreBroberg.jpg'} />
                </CardHeader>
                <CardBody className="ml-auto mr-auto">
                    <CardText>
                    <h6 style={{textAlign: "center", paddingTop : "10px"}}>
                    {t('title_tore')}
                    </h6> 
                    <br/>    
                    {t('about_tore')}
                    </CardText>
                </CardBody>
            </Card>
            <Card className="card-user">
                <CardHeader className="ml-auto mr-auto">
                    <CardTitle style={{textAlign: "center"}}><h5>Leonard Rygh</h5></CardTitle>
                    <img style={{height: "300px"}}
                        alt="..."
                        src={window.location.origin + '/locales/profile_picture/Leonard.jpg'} />
                </CardHeader>
                <CardBody>
                    <CardText>
                    <h6 style={{textAlign: "center", paddingTop : "10px"}}>
                    {t('title_leonard')}
                    </h6> 
                    <br/>    
                    {t('about_leonard')}
                    </CardText>
                </CardBody>
            </Card>
            <Card className="card-user">
                <CardHeader className="ml-auto mr-auto">
                    <CardTitle style={{textAlign: "center"}}><h5>Dmitriy Safiullin</h5></CardTitle>
                    <img style={{height: "300px"}}
                        alt="..."
                        src={window.location.origin + '/locales/profile_picture/Dmitriy.jpg'} />
                </CardHeader>
                <CardBody>
                    <CardText>
                    <h6 style={{textAlign: "center", paddingTop : "10px"}}>
                        {t('title_dmitriy')}
                        </h6> 
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