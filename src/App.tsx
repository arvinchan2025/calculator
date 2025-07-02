import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import MainRouter from "@/router/main";

function App() {
  return (
    <BrowserRouter basename={'/'}>
      <MainRouter/>
    </BrowserRouter>
  );
}

export default App;
