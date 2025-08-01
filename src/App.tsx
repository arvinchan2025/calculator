import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainRouter from "./router/main";

function App() {
  return (
    <BrowserRouter basename={'/'}>
      <Routes>
        <Route path={'es/*'} element={<MainRouter/>}/>
        <Route path={'ar/*'} element={<MainRouter/>}/>
        {/*<Route path={'/zh/*'} element={<MainRouter/>}/>*/}
        <Route path={'*'} element={<MainRouter/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
