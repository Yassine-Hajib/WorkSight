import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home              from './pages/Home';
import SignIn            from './pages/SignIn';
import SignUp            from './pages/SignUp';
import ManagerDashboard  from './pages/ManagerDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import InternDashboard   from './pages/InternDashboard';

function Guard({ role, children }) {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (!user.userId)              return <Navigate to="/signin" replace />;
    if (role && user.role !== role) return <Navigate to="/signin" replace />;
    return children;
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"                   element={<Home />} />
                <Route path="/signin"             element={<SignIn />} />
                <Route path="/signup"             element={<SignUp />} />
                <Route path="/manager-dashboard"  element={<Guard role="MANAGER"><ManagerDashboard /></Guard>} />
                <Route path="/employee-dashboard" element={<Guard role="EMPLOYEE"><EmployeeDashboard /></Guard>} />
                <Route path="/intern-dashboard"   element={<Guard role="INTERN"><InternDashboard /></Guard>} />
                <Route path="*"                   element={<Navigate to="/signin" replace />} />
            </Routes>
        </BrowserRouter>
    );
}