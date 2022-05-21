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

// reactstrap components
import { Card,
         CardHeader,
         CardBody,
         CardFooter,
         CardTitle,
         Row,
         Col,
         Input,
         Button, } from "reactstrap";

// tesseract importer
import { useState, useRef } from 'react';
import preprocessImage from '../preprocess';
import Tesseract from 'tesseract.js';

function Scanner() {
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  // const [pin, setPin] = useState("");
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
 
  const handleChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]))
  }

  const handleClick = () => {
    
    const canvas = canvasRef.current;
    canvas.width = imageRef.current.width;
    canvas.height = imageRef.current.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(imageRef.current, 0, 0);
    ctx.putImageData(preprocessImage(canvas),0,0);
    const dataUrl = canvas.toDataURL("image/jpeg");
  
    Tesseract.recognize(
      dataUrl,'eng',
      { 
        logger: m => console.log(m) 
      }
    )
    .catch (err => {
      console.error(err);
    })
    .then(result => {
      console.log(result.data.text)
      // Get Confidence score
      let confidence = result.confidence
      // Get full output
      let text = result.data.text
  
      setText("Extracted text: " + text);
      //setPin(patterns);
    })
  
  }

  return (
    <>
    <div className="content">
    <Card>
    <CardHeader>
      <CardTitle tag="h5">Last opp kvittering</CardTitle>
    </CardHeader>
    <div className="App">
      <main className="App-main">
        <CardBody>
          <img 
            src={image} className="App-logo"
            ref={imageRef} 
            />
          <h3></h3>
          <canvas ref={canvasRef} width={0} height={0}></canvas>
            <p></p>
          <div className="pin-box">
            <p> {text} </p>
          </div>
          <input type="file" onChange={handleChange} />
          <Button onClick={handleClick} style={{height:50}}>Convert to text</Button>
        </CardBody>
      </main>
    </div>
  </Card>
  </div>
  </>
  );
}

export default Scanner;
