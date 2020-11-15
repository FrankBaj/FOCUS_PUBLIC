// import logo from './logo.svg';
import './App.css';
import Main from './Main.js';
import Records from './Records.js';
import Schedule from './Schedule.js';
import Settings from './Settings.js';
import React from 'react';
import {
  HashRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap'

class App extends React.Component{
  render(){
    return(
      <div className="App">
      <Container>
       <Router>
         <Row className="justify-content-center">
              <NavLink to="/">
                <div class="Nav-Elem">
                  <Col sm={2}>                
                      <span class="text">Home</span>
                  </Col>
                </div>
              </NavLink>

              <NavLink to="/Records">
                <div class="Nav-Elem">
                  <Col sm={2}>
                      <span class="text">Records</span>
                  </Col>
                </div>
              </NavLink>

              <NavLink to="/Schedule">
                <div class="Nav-Elem">
                  <Col sm={2}>
                      <span class="text">Schedule</span>
                  </Col>
                </div>
              </NavLink>

         </Row>
         <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/Records" component={Records}   />
            <Route path="/Schedule" component={Schedule}   />
         </Switch>
        </Router>
      </Container>
     </div>
    )
  }
}

export default App;
