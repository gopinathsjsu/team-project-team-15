import React, {useState, useEffect, useRef} from 'react';
import {DashboardHeader, DashboardHeaderE} from '../../components/DashboardHeader/index.jsx';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


//import {calculateRange, sliceData} from '../utils/table-pagination';

import '../styles.css';
import '../../index.css'

const AddFlight = () =>{

    const DropDownContainer = styled("div")``;
    const DropDownHeader = styled("div")``;
    const DropDownListContainer = styled("div")``;
    const DropDownList = styled("ul")``;
    const ListItem = styled("li")``;

    const [FLIGHT_CODE, setFlightCode] = useState('');
    const [AIRLINE_CODE, setAirlineCode] = useState('');
    const [ARRIVAL_DATE, setArrivalDate] = useState('');
    const [DEPARTURE_DATE, setDepartureDate] = useState('');
    const [ARRIVAL_PLACE, setArrivalPlace] = useState('');
    const [DEPARTURE_PLACE, setDeparturePlace] = useState('');

    const ref = useRef();
    const navigate = useNavigate();

    const saveFlight = async (e) => {
      e.preventDefault();
      await axios.post('http://localhost:5001/flights',{
          FLIGHT_CODE: FLIGHT_CODE,
          AIRLINE_CODE: AIRLINE_CODE,
          ARRIVAL_PLACE: ARRIVAL_PLACE,
          DEPARTURE_PLACE: DEPARTURE_PLACE,
          ARRIVAL_DATE: ARRIVAL_DATE,
          DEPARTURE_DATE: DEPARTURE_DATE
      });
      navigate("/");
    }

    return (
      <div className='dashboard-content'>
        <DashboardHeaderE />
          <form onSubmit={ saveFlight }>
          <table>
                <div className="field">
                <tr><td><label className="label">FlightType</label></td>
                    <td><select name="flightType" id="flightType">
                        <option value="">--Select Flight Type--</option>
                        <option value="arr">Arrival</option>
                        <option value="dep">Departure</option>
                    </select></td></tr>

                    <tr><td><label className="label">Airline Code</label></td>
                    <td><input 
                        className="input"
                        type="text"
                        placeholder="Airline Code"
                        value={ AIRLINE_CODE }
                        onChange={ (e) => setAirlineCode(e.target.value) }
                    /></td></tr>


                    <tr><td><label className="label">Departure Place</label></td>
                    <td><input 
                        className="input"
                        type="text"
                        placeholder="Departure Place"
                        value={ DEPARTURE_PLACE }
                        onChange={ (e) => setDeparturePlace(e.target.value) }
                    /></td></tr>


                    <tr><td><label className="label">Arrival Place</label></td>
                    <td><input 
                        className="input"
                        type="text"
                        placeholder="ARRIVAL_PLACE"
                        value={ ARRIVAL_PLACE }
                        onChange={ (e) => setArrivalPlace(e.target.value) }
                    /></td></tr>


                    <tr><td><label className="label">Departure Time</label></td>
                    <td><input 
                        className="input"
                        type="datetime-local"
                        placeholder="DEPARTURE_DATE"
                        value={ DEPARTURE_DATE }
                        onChange={ (e) => setDepartureDate(e.target.value) }
                    /></td></tr>


                    <tr><td><label className="label">Arrival Time</label></td>
                    <td><input 
                        className="input"
                        type="datetime-local"
                        placeholder="ARRIVAL_DATE"
                        value={ ARRIVAL_DATE }
                        onChange={ (e) => setArrivalDate(e.target.value) }
                    /></td></tr>

                <button className='dashbord-header-btn' onClick='/'>Add Flight</button>

                </div>
                </table>

          </form>
      </div>
  )

}
export default AddFlight;
