import React, { FC } from 'react';
import '../styles/App.css';
import LibraryBar from './LibraryBar';
import UnitListBar from './UnitListBar';
import DetailListBar from './DetailListBar';
import PrintPreviewBar from './PrintPreviewBar';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

const MainContainer:FC = () => { 
  //style={{display:"flex",justifyContent:"stretch",flexWrap:"wrap"}}
  const state = useSelector((store: RootState) => store.state)
  return (
    <div className="container-fluid">
    <div className="row">
    <LibraryBar/>
    <UnitListBar/>
    <DetailListBar/>
    <PrintPreviewBar/>
    </div>
    </div>
  );
}

export default MainContainer; 
