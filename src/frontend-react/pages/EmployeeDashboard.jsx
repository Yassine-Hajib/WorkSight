import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeDashboard.css';
import { getMyTasks, updateTaskStatus } from '../services/api';

const TABS = [
    { id: 'overview', icon: '📋', label: 'Aperçu'    },
    { id: 'tasks',    icon: '✅', label: 'Mes tâches' },
];

export default function EmployeeDashboard() {
    const navigate   = useNavigate();
    const user       = JSON.parse(sessionStorage.getItem('user') || '{}');
    const employeeId = user.employeeId;

    const [tab,     setTab]     = useState('overview');
    const [tasks,   setTasks]   = useState([]);
    const [loading, setLoading] = useState(false);
    const [msg,     setMsg]     = useState({ text:'', type:'' });

    useEffect(() => {
        if (!employeeId) { navigate('/signin'); return; }
        load();
    }, []);

    const load = async () => {
        setLoading(true);
        try {
            const t = await getMyTasks(employeeId);
            setTasks(Array.isArray(t) ? t : []);
        } catch { flash('Erreur de chargement.', 'error'); }
        setLoading(false);
    };

    const flash = (text, type='info') => {
        setMsg({ text, type });
        setTimeout(() => setMsg({ text:'', type:'' }), 3000);
    };

    const handleStatus = async (taskId, status) => {
        try { await updateTaskStatus(taskId, status); flash('Statut mis à jour !', 'ok'); load(); }
        catch { flash('Erreur.', 'error'); }
    };

    const logout = () => { sessionStorage.clear(); navigate('/signin'); };

    const done    = tasks.filter(t => t.statusTask === 'Completed').length;
    const inProg  = tasks.filter(t => t.statusTask === 'In Progress').length;
    const pending = tasks.filter(t => t.statusTask === 'Pending').length;
    const pct     = tasks.length > 0 ? Math.round(done * 100 / tasks.length) : 0;

    const badge = (s) => {
        if (s === 'Completed')   return <span className="ed-badge badge-done">✓ Terminé</span>;
        if (s === 'In Progress') return <span className="ed-badge badge-progress">⏳ En cours</span>;
        return <span className="ed-badge badge-pending">○ En attente</span>;
    };

    const progColor = (p) =>
        p > 70 ? 'linear-gradient(90deg,#059669,#34d399)'
            : p > 40 ? 'linear-gradient(90deg,#d97706,#fbbf24)'
                : 'linear-gradient(90deg,#dc2626,#f87171)';

    return (
        <div className="ed-root">
            <aside className="ed-sidebar">
                <div className="ed-logo">WorkSight</div>
                <div className="ed-logo-sub">Espace Employé</div>
                {TABS.map(t => (
                    <button key={t.id}
                            className={`ed-nav-btn ${tab === t.id ? 'active' : ''}`}
                            onClick={() => setTab(t.id)}>
                        {t.icon} {t.label}
                    </button>
                ))}
                <button className="ed-logout" onClick={logout}>🚪 Déconnexion</button>
            </aside>

            <main className="ed-main">
                <div className="ed-topbar">
                    <h1 className="ed-topbar-title">
                        {TABS.find(t => t.id === tab)?.icon}{' '}
                        {TABS.find(t => t.id === tab)?.label}
                    </h1>
                    <div className="ed-chip">Bonjour, <span>{user.userName}</span></div>
                </div>

                {msg.text  && <div className={`ed-alert ed-alert-${msg.type}`}>{msg.text}</div>}
                {loading   && <div className="ed-alert ed-alert-info">⏳ Chargement…</div>}

                {tab === 'overview' && (
                    <>
                        <div className="ed-stats">
                            <div className="ed-stat"><div className="ed-stat-label">Total</div><div className="ed-stat-value c-blue">{tasks.length}</div></div>
                            <div className="ed-stat"><div className="ed-stat-label">Terminées</div><div className="ed-stat-value c-green">{done}</div></div>
                            <div className="ed-stat"><div className="ed-stat-label">En cours</div><div className="ed-stat-value c-yellow">{inProg}</div></div>
                            <div className="ed-stat"><div className="ed-stat-label">En attente</div><div className="ed-stat-value c-gray">{pending}</div></div>
                        </div>

                        <div className="ed-card">
                            <div className="ed-card-title">🎯 Ma progression</div>
                            <div className="ed-prog-row">
                                <div className="ed-prog-info"><span>Tâches complétées</span><span>{done}/{tasks.length} — {pct}%</span></div>
                                <div className="ed-prog-track">
                                    <div className="ed-prog-fill" style={{width:`${pct}%`,background:progColor(pct)}} />
                                </div>
                            </div>
                            <p style={{color:'#2d3055',fontSize:'.8rem',marginTop:'.5rem'}}>
                                {pct >= 80 ? '🌟 Excellent travail !' : pct >= 50 ? '💪 Bon avancement !' : '📌 Des tâches vous attendent.'}
                            </p>
                        </div>

                        <div className="ed-card">
                            <div className="ed-card-title">📋 Tâches récentes</div>
                            {tasks.length === 0
                                ? <div className="ed-empty">Aucune tâche assignée.</div>
                                : tasks.slice(0,4).map(task => (
                                    <div key={task.taskId} className="ed-task">
                                        <div>
                                            <div className="ed-task-title">{task.titleTask}</div>
                                            {task.deadlineTask && <div className="ed-task-meta">📅 {task.deadlineTask}</div>}
                                        </div>
                                        {badge(task.statusTask)}
                                    </div>
                                ))
                            }
                        </div>
                    </>
                )}

                {tab === 'tasks' && (
                    <div className="ed-card">
                        <div className="ed-card-title">
                            Toutes mes tâches
                            <span style={{color:'#2d3055',fontWeight:400,fontSize:'.82rem',marginLeft:'.5rem'}}>({tasks.length})</span>
                        </div>
                        {tasks.length === 0
                            ? <div className="ed-empty">Aucune tâche assignée.<br />Votre manager vous en assignera prochainement.</div>
                            : tasks.map(task => (
                                <div key={task.taskId} className="ed-task">
                                    <div style={{flex:1}}>
                                        <div className="ed-task-title">{task.titleTask}</div>
                                        {task.descriptionTask && <div className="ed-task-desc">{task.descriptionTask}</div>}
                                        {task.deadlineTask && <div className="ed-task-meta">📅 Deadline : {task.deadlineTask}</div>}
                                    </div>
                                    <div className="ed-task-right">
                                        {badge(task.statusTask)}
                                        <select className="ed-select" value={task.statusTask}
                                                onChange={e => handleStatus(task.taskId, e.target.value)}>
                                            <option value="Pending">En attente</option>
                                            <option value="In Progress">En cours</option>
                                            <option value="Completed">Terminé</option>
                                        </select>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )}
            </main>
        </div>
    );
}