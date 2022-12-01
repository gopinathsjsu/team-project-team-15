import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import DashboardHeader from '../../components/DashboardHeader/index.jsx';

const UpdateFlight = () => {
    const [flights, setFlight] = useState([]);

    const [FLIGHT_CODE, setFlightCode] = useState('');
    const [AIRLINE_CODE, setAirlineCode] = useState('');
    const [ARRIVAL_DATE, setArrivalDate] = useState('');
    const [DEPARTURE_DATE, setDepartureDate] = useState('');
    const [ARRIVAL_PLACE, setArrivalPlace] = useState('');
    const [DEPARTURE_PLACE, setDeparturePlace] = useState('');

    const navigate = useNavigate();
    const updateFlight = async (e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:5001/api/v1/flights/${FLIGHT_CODE}`,{
            FLIGHT_CODE: FLIGHT_CODE,
            AIRLINE_CODE: AIRLINE_CODE,
            ARRIVAL_PLACE: ARRIVAL_PLACE,
            DEPARTURE_PLACE: DEPARTURE_PLACE,
            ARRIVAL_DATE: ARRIVAL_DATE,
            DEPARTURE_DATE: DEPARTURE_DATE
        });
        navigate("/");
    }
 
    useEffect(() => {
        getFlightById();
    }, []);
 
    const getFlights = async () => {
        const response = await axios.get('http://localhost:5001/api/v1/flights');
        setFlight(response.data);
    }

    const getFlightById = async () => {
        const response1 = await axios.get(`http://localhost:5001/api/v1/flights/${FLIGHT_CODE}`);
        setFlightCode(response1.data.FLIGHT_CODE);
        setAirlineCode(response1.data.AIRLINE_CODE);
        setArrivalDate(response1.data.ARRIVAL_DATE);
        setArrivalPlace(response1.data.ARRIVAL_PLACE);
        setDepartureDate(response1.data.DEPARTURE_DATE);
        setDeparturePlace(response1.data.DEPARTURE_PLACE);
    }
 
    return (
        <div>
            <DashboardHeader />
            <form onSubmit={ updateFlight }>
                <table>
                <div className="field">
                    <tr><td><label className="label">Flight Code</label></td>
                    <td><input 
                        className="input"
                        type="text"
                        placeholder="Flight Code"
                        value={ FLIGHT_CODE }
                        onChange={ (e) => setFlightCode(e.target.value) }
                    /></td></tr>

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
                        placeholder="Departure place"
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
                        placeholder="Departure date"
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

                    <button className='dashbord-header-btn'>Update</button>

                </div>
 
                </table>
            </form>
        </div>
    )
}

export default UpdateFlight