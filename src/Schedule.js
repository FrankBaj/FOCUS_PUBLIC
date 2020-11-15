import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Schedule.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTable, useSortBy } from 'react-table';
import BTable from 'react-bootstrap/Table';

function Table({columns, data}) {
  const {
    getTableProps, 
    getTableBodyProps, 
    headerGroups, 
    rows, 
    prepareRow
    } = useTable({
      columns,
      data
    },
      useSortBy
    )

  // Render Data Table UI
  return (
    <BTable striped bordered hover size="sm" {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                  <div>
                    {column.canFilter ? column.render('Filter') : null}
                  </div>
                </th>
              ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
            </tr>
          )
        })}
      </tbody>
    </BTable>
  )
}

// function saveDate(){
//   // var regd = new RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})\$");
//   // var currentDay = new Date();
//   // var dd = String(currentDay.getDate());
//   // var mm = String(currentDay.getMonth() + 1);
//   // var yyyy = currentDay.getFullYear();
// }


export default class Schedule extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      year: '',
      month: '',
      day: '',

      type: '',

      hour: '',
      min: '',
      mrdm: '',

      hrlen:'',
      minlen:'',

      data: 
            [{
              date: '2020/12/01',
              type: 'Meditation',
              time: '12:25 PM',
              length: '00:25'
            },{
              date: '2021/01/01',
              type: 'Concentration',
              time: '1:30 PM',
              length: '00:40'
            },{
              date: '2020/11/27',
              type: 'Meditation',
              time: '9:10 AM',
              length: '01:00'
            }]
    }
    this.saveDate = this.saveDate.bind(this);
    this.changeInput = this.changeInput.bind(this);
  }

  saveDate(e){
    e.preventDefault();
    const year = this.state.year;
    const month = this.state.month;
    const day = this.state.day;
    
    const newtype = this.state.type;
    
    const hour = this.state.hour;
    const min = this.state.min;
    const mrdm = this.state.mrdm;

    const hrlen = this.state.hrlen;
    const minlen = this.state.minlen;

    const slsh = '/';
    const cln = ':'

    const newdate = year.concat(slsh,month,slsh,day);
    const newtime = hour.concat(cln,min,' ',mrdm);
    const duration = hrlen.concat(cln,minlen);

    const newEntry = {
                        date: newdate,
                        type: newtype,
                        time: newtime,
                        length: duration
                     }

    this.setState({
        data: [...this.state.data, newEntry]
    });
  };

  changeInput(e){
    e.preventDefault();
    this.setState({
      [e.target.name] : e.target.value
    });
  }

    render(){
      const columns = [{
        Header: 'Date',
        accessor: 'date'
      },{
        Header: 'Type',
        accessor: 'type',
      },{
        Header: 'Time',
        accessor: 'time'
      },{
        Header: 'Duration',
        accessor: 'length'
      },{
        id:'delete',
        Cell: ({row}) => (
        <span
        id = "in_row_delete"
        onClick={() => {
          let data = [...this.state.data];
          console.log(this.state.data[row.index]);
          data.splice(row.index, 1);  
          this.setState({data});
        }}
        >
          Delete
        </span>
        )
      }
    ]

      return(
        <div id="page_data">
          <Container>
            <Row>
              <Col>

                <div id="input_area">
                  <Form onSubmit={this.saveDate}>
                  
                  <Form.Row id="background">
                    <Form.Label class="label">Enter a Date:</Form.Label>
                    <Form.Group as={Col} sm="2">
                      <Form.Control required 
                        type ="text"
                        placeholder = "YYYY"
                        defaultValue = {this.state.year}
                        onChange = {(e) => this.setState({year: e.target.value})}
                      />
                    </Form.Group>
                    <Form.Group as={Col} sm="2">
                      <Form.Control required
                        type ="text"
                        placeholder = "MM"
                        defaultValue = {this.state.month}
                        onChange = {(e) => this.setState({month: e.target.value})}
                      />
                    </Form.Group>
                    <Form.Group as={Col} sm="2">
                      <Form.Control required
                        type ="text"
                        placeholder = "DD"
                        defaultValue = {this.state.day}
                        onChange = {(e) => this.setState({day: e.target.value})}
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row id="background">
                  <Form.Label class="label">Set Time:</Form.Label>
                    <Form.Group>
                      <Form.Control 
                        size="sm" 
                        as="select"
                        custom onChange = {(e) => this.setState({hour: e.target.value})}
                      >
                        <option value = "HH">Hour</option>
                        <option value = "1">1</option>
                        <option value = "2">2</option>
                        <option value = "3">3</option>
                        <option value = "4">4</option>
                        <option value = "5">5</option>
                        <option value = "6">6</option>
                        <option value = "7">7</option>
                        <option value = "8">8</option>
                        <option value = "9">9</option>
                        <option value = "10">10</option>
                        <option value = "11">11</option>
                        <option value = "12">12</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Control 
                        size="sm" 
                        as="select"
                        custom onChange = {(e) => this.setState({min: e.target.value})}
                      >
                        <option value="MM">Minute</option>
                        <option value="00">00</option>
                        <option value="05">05</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                        <option value="35">35</option>
                        <option value="40">40</option>
                        <option value="45">45</option>
                        <option value="50">50</option>
                        <option value="55">55</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Control 
                        size="sm" 
                        as="select"
                        custom onChange = {(e) => this.setState({mrdm: e.target.value})}
                      >
                        <option mrdm>AM or PM</option>
                        <option Value = "AM">AM</option>
                        <option Value = "PM">PM</option>
                      </Form.Control>
                    </Form.Group>            
                  </Form.Row>

                  <Form.Row id="background">
                  <Form.Label class="label">Set Duration:</Form.Label>
                    <Form.Group>
                      <Form.Control 
                        size="sm" 
                        as="select"
                        custom onChange = {(e) => this.setState({hrlen: e.target.value})}
                      >
                        <option value = "HH">Hour</option>
                        <option value = "00">00</option>
                        <option value = "01">01</option>
                        <option value = "02">02</option>
                        <option value = "03">03</option>
                        <option value = "04">04</option>
                        <option value = "05">05</option>
                        <option value = "06">06</option>
                        <option value = "07">07</option>
                        <option value = "08">08</option>
                        <option value = "09">09</option>
                        <option value = "10">10</option>
                        <option value = "11">11</option>
                        <option value = "12">12</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Control 
                        size="sm" 
                        as="select"
                        custom onChange = {(e) => this.setState({minlen: e.target.value})}
                      >
                        <option value="MM">Minute</option>
                        <option value="00">00</option>
                        <option value="05">05</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                        <option value="35">35</option>
                        <option value="40">40</option>
                        <option value="45">45</option>
                        <option value="50">50</option>
                        <option value="55">55</option>
                      </Form.Control>
                    </Form.Group>
                  </Form.Row>
                  
                  <Form.Row id="background">
                  <Form.Label class="label">Session Type:</Form.Label>
                    <Form.Group>
                      <Form.Control 
                        size="sm" 
                        as="select"
                        custom onChange = {(e) => this.setState({type: e.target.value})}
                      >
                        <option>Session Type</option>
                        <option value="Meditation">Meditation</option>
                        <option value="Concentration">Concentration</option>
                      </Form.Control>
                    </Form.Group>      
                  </Form.Row>
                  <Button type="submit" value="Submit">Save Date</Button>
                </Form>
                </div>

              </Col>
            </Row>

            <Row>
              <Col>
                <div id='table'>
                  <Table 
                    data={this.state.data}
                    columns={columns} 
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
              <span id="delete"
                onClick={() => {
                  let data = this.state.data;
                  // console.log(this.state.data[rows.index]);
                  data.splice(this.state.data);  
                  this.state.data = [{
                    date: " ",
                    type: "No Session Scheduled",
                    time: " "
                  }];
                  data = this.state.data;
                  this.setState({data});
                }}>
                Clear All Entries
              </span>
              </Col>
            </Row>
          </Container>
        </div>
      )
    }
}