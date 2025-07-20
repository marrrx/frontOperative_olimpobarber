import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { App } from "./App";
import { CitasFormProvider } from "./general/contexts/CitasFormContext/CitasFormContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import 'bootstrap-icons/font/bootstrap-icons.css'
import { DataProvider } from "./general/contexts/DataContext/DataContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localeData from 'dayjs/plugin/localeData';
import "dayjs/locale/es"; 
import "./modules/schedule/styles/styles.css";



dayjs.extend(localeData);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('es'); 


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <DataProvider>
      <CitasFormProvider>
        <App />
      </CitasFormProvider>
      </DataProvider>
    </LocalizationProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
