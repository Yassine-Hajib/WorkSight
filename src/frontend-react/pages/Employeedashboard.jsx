import React from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeDashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        navigate('/signin');
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0f1117',
            color: '#f0f1ff',
            fontFamily: "'DM Sans', sans-serif",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem'
        }}>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '2rem', fontWeight: 800 }}>
                💼 Employee Dashboard
            </h1>
            <p style={{ color: '#8b92b8' }}>Bienvenue, <strong style={{ color: '#2dd4bf' }}>{user.userName}</strong></p>
            <button
                onClick={handleLogout}
                style={{
                    marginTop: '1rem',
                    padding: '0.6rem 1.6rem',
                    background: '#6366f1',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.95rem'
                }}
            >
                Se déconnecter
            </button>
        </div>
    );
}

export default EmployeeDashboard;