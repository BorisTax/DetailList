import React, { FC } from 'react';
import '../styles/App.css';
import LibraryBar from './LibraryBar';
import UnitListBar from './UnitListBar';
import DetailListBar from './DetailListBar';
import PrintPreviewBar from './PrintPreviewBar';

const MainContainer:FC = () => { 
  return (
    <>
    <div style={{display:"flex",justifyContent:"stretch",flexWrap:"wrap"}}>
    <LibraryBar/>
    <UnitListBar/>
    <DetailListBar/>
    
    </div>
    <PrintPreviewBar/>
    </>
  );
}

export default MainContainer; 
