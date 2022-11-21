import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useLocation} from 'react-router';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './components/Login';
import Signup from './components/Signup';
import App from './App';
import configureStore from './store/configureStore';
import routes from './routes';
import Home from './Home';
import './index.css';
import RoutesClass from './components/RoutesClass';



const store = configureStore();
const mapStateToProps = (response) => ({response});

ReactDOM.render(
  <>
  <header style={{fontFamily: 'san-serif',padding: '10px',
      color: 'white',textAlign:'center',
      fontSize: '48px', backgroundColor: '#007AFF'}}>Airport Management System</header>
      <div style={{paddingBottom: '50px'}}></div>
      <Provider store={store}><RoutesClass/></Provider>
      
    </>
  , document.getElementById('root'));