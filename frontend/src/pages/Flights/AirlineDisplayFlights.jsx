import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import {DashboardHeader, DashboardHeaderE} from '../../components/DashboardHeader/index.jsx';
//import {calculateRange, sliceData} from '../../utils/table-pagination';
import '../../index.css'
 
const FlightsList = () => {
    const [dep_flights, setDepFlight] = useState([]);
    const [arr_flights, setArrFlight] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getDepFlights();
        getArrFlights();
    }, []);
 
    const getDepFlights = async () => {
        const response = await axios.get("http://localhost:5001/flights");
        const depResponse = response.data.filter(response => response.DEPARTURE_PLACE === 'SFO');
        setDepFlight(depResponse);
    }

    const getArrFlights = async () => {
        const response = await axios.get("http://localhost:5001/flights");
        const arrResponse = response.data.filter(response => response.ARRIVAL_PLACE === 'SFO');
        setArrFlight(arrResponse);
    }

    const AddFlight = () =>{ 
        navigate(`/AddFlight`);
      }

      const updateFlight = async (FLIGHT_CODE) =>{ 
        navigate(`/update/${FLIGHT_CODE}`);
      }
 
    const __handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let search_results = dep_flights.filter((item) =>
                item.FLIGHT_CODE.toLowerCase().includes(search.toLowerCase()) ||
                item.AIRLINE_CODE.toLowerCase().includes(search.toLowerCase())
            );
        }
    };

    return (
        <div className='dashboard-content'>
            <DashboardHeader btnText="Add a Flight" onClick={AddFlight} />

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h3>Departure Flights</h3>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={search}
                            placeholder='Search..'
                            className='dashboard-content-input'
                            onChange={e => __handleSearch(e)} />
                    </div>
                </div>

               <table className="table is-striped is-fullwidth">
                <thead>
                        <th>Flight Code</th>
                        <th>Airline Code</th>
                        <th>Departure Place</th>
                        <th>Arrival Place</th>
                        <th>Departure Date</th>
                        <th>Arrival Date</th>
                        <th>Actions</th>
                </thead>
                <tbody>
                    {dep_flights.map((dep_flights, index) => (                            
                        <tr key={index}>
                            <td><span>{dep_flights.FLIGHT_CODE}</span></td>
                            <td><span>{dep_flights.AIRLINE_CODE}</span></td>
                            <td><span>{dep_flights.DEPARTURE_PLACE}</span></td>
                            <td><span>{dep_flights.ARRIVAL_PLACE}</span></td>
                            <td><span>{dep_flights.DEPARTURE_DATE}</span></td>
                            <td><span>{dep_flights.ARRIVAL_DATE}</span></td>
                            <td>
                            <button className='btn-edit' onClick={ () => updateFlight(dep_flights.FLIGHT_CODE) }>update</button>
                            {/*<button onClick={ () => deleteFlight(flights.FLIGHT_CODE) } className="btn-remove">Delete</button>*/}
                            </td>
                        </tr>
                ))}
                </tbody>
                </table>      
        </div>

        <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h3>Arrival Flights</h3>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={search}
                            placeholder='Search..'
                            className='dashboard-content-input'
                            onChange={e => __handleSearch(e)} />
                    </div>
                </div>

               <table className="table is-striped is-fullwidth">
                <thead>
                        <th>Flight Code</th>
                        <th>Airline Code</th>
                        <th>Departure Place</th>
                        <th>Arrival Place</th>
                        <th>Departure Date</th>
                        <th>Arrival Date</th>
                        <th>Actions</th>
                </thead>
                <tbody>
                    {arr_flights.map((arr_flights, index) => (
                        <tr key={index}>
                            <td><span>{arr_flights.FLIGHT_CODE}</span></td>
                            <td><span>{arr_flights.AIRLINE_CODE}</span></td>
                            <td><span>{arr_flights.DEPARTURE_PLACE}</span></td>
                            <td><span>{arr_flights.ARRIVAL_PLACE}</span></td>
                            <td><span>{arr_flights.DEPARTURE_DATE}</span></td>
                            <td><span>{arr_flights.ARRIVAL_DATE}</span></td>
                            <td>
                            <button className='btn-edit' onClick={ () => updateFlight(arr_flights.FLIGHT_CODE) }>update</button>
                            {/*<button onClick={ () => deleteFlight(flights.FLIGHT_CODE) } className="btn-remove">Delete</button>*/}
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>      
        </div>



        </div>
    )
}
 
export default FlightsList

