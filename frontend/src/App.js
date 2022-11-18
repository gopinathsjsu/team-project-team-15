import React from 'react';
import { BrowserRouter as Router, Routes, Route, Switch  } from 'react-router-dom';

import './App.css';
import SideBar from './components/Sidebar/index.jsx';
import sidebar_menu from './constants/sidebar-menu.js';
import AddFlight from './pages/Flights/AddFlight.jsx';
import UpdateFlight from './pages/Flights/UpdateFlight.jsx';
import FlightsList from "./pages/Flights/DisplayFlights.jsx";
import { useNavigate, useParams, useLocation } from 'react-router-dom';


function App () {
  return(
    <Router>
      <div className='dashboard-container'>
        <SideBar menu={sidebar_menu} />
          
          <div className='dashboard-body'>
              <Routes>
                  <Route path="*" element={<div></div>} />
                  <Route exact path="/" element={< FlightsList/>} />
                  <Route exact path="/AddFlight" element={< AddFlight/>} />
                  <Route exact path="/update/:FLIGHT_CODE" element={< UpdateFlight/>} />
                  <Route exact path="/profile" element={<div></div>} />
              </Routes>
          </div>
      </div>
    </Router>
  )
}

export default App;