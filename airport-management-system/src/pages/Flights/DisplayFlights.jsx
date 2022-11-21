import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import axios from "axios";
import { connect } from 'react-redux';
import '../../index.css'
import DashboardHeader from '../../components/DashboardHeader/index.jsx';
import {calculateRange, sliceData} from '../../utils/table-pagination';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import SideBar from '../../components/Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';
import { logoutUserAction } from '../../actions/authenticationAction';


const FlightsList = (props) => {
    const [dep_flights, setDepFlight] = useState([]);
    const [arr_flights, setArrFlight] = useState([]);
    const [flights, setFlights] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getDepFlights();
        getArrFlights();
        getFlights();
        setPagination(calculateRange(arr_flights, 5));
        setArrFlight(sliceData(arr_flights, page, 5));
    }, []);

    const getFlights = async () => {
        const response = await axios.get("http://localhost:5001/flights");
        setFlights(response);
    }

    const getDepFlights = async () => {
        const response = await axios.get("http://localhost:5001/flights");
        console.log(response)
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

      const deleteFlight = async (FLIGHT_CODE) =>{ 
        await axios.delete(`http://localhost:5001/flights/${FLIGHT_CODE}`);
        getDepFlights();
        getArrFlights();
        getFlights();
      }

      const deletePopup = async(FLIGHT_CODE) => {

        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure to do this.',
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

      const __handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let search_results = arr_flights.filter((item) =>
                item.FLIGHT_CODE.toLowerCase().includes(search.toLowerCase()) ||
                item.AIRLINE_CODE.toLowerCase().includes(search.toLowerCase())
            );
            setArrFlight(search_results);
        }
        else {
            __handleChangePage(1);
        }
    };

    const __handleChangePage = (new_page) => {
        setPage(new_page);
        setArrFlight(sliceData(arr_flights, new_page, 5));
    } 

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
                        <th>Destination</th>
                        <th>Departure Time</th>
                        <th>Terminal</th>
                        <th>Gate</th>
                        <th>Actions</th>
                </thead>
                <tbody>
                    {dep_flights.map((dep_flights, index) => 
                        dep_flights.GATE != "null" ? (                            
                        <tr key={dep_flights.GATE}>
                            <td><span>{dep_flights.FLIGHT_CODE}</span></td>
                            <td><span>{dep_flights.AIRLINE_CODE}</span></td>
                            <td><span>{dep_flights.ARRIVAL_PLACE}</span></td>
                            <td><span>{dep_flights.DEPARTURE_DATE}</span></td>
                            <td><span>{dep_flights.GATE.TERMINAL_NUMBER}</span></td>
                            <td><span>{dep_flights.GATE.GATE_NUMBER}</span></td>
                            {(localStorage.getItem('type') != "customer" ) ? <td><button className='btn-edit' onClick={ () => updateFlight(dep_flights.FLIGHT_CODE) }>update</button>
                                <button className='btn-remove' onClick={() => deletePopup(dep_flights.FLIGHT_CODE)}>Delete</button></td> : null}
                        </tr>
                    ) : null
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
                        <th>Origin</th>
                        <th>Arrival Time</th>
                        <th>Terminal</th>
                        <th>Gate</th>
                        <th>Baggage</th>
                        <th>Actions</th>
                </thead>
                <tbody>
                    {arr_flights.map((arr_flights, index) => (
                        <tr key={index}>
                            <td><span>{arr_flights.FLIGHT_CODE}</span></td>
                            <td><span>{arr_flights.AIRLINE_CODE}</span></td>
                            <td><span>{arr_flights.DEPARTURE_PLACE}</span></td>
                            <td><span>{arr_flights.ARRIVAL_DATE}</span></td>
                            <td><span>{arr_flights.TERMINAL_NUMBER}</span></td>
                            <td><span>{arr_flights.GATE_NUMBER}</span></td>
                            <td><span>{arr_flights.FLIGHT_BAGGAGE}</span></td>
                            {(localStorage.getItem('type') != "customer" ) ? <td><button className='btn-edit' onClick={ () => updateFlight(arr_flights.FLIGHT_CODE) }>update</button>
                            <button className='btn-remove' onClick={() => deletePopup(arr_flights.FLIGHT_CODE)}>Delete</button></td> : null}
                        </tr>
                    ))}
                </tbody>
                </table>     
                {arr_flights.length !== 0 ?
                    <div className='dashboard-content-footer'>
                        {pagination.map((item, index) => (
                            <span 
                                key={index} 
                                className={item === page ? 'active-pagination' : 'pagination'}
                                onClick={() => __handleChangePage(item)}>
                                    {item}
                            </span>
                        ))}
                    </div>
                : 
                    <div className='dashboard-content-footer'>
                        <span className='empty-table'>No data</span>
                    </div>
                }     
        </div>
        </div>
        
    )
}
const mapStateToProps = (response) => ({response});
export default connect(mapStateToProps)(FlightsList);

