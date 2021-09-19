import React, { FC, Fragment } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import LibraryBar from './components/LibraryBar';

const App:FC = () => { 
  return (
    <>
    <div className="App">  
     <LibraryBar/>
    </div>
    </>
  );
}

export default App; 
