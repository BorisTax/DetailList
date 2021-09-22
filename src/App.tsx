import React, { FC } from 'react';
import './styles/App.css';
import LibraryBar from './components/LibraryBar';
import DetailBar from './components/DetailBar';
import UnitListBar from './components/UnitListBar';
import DetailListBar from './components/DetailListBar';

const App:FC = () => { 
  return (
    <div style={{display:"flex"}}>
    <div className="leftSideBar">  
     <LibraryBar/>
     <DetailBar/>
    </div>
    <UnitListBar/>
    <DetailListBar/>
    </div>
  );
}

export default App; 
