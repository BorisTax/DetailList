import React, { FC } from 'react';
import '../styles/App.css';
import LibraryBar from './LibraryBar';
import DetailBar from './DetailBar';
import UnitListBar from './UnitListBar';
import DetailListBar from './DetailListBar';

const MainContainer:FC = () => { 
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

export default MainContainer; 
