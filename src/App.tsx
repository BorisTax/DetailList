import React, { FC } from 'react';
import './styles/App.css';
import MainContainer from './components/MainContainer';
import Confirm from './components/Confirm';
import { useSelector } from 'react-redux';
import { RootState } from './reducers';
import Alert from './components/Alert';
import InputForm from './components/InputForm';

const App:FC = () => { 
  const state = useSelector((store: RootState) => store.messages)
  return (
      <div>
      <MainContainer/>
      {(state.type==='confirm'&&state.show)?<Confirm title={state.title} onOkAction={()=>state.onOkAction()}/>:<></>}
      {(state.type==='alert'&&state.show)?<Alert title={state.title}/>:<></>}
      {(state.type==='input'&&state.show)?<InputForm title={state.title} inputform={state.inputform||[]} onOkAction={()=>state.onOkAction()}/>:<></>}
      </div>
  );
}

export default App; 
