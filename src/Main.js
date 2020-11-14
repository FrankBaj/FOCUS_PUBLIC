import React from 'react';
import './Main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import rainEffects from './rainEffects.mp3';
import wind_animal_Effects from './wind_Animal_Sound.mp3'

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
        case "Rain Effects":
          track = rainEffects;
        break;
        case "Wind/Animal Effects":
          track = wind_animal_Effects;
        break;
        default:
        break;
      }
      if(track){
        this.player.src = track;
        this.player.play()
        this.setState({player: "playing"})
      } 
    }
    if (this.state.player !== prevState.player){
      if(this.state.player === "paused"){
        this.player.pause();
      } else if (this.state.player === "stopped"){
        this.player.pause();
        this.player.currenttime = 0;
        this.setState({selectedtrack: null});
      } else if (
        this.state.player === "playing" &&
        prevState.player === "paused"
      ){
        this.player.play()
      }
    }
  }

  changeVolume(e){
    e.preventDefault();
    // const newVol = this.state.vol;
    // this.setState({
    //   vol: e.target.value
    // });
    this.player.volume = e.target.value;
  }
   
    render(){
      const list = [{id: 1, title: "Rain Effects"}, {id: 2, title: "Wind/Animal Effects"}].map(item => {
        return(
          <span
            key={item.id}
            onClick={() => this.setState({selectedTrack: item.title})}
          >
            {item.title}
          </span>
        );
      });
      return(
        <div>
          <Container>
            <div>
              <Row>
                <Col>
                  {/* <span id="title"> F O C U S </span> */}
                </Col>
              </Row>
            </div>

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
              <Row>
                <Col>
                  <span id="time-text1" onClick={this.handleTimerStart}>Start Timer</span>
                </Col>
                <Col>
                  <span id="time-text3" onClick={this.handleTimerSave}>Save Timer</span>
                </Col>
                <Col>
                  <span id="time-text2" onClick={this.handleTimerStop}>Stop Timer</span>
                </Col>
                <Col>
                  <span id="time-text4" onClick={this.handleTimerReset}>Reset Timer</span>
                </Col>
                <Col>
                  <span id="time-text5" onClick={this.countDownTimer}>Start Countdown</span>
                </Col>
              </Row>
            </div>

            <div id="bottom">
              <Row>
                <Col>
                  <span id="text">        
                      {list}
                      <br/>                                              
                      {this.state.player === "paused" && (
                        <span onClick={() => this.setState({player: "playing"})}>
                          Play
                        </span>
                      )}
                      {this.state.player === "playing" && (
                        <span onClick={() => this.setState({player: "paused"})}>
                          Pause
                        </span>
                      )}
                      {this.state.player === "playing" || this.state.player === "paused" ? (
                        <span onClick={() => this.setState({player: "playing"})}>
                          Stop
                        </span>
                      ) : (
                        ""
                      )}           
                    <audio ref={ref => this.player = ref}/>
                  </span>
                </Col>
              </Row>
            </div>

            <Form>
              <Form.Group controlId="formBasicRangeCustom">
                <Form.Label>Volume:</Form.Label>
                <Form.Control
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

            <div id="below_bottom">
              <Row>
                <Col>
                  <Form onSubmit={this.submitTime}>
                    <Form.Row>
                    <Form.Label>Enter a Time:</Form.Label>
                      <Form.Group as={Col} sm="2">
                        <Form.Control
                          type ="text"
                          placeholder = "Input Hour"
                          defaultValue = {this.state.setHours}
                          onChange = {(e) => this.setState({setHours: e.target.value})}
                        />
                      </Form.Group>
                      <Form.Group as={Col} sm="2">
                        <Form.Control
                          type ="text"
                          placeholder = "Input Minutes"
                          defaultValue = {this.state.setMin}
                          onChange = {(e) => this.setState({setMin: e.target.value})}
                        />
                      </Form.Group>
                      <Form.Group as={Col} sm="2">
                        <Form.Control
                          type ="text"
                          placeholder = "Input Seconds"
                          defaultValue = {this.state.setSec}
                          onChange = {(e) => this.setState({setSec: e.target.value})}
                        />
                      </Form.Group>
                      <Button type="submit" value="Submit">Submit Time</Button>
                    </Form.Row>
                  </Form>
                </Col>
              </Row>
            </div>

            {/* <div>
              <Col>
              {this.state.captures.map((time, index) => {
                return <code>{"Capture" + (index + 1) + "--" + time }</code>
              })}
              </Col>
            </div> */}
          </Container>
        </div>
      )
    }
  }