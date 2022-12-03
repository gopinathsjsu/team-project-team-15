import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import axios from "axios";

import '../../index.css'
import DashboardHeader from '../../components/DashboardHeader/index.jsx';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import moment from "moment";


const FlightsList = () => {
    const [dep_flights, setDepFlight] = useState([]);
    const [arr_flights, setArrFlight] = useState([]);
    const [flights, setFlights] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getFlights(15000);
    }, []);

    const getFlights = async (hours) => {
        const initresponse = await axios.get(`http://localhost:5001/api/v1/flights`);
        setFlights(initresponse.data);
        const response = initresponse.data.map(function(flights){ 
            if (flights['GATE'] == null){
                flights.GATE={"TERMINAL_NUMBER": "NA", "GATE_NUMBER": "NA", }
            }
            if (flights['BAGGAGE'] == null){
                flights.BAGGAGE={"TERMINAL_NUMBER": "NA", "BAGGAGE_NUMBER": "NA", }
            }
            return flights
          });
        if(localStorage.getItem('type') == "AIRLINE_EMPLOYEE" ) {
            const depResponse = response.filter(response => response.DEPARTURE_PLACE === 'SFO').filter(response => response.AIRLINE_CODE.slice(0,3) === localStorage.getItem('name').slice(0,3))
                                         .filter(response => 0 < moment(response.DEPARTURE_DATE).diff(moment(),'hours') && moment(response.DEPARTURE_DATE).diff(moment(),'hours') <= hours);
            const arrResponse = response.filter(response => response.ARRIVAL_PLACE === 'SFO').filter(response => response.AIRLINE_CODE.slice(0,3) === localStorage.getItem('name').slice(0,3))
                                         .filter(response => 0 < moment(response.ARRIVAL_DATE).diff(moment(),'hours') && moment(response.ARRIVAL_DATE).diff(moment(),'hours') <= hours);
            setArrFlight(arrResponse);
            setDepFlight(depResponse);
        }
        else{
            console.log(response);
            setFlights(response.data);
            const depResponse = response.filter(response => response.DEPARTURE_PLACE === 'SFO')
                                         .filter(response => 0 < moment(response.DEPARTURE_DATE).diff(moment(),'hours') && moment(response.DEPARTURE_DATE).diff(moment(),'hours') <= hours);
            const arrResponse = response.filter(response => response.ARRIVAL_PLACE === 'SFO')
                                         .filter(response => 0 < moment(response.ARRIVAL_DATE).diff(moment(),'hours') && moment(response.ARRIVAL_DATE).diff(moment(),'hours') <= hours);
            setArrFlight(arrResponse);
            setDepFlight(depResponse);
        }
        
    }
        
    const goHome = async() =>{ 
        getFlights(15000);
    }

    const Next1hr = async() =>{ 
        getFlights(1);
    }

    const Next2hr = async() =>{ 
        getFlights(2);
    }

    const Next4hr = async() =>{ 
        getFlights(1500);
    }

    const updateFlight = async (FLIGHT_CODE) =>{ 
        navigate(`/update/${FLIGHT_CODE}`);
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


    return (
        <div className='dashboard-content'>
            <DashboardHeader btnTextH="Home" btnText1="Next One hour" btnText2="Next Two hour" btnText4="Next Four hour"
                            onclickH={goHome} onClick1={Next1hr} onClick2={Next2hr} onClick4={Next4hr}/>

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

               <table className="table is-striped is-fullwidth">
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
                </table>  
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

               <table className="table is-striped is-fullwidth">
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
                            {(localStorage.getItem('type') === "AIRLINE_EMPLOYEE" ) ? <td><button className='btn-edit' onClick={ () => updateFlight(arr_flights.FLIGHT_CODE) }>update</button>
                            <button className='btn-remove' onClick={() => deletePopup(arr_flights.FLIGHT_CODE)}>Delete</button></td> : null}
                        </tr>
                    ))}
                </tbody>
                </table>     
        </div>
        </div>
    )
}

export default FlightsList

