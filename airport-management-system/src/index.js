import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useLocation} from 'react-router';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './components/Login';
import Signup from './components/Signup';
import App from './App';
import configureStore from './store/configureStore';
import routes from './routes';
import Home from './Home';
import './index.css';
import DashboardPage from './components/Dashboard';

const store = configureStore();
function isLoggedIn() {
  if (localStorage.getItem('token')) {
    return true;
  }

  return false;
}

function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({
      pathname: '/login'
    });
  }
}

ReactDOM.render(
  <>
  <header style={{fontFamily: 'san-serif',padding: '10px',
      color: 'white',textAlign:'center',
      fontSize: '48px', backgroundColor: '#007AFF'}}>Airport Management System</header>
      <div style={{paddingBottom: '50px'}}></div>
  <Provider store={store}>
    <BrowserRouter history= {useLocation}>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route exact path='/login' element={<Login/>} />
    <Route exact path='/register' element={<Signup/>} />
    <Route path='/dashboard' element={<DashboardPage/>} onEnter={requireAuth} />
  </Routes>
      </BrowserRouter>

  </Provider></>
  , document.getElementById('root'));