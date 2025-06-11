import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { CareNetAdmin, CareNetPatients } from './constants/paths.js';
import { Registration } from './pages/Registration.jsx';
import { Login } from './pages/Login.jsx';
import { AdminLogin } from './pages/AdminLogin';


ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path={CareNetPatients.registration} element={<Registration/>}/>
      <Route path={CareNetPatients.login} element={<Login/>}/>
      <Route path={CareNetAdmin.login} element={<AdminLogin/>}/>
    </Routes>
  </BrowserRouter>
);

