import React, { FC } from 'react';
import '../styles/App.css';
import LibraryBar from './LibraryBar';
import UnitListBar from './UnitListBar';
import DetailListBar from './DetailListBar';
import PrintPreviewBar from './PrintPreviewBar';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

const MainContainer:FC = () => { 
  const state = useSelector((store: RootState) => store.state)
  const disabled = Object.keys(state.detailList).length===0;
  return (
    <div className="container-fluid">
    <div className="row">
    <LibraryBar/>
    <UnitListBar/>
    <DetailListBar/>
    <PrintPreviewBar disabled={disabled}/>
    </div>
    </div>
  );
}

export default MainContainer; 
