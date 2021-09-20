import React, { FC, Fragment } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import LibraryBar from './components/LibraryBar';
import DetailBar from './components/DetailBar';

const App:FC = () => { 
  return (
    <>
    <div className="leftSideBar">  
     <LibraryBar/>
     <DetailBar/>
    </div>
    </>
  );
}

export default App; 
