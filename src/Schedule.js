import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Schedule extends React.Component{
    render(){
      return(
        <div>
          <Container>
            <Row>
              <Col>
                Mid Sched
              </Col>
            </Row>
            <Row>
              <Col>
                Bottom Sched
              </Col>
            </Row>
          </Container>
        </div>
      )
    }
}