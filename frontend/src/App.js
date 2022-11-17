import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';

import './App.css';
import Orders from './pages/Orders';
import EnableGate from './pages/EnableGate';
import DisableGate from './pages/DisableGate';
import AssignGate from './pages/AssignGate';
import AssignBaggageCarousel from './pages/AssignBaggageCarousel';


function App () {
  return(
    <Router>
      <div className='dashboard-container'>
        <SideBar menu={sidebar_menu} />
          
          <div className='dashboard-body'>
              <Routes>
                  <Route path="*" element={<div></div>} />
                  <Route exact path="/enablegate" element={< EnableGate/>} />
                  <Route exact path="/disablegate" element={< DisableGate/>} />
                  <Route exact path="/assigngate" element={< AssignGate/ >} />
                  <Route exact path="/assignbaggagecarousel" element={< AssignBaggageCarousel/>} />
              </Routes>
          </div>
      </div>
    </Router>
  )
}

export default App;