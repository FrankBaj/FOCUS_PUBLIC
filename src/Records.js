import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Records.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTable, useSortBy} from 'react-table';
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

function SelectFilter({
  column: {filterValue, setFilter, preFilteredRows, id},
}){
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}



export default class Records extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data: 
            [{
              date: '2020/08/01',
              type: 'Meditation',
              time: '00:01:30'
            },{
              date: '2019/08/01',
              type: 'Concentration',
              time: '01:00:30'
            },{
              date: '2020/11/01',
              type: 'Meditation',
              time: '00:10:30'
            }]
    }
  }
  
  render(){
    const data = this.state.data

    const columns = [{
      Header: 'Date',
      accessor: 'date'
    },{
      Header: 'Type',
      accessor: 'type',
      Filter: SelectFilter,
      filter: 'includes'

      // filterable: true,
      //       filterMethod: (filter, row) => {
      //         if (filter.value === "all") {
      //           return true;
      //         }
      //         if (filter.value === "Md") {
      //           return row[filter.id] === "Meditation";
      //         }
      //         if (filter.value === "Cnc") {
      //           return row[filter.id] === "Concentration";
      //         }
      //       },
      // Filter: ({ filter, onChange }) =>
      // <select
      //   onChange={event => onChange(event.target.value)}
      //   style={{ width: "100%" }}
      //   value={filter ? filter.value : "all"}
      // >
      //   <option value="all">Show All</option>
      //   <option value="Md">Meditation</option>
      //   <option value="Cnc">Concentration</option>
      // </select>
    },{
      Header: 'Time',
      accessor: 'time'
    }
    ]

      return(
        <div>
          <Container>
            <Row>
              <Col>
              <div id="sort">
                Order By:
              </div>
              </Col>
            </Row>
            
            <Row>
              <Col>
                <div id='table'>
                  <Table 
                    data={data}
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
                    date: "YYYY/DD/MM",
                    type: "Session Type",
                    time: "Hour : Minute : Second"
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