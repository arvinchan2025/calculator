import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {I18nextProvider} from "react-i18next";
import i18next from "./i18n";
import MuiThemeProvider from "@/providers/MuiThemeProvider";
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <MuiThemeProvider>
        <App/>
      </MuiThemeProvider>
    </I18nextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
