import React, { Component } from 'react';
import { useLocation} from 'react-router-dom';

function DashboardPage (){
    return (
      <div style={{textAlign:'center'}}>
        {useLocation().state.message}
      </div>
    );
}

export default DashboardPage;