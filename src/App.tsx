import React, { FC } from 'react';
import './styles/App.css';
import MainContainer from './components/MainContainer';
import Confirm from './components/Confirm';
import { useSelector } from 'react-redux';
import { RootState } from './reducers';

const App:FC = () => { 
  const state = useSelector((store: RootState) => store.messages)
  return (
      <>
      
      <MainContainer/>
      {(state.type==='confirm'&&state.show)?<Confirm title={state.title} onOkAction={()=>state.onOkAction()}/>:<></>}
      </>
  );
}

export default App; 
