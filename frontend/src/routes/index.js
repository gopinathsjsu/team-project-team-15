import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';

import Login from '../components/Login';
import Signup from '../components/Signup';

export default (
  <Routes>
    <Route path='/' element={App} />
    <Route exact path='login' element={Login} />
    <Route exact path='register' element={Signup} />
  </Routes>
);