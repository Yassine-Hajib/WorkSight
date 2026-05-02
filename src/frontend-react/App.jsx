import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Employeedashboard from "./pages/Employeedashboard.jsx";
import InternDashboard from "./pages/Interndashboard.jsx";
import Interndashboard from "./pages/Interndashboard.jsx";
import Managerdashboard from "./pages/Managerdashboard.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"                    element={<Home />} />
                <Route path="/signin"              element={<SignIn />} />
                <Route path="/signup"              element={<SignUp />} />
                <Route path="/manager-dashboard"   element={<Managerdashboard />} />
                <Route path="/employee-dashboard"  element={<Employeedashboard />} />
                <Route path="/dashboard/intern"    element={<Interndashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;