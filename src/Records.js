import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Records.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Records extends React.Component{
    render(){
      return(
        <div>
          <Container>
            <Row>
              <Col>
                Mid Record
              </Col>
            </Row>
            <Row>
              <Col>
                Bottom Record
              </Col>
            </Row>
          </Container>
        </div>
      )
    }
}