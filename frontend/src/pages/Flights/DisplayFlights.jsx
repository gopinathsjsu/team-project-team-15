import axios from "axios";
import moment from "moment";
import { Button, Table, Form, Input, DatePicker } from "antd";
//import 'antd/dist/reset.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

// import '../../index.css'
import DashboardHeader from '../../components/DashboardHeader/index.jsx';


const FlightsList = () => {
    const [dep_flights, setDepFlight] = useState([]);
    const [arr_flights, setArrFlight] = useState([]);
    const [flights, setFlights] = useState([]);
    const [depeditingRow, setDepEditingRow] = useState(null);
    const [arrEditingRow, setArrEditingRow] = useState(null);
    
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        getFlights(15000)
    }, []);

    const updateDepFlight = async (FLIGHT_CODE,AIRLINE_CODE,ARRIVAL_PLACE,DEPARTURE_DATE,TERMINAL_NUMBER,GATE_NUMBER) => {
        //e.preventDefault();
        await axios.patch(`http://localhost:5001/api/v1/flights/${FLIGHT_CODE}`,{
            FLIGHT_CODE: FLIGHT_CODE,
            AIRLINE_CODE: AIRLINE_CODE,
            ARRIVAL_PLACE: ARRIVAL_PLACE,
            DEPARTURE_DATE: DEPARTURE_DATE,
            TERMINAL_NUMBER: TERMINAL_NUMBER,
            GATE_NUMBER: GATE_NUMBER
        });
        navigate("/");
    }

    const updateArrFlight = async (FLIGHT_CODE,AIRLINE_CODE,DEPARTURE_PLACE,ARRIVAL_DATE,TERMINAL_NUMBER,GATE_NUMBER,BAGGAGE_NUMBER) => {
        //e.preventDefault();
        await axios.patch(`http://localhost:5001/api/v1/flights/${FLIGHT_CODE}`,{
            FLIGHT_CODE: FLIGHT_CODE,
            AIRLINE_CODE: AIRLINE_CODE,
            DEPARTURE_PLACE: DEPARTURE_PLACE,
            ARRIVAL_DATE: ARRIVAL_DATE,
            TERMINAL_NUMBER: TERMINAL_NUMBER,
            GATE_NUMBER: GATE_NUMBER,
            BAGGAGE_NUMBER: BAGGAGE_NUMBER,
        });
        navigate("/");
    }

    const getFlights = async (hours) => {
        let initresponse = await axios.get(`http://localhost:5001/api/v1/flights`);
        setFlights(initresponse.data);
        let response = initresponse.data.map(function(flights){ 
            if (flights['GATE'] == null){
                flights.GATE={"TERMINAL_NUMBER": "NA", "GATE_NUMBER": "NA", }
            }
            if (flights['BAGGAGE'] == null){
                flights.BAGGAGE={"TERMINAL_NUMBER": "NA", "BAGGAGE_NUMBER": "NA", }
            }
            return flights
          });
          
          response=response.map((gate, index) => ({
            ...gate, 
            TERMINAL_NUMBER: gate.GATE.TERMINAL_NUMBER ,
            GATE_NUMBER: gate.GATE.GATE_NUMBER ,
            BAGGAGE_NUMBER:gate.BAGGAGE.BAGGAGE_NUMBER,
          }))

          

        if(localStorage.getItem('type') == "AIRLINE_EMPLOYEE" ) {
          let depResponse = response.filter(response => response.DEPARTURE_PLACE === 'SFO').filter(response => response.AIRLINE_CODE.slice(0,3) === localStorage.getItem('name').slice(0,3))
                                         .filter(response => 0 < moment(response.DEPARTURE_DATE).add(9, 'hours').diff(moment(),'hours') && moment(response.DEPARTURE_DATE).diff(moment(),'hours') <= hours);
            depResponse=depResponse.map((depFlightRow, index) => ({
              ...depFlightRow, 
              key1: index ,
            }))
            console.log('depResponse is')
            console.log(depResponse)
            let arrResponse = response.filter(response => response.ARRIVAL_PLACE === 'SFO').filter(response => response.AIRLINE_CODE.slice(0,3) === localStorage.getItem('name').slice(0,3))
                                         .filter(response => 0 < moment(response.ARRIVAL_DATE).add(9, 'hours').diff(moment(),'hours') && moment(response.ARRIVAL_DATE).diff(moment(),'hours') <= hours);
            arrResponse=arrResponse.map((arrFlightRow, index) => ({
                ...arrFlightRow, 
                key2: index ,
            }))
            
            setArrFlight(arrResponse);
            setDepFlight(depResponse);
        }
        else{
            console.log(response);
            setFlights(response.data);
            let depResponse = response.filter(response => response.DEPARTURE_PLACE === 'SFO')
                                         .filter(response => 0 < moment(response.DEPARTURE_DATE).add(9, 'hours').diff(moment(),'hours') && moment(response.DEPARTURE_DATE).diff(moment(),'hours') <= hours);
            
            depResponse=depResponse.map((depFlightRow, index) => ({
                ...depFlightRow, 
                key1: index ,
            }))
            let arrResponse = response.filter(response => response.ARRIVAL_PLACE === 'SFO')
                                         .filter(response => 0 < moment(response.ARRIVAL_DATE).add(9, 'hours').diff(moment(),'hours') && moment(response.ARRIVAL_DATE).diff(moment(),'hours') <= hours);
            arrResponse=arrResponse.map((arrFlightRow, index) => ({
               ...arrFlightRow, 
               key2: index ,
            }))
            
            setArrFlight(arrResponse);
            setDepFlight(depResponse);
        }
        
    }

    const Next1hr = async() =>{ 
        getFlights(0,1);
    }

    const Next2hr = async() =>{ 
        getFlights(0,2);
    }

    const Next4hr = async() =>{ 
        getFlights(0,4);
    }
    
    const Next5hr = async() =>{ 
        getFlights(0,1500);
    }

   

    const deleteFlight = async (FLIGHT_CODE) =>{ 
        await axios.delete(`http://localhost:5001/api/v1/flights/${FLIGHT_CODE}`);
        getFlights(15000);
    }

    const deletePopup = async(FLIGHT_CODE) => {

    confirmAlert({
        title: 'Confirm to Delete',
        message: 'Are you sure to delete the flight?',
        buttons: [
        {
            label: 'Yes',
            onClick: () => {deleteFlight(FLIGHT_CODE)}
        },
        {
            label: 'No',
        }
        ]
        });
    }

    const depColumns = [
        {
          
          title: "Flight Code",
          dataIndex: "FLIGHT_CODE",
          
          render: (text, record) => {
            if (depeditingRow === record.key1) {
              return (
                <Form.Item
                  name="FLIGHT_CODE"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your flight code",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              );
            } else {
              return <p>{text}</p>;
            }
          },
        },
        {
          title: "Airline Code",
          dataIndex: "AIRLINE_CODE",
          
          render: (text, record) => {
            if (depeditingRow === record.key1) {
              return (
                <Form.Item name="AIRLINE_CODE">
                  <Input />
                </Form.Item>
              );
            } else {
              return <p>{text}</p>;
            }
          },
        },
        {
            title: "Destination",
            dataIndex: "ARRIVAL_PLACE",
            
            render: (text, record) => {
              if (depeditingRow === record.key1) {
                return (
                  <Form.Item name="ARRIVAL_PLACE">
                    <Input />
                  </Form.Item>
                );
              } else {
                return <p>{text}</p>;
              }
            },
          },
          {
            title: "Departure",
            dataIndex: "DEPARTURE_DATE",
            
            render: (text, record) => {
              if (depeditingRow === record.key1) {
                return (
                  <Form.Item name="DEPARTURE_DATE">
                    <Input />
                  </Form.Item>
                );
              } else {
                return <p>{text}</p>;
              }
            },
          },
          {
            title: "Terminal",
            dataIndex: "TERMINAL_NUMBER",
            
            render: (text, record) => {
              if (depeditingRow === record.key1) {
                return (
                  <Form.Item name="TERMINAL_NUMBER">
                    <Input />
                  </Form.Item>
                );
              } else {
                return <p>{text}</p>;
              }
            },
          },
          {
            title: "Gate",
            dataIndex: "GATE_NUMBER",
            
            render: (text, record) => {
              if (depeditingRow === record.key1) {
                //const gate_number
                return (
                  <Form.Item name="GATE_NUMBER">
                    <Input />
                  </Form.Item>
                );
              } else {
                return <p>{text}</p>;
              }
            },
          }
      ];

      if(localStorage.getItem('type') == 'AIRLINE_EMPLOYEE'){
        depColumns.push({
          
          title: "Actions",
          render: (_, record) => {
            return (
              <>
                <Button
                  type="link"
                  onClick={() => {
                    setDepEditingRow(record.key1);
                    form1.setFieldsValue({
                        FLIGHT_CODE: record.FLIGHT_CODE,
                        AIRLINE_CODE: record.AIRLINE_CODE,
                        ARRIVAL_PLACE: record.ARRIVAL_PLACE,
                        DEPARTURE_DATE: record.DEPARTURE_DATE,
                        TERMINAL_NUMBER: record.TERMINAL_NUMBER,
                        GATE_NUMBER: record.GATE_NUMBER,
                     
                    });
                  }}
                >
                  Edit
                </Button>
                <Button type="link" htmlType="submit" >
                Save
                </Button>
                {(localStorage.getItem('type') === "AIRLINE_EMPLOYEE" ) ? <td><button className='btn-edit' onClick={ () => updateDepFlight(record.FLIGHT_CODE,record.AIRLINE_CODE,record.ARRIVAL_PLACE,record.DEPARTURE_DATE,record.TERMINAL_NUMBER,record.GATE_NUMBER)}>update</button>
                                <button className='btn-remove' onClick={() => deletePopup(record.FLIGHT_CODE)}>Delete</button></td> : null}  
              </>
            );
          },
        })
      }
      
    const depOnFinish = (values) => {
        const updatedDataSource = [...dep_flights];
        console.log('updatedDataSource1 is');
        console.log(updatedDataSource);
        updatedDataSource.splice(depeditingRow, 1, { ...values, key1: depeditingRow });
        console.log('updatedDataSource2 is');
        console.log(updatedDataSource);
        setDepFlight(updatedDataSource);
        setDepEditingRow(null);
      };

      const arrColumns = [
        {
          title: "Flight Code",
          dataIndex: "FLIGHT_CODE",
          render: (text, record) => {
            if (arrEditingRow === record.key2) {
              return (
                <Form.Item
                  name="FLIGHT_CODE"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your flight code",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              );
            } else {
              return <p>{text}</p>;
            }
          },
        },
        {
          title: "Airline Code",
          dataIndex: "AIRLINE_CODE",
          render: (text, record) => {
            if (arrEditingRow === record.key2) {
              return (
                <Form.Item name="AIRLINE_CODE">
                  <Input />
                </Form.Item>
              );
            } else {
              return <p>{text}</p>;
            }
          },
        },
        {
            title: "Origin",
            dataIndex: "DEPARTURE_PLACE",
            render: (text, record) => {
              if (arrEditingRow === record.key2) {
                return (
                  <Form.Item name="DEPARTURE_PLACE">
                    <Input />
                  </Form.Item>
                );
              } else {
                return <p>{text}</p>;
              }
            },
          },
          {
            title: "Arrival Time",
            dataIndex: "ARRIVAL_DATE",
            render: (text, record) => {
              if (arrEditingRow === record.key2) {
                return (
                  <Form.Item name="ARRIVAL_DATE">
                    <Input />
                  </Form.Item>
                );
              } else {
                return <p>{text}</p>;
              }
            },
          },
          {
            title: "Terminal",
            dataIndex: "TERMINAL_NUMBER",
            render: (text, record) => {
              if (arrEditingRow === record.key2) {
                return (
                  <Form.Item name="TERMINAL_NUMBER">
                    <Input />
                  </Form.Item>
                );
              } else {
                return <p>{text}</p>;
              }
            },
          },
          {
            title: "Gate",
            dataIndex: "GATE_NUMBER",
            render: (text, record) => {
              if (arrEditingRow === record.key2) {
                //const gate_number
                return (
                  <Form.Item name="GATE_NUMBER">
                    <Input />
                  </Form.Item>
                );
              } else {
                return <p>{text}</p>;
              }
            },
          },
          
          {
            title: "Baggage",
            dataIndex: "BAGGAGE_NUMBER",
            render: (text, record) => {
              if (arrEditingRow === record.key2) {
                //const gate_number
                return (
                  <Form.Item name="BAGGAGE_NUMBER">
                    <Input />
                  </Form.Item>
                );
              } else {
                return <p>{text}</p>;
              }
            },
          }
        
      ];

    if(localStorage.getItem('type') == 'AIRLINE_EMPLOYEE'){
      arrColumns.push({
          
        title: "Actions",
        render: (_, record) => {
          return (
            <>
              <Button
                type="link"
                onClick={() => {
                  setArrEditingRow(record.key2);
                  form2.setFieldsValue({
                      FLIGHT_CODE: record.FLIGHT_CODE,
                      AIRLINE_CODE: record.AIRLINE_CODE,
                      DEPARTURE_PLACE: record.DEPARTURE_PLACE,
                      ARRIVAL_DATE: record.ARRIVAL_DATE,
                      TERMINAL_NUMBER: record.TERMINAL_NUMBER,
                      GATE_NUMBER: record.GATE_NUMBER,
                      BAGGAGE_NUMBER: record.BAGGAGE_NUMBER,
                   
                  });
                }}
              >
                Edit
              </Button>
              <Button type="link" htmlType="submit" >
              Save
              </Button>
              {(localStorage.getItem('type') === "AIRLINE_EMPLOYEE" ) ? <td><button className='btn-edit' onClick={ () => updateArrFlight(record.FLIGHT_CODE,record.AIRLINE_CODE,record.DEPARTURE_PLACE,record.ARRIVAL_DATE,record.TERMINAL_NUMBER,record.GATE_NUMBER,record.BAGGAGE_NUMBER)  }>update</button>
                              <button className='btn-remove' onClick={() => deletePopup(record.FLIGHT_CODE)}>Delete</button></td> : null}  
            </>
          );
        },
      },)
    }
      
    const arrOnFinish = (values) => {
        const arrUpdatedDataSource = [...arr_flights];
        console.log('arrUpdatedDataSource1 is');
        console.log(arrUpdatedDataSource);
        arrUpdatedDataSource.splice(arrEditingRow, 1, { ...values, key2: arrEditingRow });
        console.log('arrUpdatedDataSource2 is');
        console.log(arrUpdatedDataSource);
        setArrFlight(arrUpdatedDataSource);
        setArrEditingRow(null);
      };

  

    return (
        <div className='dashboard-content'>
            <DashboardHeader btnText1="Next One hour" btnText2="Next Two hour" btnText4="Next Four hour" btnText5="Home"
                            onClick1={Next1hr} onClick2={Next2hr} onClick4={Next4hr} onClick5={Next5hr}/>

            <div className='dashboard-content-container'>
                
                <div className='dashboard-content-header'>
                    <h3>Departure Flights</h3>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            placeholder='Search..'
                            className='dashboard-content-input'/>
                    </div>
                </div>

                <header className="App-header">
                    <Form  form={form1} onFinish={depOnFinish}>
                        <Table columns={depColumns} dataSource={dep_flights}></Table>
                    </Form>
                </header>


               {/* <table className="table is-striped is-fullwidth">
                <thead>
                        <th>Flight Code</th>
                        <th>Airline Code</th>
                        <th>Destination</th>
                        <th>Departure Time</th>
                        <th>Terminal</th>
                        <th>Gate</th>
                        {(localStorage.getItem('type') === "AIRLINE_EMPLOYEE" ) ? <th>Actions</th> : null}                
                </thead>
                <tbody>
                    {dep_flights.map((dep_flights, index) => 
                        <tr>
                            <td><span>{dep_flights.FLIGHT_CODE}</span></td>
                            <td><span>{dep_flights.AIRLINE_CODE}</span></td>
                            <td><span>{dep_flights.ARRIVAL_PLACE}</span></td>
                            <td><span>{moment(dep_flights.DEPARTURE_DATE).utc().format('YYYY-MM-DD kk:mm:ss')}</span></td>
                            <td><span>{dep_flights.GATE.TERMINAL_NUMBER}</span></td>
                            <td><span>{dep_flights.GATE.GATE_NUMBER}</span></td>
                            {(localStorage.getItem('type') === "AIRLINE_EMPLOYEE" ) ? <td><button className='btn-edit' onClick={ () => updateFlight(dep_flights.FLIGHT_CODE) }>update</button>
                                <button className='btn-remove' onClick={() => deletePopup(dep_flights.FLIGHT_CODE)}>Delete</button></td> : null}
                        </tr>
                )}
                </tbody>
                </table>   */}

                
        </div>

        <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h3>Arrival Flights</h3>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            placeholder='Search..'
                            className='dashboard-content-input'/>
                    </div>
                </div>

                <header className="App-header" style={{align:'center'}}>
                    <Form form={form2} onFinish={arrOnFinish}>
                        <Table className="table is-striped is-fullwidth" columns={arrColumns} dataSource={arr_flights}></Table>
                    </Form>
                </header>

               {/* <table className="table is-striped is-fullwidth">
                <thead>
                        <th>Flight Code</th>
                        <th>Airline Code</th>
                        <th>Origin</th>
                        <th>Arrival Time</th>
                        <th>Terminal</th>
                        <th>Gate</th>
                        <th>Baggage</th>
                        {(localStorage.getItem('type') === "AIRLINE_EMPLOYEE" ) ? <th>Actions</th> : null}                
                </thead>
                <tbody>
                    {arr_flights.map((arr_flights, index) => (
                        <tr key={index}>
                            <td><span>{arr_flights.FLIGHT_CODE}</span></td>
                            <td><span>{arr_flights.AIRLINE_CODE}</span></td>
                            <td><span>{arr_flights.DEPARTURE_PLACE}</span></td>
                            <td><span>{moment(arr_flights.ARRIVAL_DATE).utc().format('YYYY-MM-DD kk:mm:ss')}</span></td>
                            <td><span>{arr_flights.GATE.TERMINAL_NUMBER}</span></td>
                            <td><span>{arr_flights.GATE.GATE_NUMBER}</span></td>
                            <td><span>{arr_flights.BAGGAGE.BAGGAGE_NUMBER}</span></td>
                            {(localStorage.getItem('type') === "AIRLINE_EMPLOYEE" ) ? <td><button className='btn-edit' onClick={ () => updateArrFlight(arr_flights.FLIGHT_CODE) }>update</button>
                            <button className='btn-remove' onClick={() => deletePopup(arr_flights.FLIGHT_CODE)}>Delete</button></td> : null}
                        </tr>
                    ))}
                </tbody>
                </table>      */}
        </div>
        </div>
    )
}

export default FlightsList

