import axios from "axios";
import React from "react";
import { Navigate, Route, Routes } from 'react-router-dom';
import { PageAuth } from "./PageAuth";
import { Login } from "./components/Login";

export const RoutesAuth = () => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    return (
        <Routes>
            <Route path='/*' element={<PageAuth />}>
                <Route path="" element={<Login/>} />
            </Route>
            <Route path='/*' element={<Navigate to={'../'} replace />} />
        </Routes>
    )
}