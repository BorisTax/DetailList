import React, { FC, Fragment } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import LibraryBar from './components/LibraryBar';
import DetailBar from './components/DetailBar';
import UnitListBar from './components/UnitListBar';

const App:FC = () => { 
  return (
    <div style={{display:"flex"}}>
    <div className="leftSideBar">  
     <LibraryBar/>
     <DetailBar/>
    </div>
    <UnitListBar/>
    </div>
  );
}

export default App; 
