import React, {useState, useEffect, useRef} from 'react';
import DashboardHeader from '../../components/DashboardHeader/index.jsx';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";


//import {calculateRange, sliceData} from '../utils/table-pagination';

import '../styles.css';
import '../../index.css'

const AddFlight = () =>{
    
    const [FLIGHT_CODE, setFlightCode] = useState('');
    const [AIRLINE_CODE, setAirlineCode] = useState('');
    const [ARRIVAL_DATE, setArrivalDate] = useState('');
    const [DEPARTURE_DATE, setDepartureDate] = useState('');
    const [ARRIVAL_PLACE, setArrivalPlace] = useState('');
    const [DEPARTURE_PLACE, setDeparturePlace] = useState('');
    

    const navigate = useNavigate();
    const watch = useForm();

    const [Flight_Type, setFlightType] = useState('Select Flight Type');

    const [arrivalContentVisible, setArrivalContentVisible] = useState(false);
    const [departureContentVisible, setDepartureContentVisible] = useState(false);

    const handleOnChange = (e) => {
        console.log("handleOnChange");
        setFlightType(e.target.value);

        console.log("handleOnChange");
        console.log(Flight_Type);
      };

    const goHome = () => {
        navigate('/');
    }

    const arrSaveFlight = async (e) => {
      e.preventDefault();
      await axios.post('http://localhost:5001/api/v1/flights/',{
          FLIGHT_CODE: FLIGHT_CODE,
          AIRLINE_CODE: AIRLINE_CODE,
          ARRIVAL_PLACE: 'SFO',
          DEPARTURE_PLACE: DEPARTURE_PLACE,
          ARRIVAL_DATE: ARRIVAL_DATE,
          DEPARTURE_DATE: null
      });
      
      navigate("/");
    }

    const depSaveFlight = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5001/api/v1/flights/',{
            FLIGHT_CODE: FLIGHT_CODE,
            AIRLINE_CODE: AIRLINE_CODE,
            ARRIVAL_PLACE: ARRIVAL_PLACE,
            DEPARTURE_PLACE: 'SFO',
            ARRIVAL_DATE: null,
            DEPARTURE_DATE: DEPARTURE_DATE
        });
        
        navigate("/");
      }

    useEffect(() => {
        Flight_Type === "Arrival"
          ? setArrivalContentVisible(true)
          : setArrivalContentVisible(false);
          Flight_Type === "Departure" ? setDepartureContentVisible(true) : setDepartureContentVisible(false);
      }, [Flight_Type]);

    function ArrSubmitButton(){
        if (FLIGHT_CODE && AIRLINE_CODE){
            return (<button className='dashbord-btn' onClick={ arrSaveFlight }> Add Flight </button>)
        }else{
            return <button className='dashbord-btn' type="button" disabled>Add Flight</button>
        }
    }
    function DepSubmitButton(){
        if (FLIGHT_CODE && AIRLINE_CODE){
            return (<button className='dashbord-btn' onClick={ depSaveFlight }> Add Flight </button>)
        }else{
            return <button className='dashbord-btn' type="button" disabled>Add Flight</button>
        }
    }
    const Arrival = () => {
            return (
                <React.Fragment>
                    <div className='dropdown'>
                        <label className="label">Departure Place</label>
                        <input
                            className="input"
                            type="text"
                            placeholder="Departure Place"
                            value={DEPARTURE_PLACE}
                            onChange={(e) => setDeparturePlace(e.target.value)} />
                    </div>
                    <div className='dropdown'>
                            <label className="label">Arrival Time</label>
                            <input
                                className="input"
                                type="datetime-local"
                                placeholder="ARRIVAL_DATE"
                                value={ARRIVAL_DATE}
                                onChange={(e) => setArrivalDate(e.target.value)} />
                    </div>
                    
            </React.Fragment>
            

            );
    };

    const Departure = () => {
        // }else if(Flight_Type == "Departure"){
            return (
            <React.Fragment>
                <div className='dropdown'>
                    <label className="label">Arrival Place</label>
                    <input
                        className="input"
                        type="text"
                        placeholder="Arrival Place"
                        value={ARRIVAL_PLACE}
                        onChange={(e) => setArrivalPlace(e.target.value)} />
                </div>
                <div className='dropdown'>
                        <label className="label">Departure Time</label>
                        <input
                            className="input"
                            type="datetime-local"
                            placeholder="DEPARTURE_DATE"
                            value={DEPARTURE_DATE}
                            onChange={(e) => setDepartureDate(e.target.value)} />
                </div>
            </React.Fragment>
            );
        };
    // }


    return (
      <div className='dashboard-content'>
        <DashboardHeader btnText="Home" onClick={goHome}/>
        <form>
          {/* <form onSubmit={ saveFlight }> */}
                <div className='dashboard-content-dropdown'>
                {/* <div className="field"> */}
                
                <div className='dropdown'>
                    <label className="label">Flight Code</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Flight Code"
                        value={ FLIGHT_CODE }
                        onChange={ (e) => setFlightCode(e.target.value) }
                    />
                </div>
                <div className='dropdown'>
                    <label className="label">Airline Code</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Airline Code"
                        value={ AIRLINE_CODE }
                        onChange={ (e) => setAirlineCode(e.target.value) }
                    />
                </div>
                <div className='dropdown'>
                <label className="label">FlightType</label>
                    <select name="flightType" id="flightType" onChange={handleOnChange}>
                        <option value="">--Select Flight Type--</option>
                        <option value="Arrival">Arrival</option>
                        <option value="Departure">Departure</option>
                    </select>
                    
                </div>
                <div className='dropdown'>
                    {arrivalContentVisible && <Arrival />}
                    {departureContentVisible && <Departure />}
                </div>
                <div className='dropdown'>
                    {arrivalContentVisible && <ArrSubmitButton/>}
                    {departureContentVisible && <DepSubmitButton/>}
                    
                </div>
                </div>

          </form>
      </div>
  )

}
export default AddFlight;
