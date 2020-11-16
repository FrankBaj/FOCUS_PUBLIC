import React from 'react';
import './Main.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {Dropdown } from 'react-bootstrap';

import rainEffects from './rainEffects.mp3';
import wind_animal_Effects from './wind_Animal_Sound.mp3';

export default class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      timerStarted: false,
      timerStopped: true,
      
      hours: 0,
      min: 0,
      sec: 0,

      setHours: '',
      setMin: '',
      setSec: '',
      
      captures: [],

      selectedTrack: null,
      player: "stopped",

      vol: 1.0
    }
    this.handleTimerStart = this.handleTimerStart.bind(this);
    this.handleTimerStop = this.handleTimerStop.bind(this);
    this.handleTimerReset = this.handleTimerReset.bind(this);
    this.handleTimerSave = this.handleTimerSave.bind(this);
    this.submitTime = this.submitTime.bind(this);
    this.countDownTimer = this.countDownTimer.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
  }

  handleTimerStart(e){
    e.preventDefault();
    if(this.state.timerStopped){
      this.timer = setInterval(() => {
        this.setState({timerStarted:true, timerStopped:false});
        if(this.state.timerStarted){
          if(this.state.min === 59 && this.state.sec === 59){
            this.setState((prevState) => ({hours: prevState.hours + 1, min: 0, sec: 0}))
          }
          if(this.state.sec === 59){
            this.setState((prevState) => ({min: prevState.min + 1, sec: 0}))
          }else{
            this.setState((prevState) => ({sec: prevState.sec + 1}))
          }   
        }
      }, 1000);
    }
  }

  handleTimerStop(e){
    e.preventDefault();
    this.setState({timerStarted: false, timerStopped:true});
    clearInterval(this.timer);
  }

  handleTimerReset(e){
    this.setState({timerStarted:false, timerStopped:true, sec:0, min:0, hours:0});
    clearInterval(this.timer);
  }

  handleTimerSave(e){
    this.setState((prevState) => ({captures: 
      [...prevState.captures, 
        this.state.hours + ":" + this.state.min + ":" + this.state.sec]
    }))
  }

  countDownTimer(e){
    e.preventDefault();
    if(this.state.timerStopped){
      this.timer = setInterval(() => {
        this.setState({timerStarted:true, timerStopped:false});
        if(this.state.timerStarted){
          if(this.state.hours === 0 && this.state.min === 0 && this.state.sec === 0){
            this.setState({timerStarted: false, timerStopped:true, hours: 0, min: 0, sec: 0});
            clearInterval(this.timer);
          }
          else if(this.state.min === 0 && this.state.sec === 0){
            this.setState((prevState) => ({hours: prevState.hours - 1, min: 59, sec: 59}))
          }
          else if(this.state.sec === 0){
            this.setState((prevState) => ({min: prevState.min - 1, sec: 59}))
          }else{
          this.setState((prevState) => ({sec: prevState.sec - 1}))
          }
        }
      }, 1000);
    }
  }
  

  submitTime(e){
    e.preventDefault();
    const setHours = this.state.setHours;
    const setMin = this.state.setMin;
    const setSec = this.state.setSec;
    if(setHours !== ''){
      this.setState({
        hours: parseInt(setHours,10),
      })
    }
    if(setMin !== ''){
      this.setState({
        min: parseInt(setMin,10),
      })
    }
    if(setSec !== ''){
      this.setState({
        sec: parseInt(setSec,10),
      })
    }
  }

  componentDidUpdate(prevProps, prevState){
      if(this.state.selectedTrack !== prevState.selectedTrack){
        let track;
        switch(this.state.selectedTrack){
          case "Rain":
            track = rainEffects;
          break;
          case "Wind/Animal":
            track = wind_animal_Effects;
          break;
          default:
          break;
        }
        if(track){
          this.player.src = track;
          this.player.play();
          this.setState({player: "playing"});
          this.player.loop = true;
        } 
      }
      if (this.state.player !== prevState.player){
        if(this.state.player === "paused"){
          this.player.pause();
        } else if (this.state.player === "stopped"){
          this.player.pause();
          this.player.currenttime = 0;
          this.setState({selectedTrack: null});
        } else if (
          this.state.player === "playing" &&
          prevState.player === "paused"
        ){
          this.player.play();
          this.player.loop = true;
        }
      }
  }

  changeVolume(e){
    e.preventDefault();
    this.player.volume = e.target.value;
  }
   
    render(){
      const list = [{id: 1, title: "Rain"}, {id: 2, title: "Wind/Animal"}].map(item => {
        return(
          <ul
            id = "sound_List"
            key={item.id}
            onClick={() =>
            this.setState({selectedTrack: item.title})}
          >
            <span id = "sound_elements">
              {item.title} &nbsp; &nbsp; 
            </span>
          </ul>
        );
      });
      return(
        <div>
          <Container>

            <div id="circle">
              <Row>
                <Col>
                  <span id="time"> 
                    {this.state.hours + ":" + this.state.min + ":" + this.state.sec}
                  </span>
                </Col>
              </Row>
            </div>

            <div id="time-opt">
              <Form.Group id="input_forms">
                <Form onSubmit={this.submitTime}>
                  <InputGroup className="mb-3" size="md">
                    < InputGroup.Prepend>
                      <InputGroup.Text id="label">Enter a Time: </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      id = "input_text"
                      type ="text"
                      placeholder = "Hour"
                      defaultValue = {this.state.setHours}
                      onChange = {(e) => this.setState({setHours: e.target.value})}
                    />
                    <Form.Control
                      id = "input_text"
                      type ="text"
                      placeholder = "Minute"
                      defaultValue = {this.state.setMin}
                      onChange = {(e) => this.setState({setMin: e.target.value})}              
                    />
                    <Form.Control
                      id = "input_text"
                      type ="text"
                      placeholder = "Second"
                      defaultValue = {this.state.setSec}
                      onChange = {(e) => this.setState({setSec: e.target.value})}              
                    />
                    <InputGroup.Append>
                      <Button id = "input_text" variant="outline-secondary" type="submit" value="Submit" >Submit</Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Form>
                &nbsp;
                <DropdownButton
                  size="md"
                  drop={'up'}
                  title={'Timer Options'}
                  id="input_forms"
                >
                  <Dropdown.Item id="input_forms" as="button" onClick={this.handleTimerStart}>Start Count-up Timer</Dropdown.Item>
                  <Dropdown.Item id="input_forms" as="button" onClick={this.countDownTimer}>Start Count-down Timer</Dropdown.Item>
                  <Dropdown.Item id="input_forms" as="button" onClick={this.handleTimerStop}>Stop Timer</Dropdown.Item>
                  <Dropdown.Item id="input_forms" as="button" onClick={this.handleTimerReset}>Reset Timer</Dropdown.Item>
                </DropdownButton>
              </Form.Group>
            </div>

            <div id="bottom">
              <Row>
                <Col>
                  <span id="text">
                      <ListGroup horizontal>
                        {list}
                        <Form>
                          <Form.Label id ="slider" >Volume:</Form.Label>
                            <Form.Group controlId="formBasicRangeCustom">
                              <Form.Control id ="slider"
                                type="range"
                                min = '0.0'
                                max = '1.0'
                                step = '0.01'
                                defaultValue = {this.state.vol}
                                custom
                                onChange = {this.changeVolume}
                              />
                            </Form.Group>
                        </Form>
                        {this.state.player === "paused" && (
                          <span id="sound_buttons" onClick={() => this.setState({player: "playing"})}>
                            Play
                          </span>
                        )}
                        {this.state.player === "playing" && (
                          <span id="sound_buttons" onClick={() => this.setState({player: "paused"})}>
                            Pause
                          </span>
                        )}
                        {/* {this.state.player === "playing" || this.state.player === "paused" ? (
                          <span id="sound_buttons" onClick={() => this.setState({player: "playing"})}>
                            Stop 
                          </span>
                        ) : (
                          ""
                        )}  */}
                      </ListGroup>          
                      <audio ref={ref => this.player = ref}/>
                    </span>
                </Col>
              </Row>
            </div>



            <div id="below_bottom">
            {/* <div>
              <Col>
              {this.state.captures.map((time, index) => {
                return <code>{"Capture" + (index + 1) + "--" + time }</code>
              })}
              </Col>
            </div> */}
            </div>
          </Container>
        </div>
      )
    }
  }