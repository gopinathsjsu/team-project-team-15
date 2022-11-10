import React, { Component } from 'react';
import { useLocation} from 'react-router-dom';

function DashboardPage (){
    return (
      <div style={{textAlign:'center'}}>
        {localStorage.getItem('user')}
      </div>
    );
}

export default DashboardPage;