import React from 'react';
import './Main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Main extends React.Component{
    render(){
      return(
        <div>
          <Container>
            <div>
              <Row>
                <Col>
                  <span id="title"> F O C U S </span>
                </Col>
              </Row>
            </div>

            <div id="circle">
              <Row>
                <Col>
                  <span id="time"> 1:30:00 </span>
                </Col>
              </Row>
            </div>

            <div id="time-opt">
              <Row>
                <Col>
                  <span id="time-text1">Start Timer</span>
                </Col>
                <Col>
                  <span id="time-text2">Modify Timer</span>
                </Col>
              </Row>
            </div>

            <div id="bottom">
              <Row>
                <Col>
                  <span id="text">
                    Bottom Main
                  </span>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      )
    }
  }