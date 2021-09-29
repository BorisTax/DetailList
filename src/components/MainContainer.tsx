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
  return (
    <>
    <div style={{display:"flex",justifyContent:"stretch",flexWrap:"wrap"}}>
    <LibraryBar/>
    <UnitListBar/>
    <DetailListBar/>
    
    </div>
    <PrintPreviewBar plateCount={state.materialData.plateCount[state.activeDetailListMaterial]}/>
    <div id="canv"></div>
    </>
  );
}

export default MainContainer; 
