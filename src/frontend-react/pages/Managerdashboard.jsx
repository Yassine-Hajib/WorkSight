import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManagerDashboard.css';
import {
    getStats, getEmployees, addEmployee, updateEmployee, deleteEmployee,
    getTasks, addTask, updateTaskStatus, deleteTask
} from '../services/api';

const TABS = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard'  },
    { id: 'employees', icon: '👥', label: 'Employés'   },
    { id: 'tasks',     icon: '✅', label: 'Tâches'     },
    { id: 'analytics', icon: '📈', label: 'Analytique' },
];

const EMPTY_EMP  = { employeName: '', emailEmploye: '', password: '', role: 'EMPLOYEE' };
const EMPTY_TASK = { titleTask: '', descriptionTask: '', deadlineTask: '', employeesId: '' };

function ManagerDashboard() {
    const navigate  = useNavigate();
    const user      = JSON.parse(sessionStorage.getItem('user') || '{}');
    const managerId = user.managerId;

    const [tab,       setTab]       = useState('dashboard');
    const [stats,     setStats]     = useState({});
    const [employees, setEmployees] = useState([]);
    const [tasks,     setTasks]     = useState([]);
    const [loading,   setLoading]   = useState(false);
    const [msg,       setMsg]       = useState({ text: '', type: '' });
    const [empForm,   setEmpForm]   = useState(EMPTY_EMP);
    const [editEmp,   setEditEmp]   = useState(null);
    const [taskForm,  setTaskForm]  = useState(EMPTY_TASK);

    useEffect(() => {
        if (!managerId) { navigate('/signin'); return; }
        loadAll();
    }, []);

    const loadAll = async () => {
        setLoading(true);
        try {
            const [s, e, t] = await Promise.all([
                getStats(managerId),
                getEmployees(managerId),
                getTasks(managerId),
            ]);
            setStats(s || {});
            setEmployees(Array.isArray(e) ? e : []);
            setTasks(Array.isArray(t) ? t : []);
        } catch { flash('Erreur de chargement.', 'error'); }
        setLoading(false);
    };

    const flash = (text, type = 'info') => {
        setMsg({ text, type });
        setTimeout(() => setMsg({ text: '', type: '' }), 3500);
    };

    const logout = () => { sessionStorage.clear(); navigate('/signin'); };

    /* ── Employee handlers ── */
    const handleAddEmployee = async (e) => {
        e.preventDefault();
        if (!empForm.employeName || !empForm.emailEmploye || !empForm.password) {
            flash('Veuillez remplir tous les champs.', 'error'); return;
        }
        if (empForm.password.length < 4) {
            flash('Mot de passe minimum 4 caractères.', 'error'); return;
        }
        try {
            const res = await addEmployee(managerId, empForm);
            if (res.success) {
                flash('Compte créé avec succès !', 'ok');
                setEmpForm(EMPTY_EMP);
                loadAll();
            } else flash(res.message || 'Échec.', 'error');
        } catch { flash('Erreur serveur.', 'error'); }
    };

    const handleUpdateEmployee = async (e) => {
        e.preventDefault();
        try {
            const res = await updateEmployee(editEmp.employeesId, editEmp);
            if (res.success) { flash('Mis à jour.', 'ok'); setEditEmp(null); loadAll(); }
            else flash('Mise à jour échouée.', 'error');
        } catch { flash('Erreur serveur.', 'error'); }
    };

    const handleDeleteEmployee = async (id) => {
        if (!window.confirm('Supprimer cet employé et son compte ?')) return;
        try {
            const res = await deleteEmployee(id);
            if (res.success) { flash('Supprimé.', 'ok'); loadAll(); }
            else flash('Échec suppression.', 'error');
        } catch { flash('Erreur serveur.', 'error'); }
    };

    /* ── Task handlers ── */
    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!taskForm.titleTask || !taskForm.employeesId) {
            flash('Titre et employé sont obligatoires.', 'error'); return;
        }
        try {
            const res = await addTask(managerId, taskForm);
            if (res.success) {
                flash('Tâche créée !', 'ok');
                setTaskForm(EMPTY_TASK);
                loadAll();
            } else flash(res.message || 'Échec.', 'error');
        } catch { flash('Erreur serveur.', 'error'); }
    };

    const handleUpdateStatus = async (taskId, status) => {
        try { await updateTaskStatus(taskId, status); loadAll(); }
        catch { flash('Erreur statut.', 'error'); }
    };

    const handleDeleteTask = async (id) => {
        if (!window.confirm('Supprimer cette tâche ?')) return;
        try { await deleteTask(id); flash('Tâche supprimée.', 'ok'); loadAll(); }
        catch { flash('Erreur serveur.', 'error'); }
    };

    /* ── Helpers ── */
    const statusBadge = (s) => {
        if (s === 'Completed')    return <span className="md-badge md-badge-done">✓ Terminé</span>;
        if (s === 'In Progress')  return <span className="md-badge md-badge-progress">⏳ En cours</span>;
        return <span className="md-badge md-badge-pending">○ En attente</span>;
    };

    const empBadge = (s) => {
        if (s === 'Online')  return <span className="md-badge md-badge-online">● En ligne</span>;
        if (s === 'Working') return <span className="md-badge md-badge-working">⚡ Actif</span>;
        return <span className="md-badge md-badge-offline">○ Hors ligne</span>;
    };

    const empNameById = (id) =>
        employees.find(e => e.employeesId === id)?.employeName || '—';

    const completedCount  = tasks.filter(t => t.statusTask === 'Completed').length;
    const inProgressCount = tasks.filter(t => t.statusTask === 'In Progress').length;
    const pendingCount    = tasks.filter(t => t.statusTask === 'Pending').length;
    const productivity    = tasks.length > 0 ? Math.round(completedCount * 100 / tasks.length) : 0;

    /* ══════════════════════════════ RENDER ══════════════════════════════ */
    return (
        <div className="md-root">

            {/* ── SIDEBAR ── */}
            <aside className="md-sidebar">
                <div className="md-logo">WorkSight</div>
                <div className="md-logo-sub">Espace Manager</div>

                {TABS.map(t => (
                    <button key={t.id}
                            className={`md-nav-btn ${tab === t.id ? 'active' : ''}`}
                            onClick={() => setTab(t.id)}>
                        <span className="md-nav-icon">{t.icon}</span>
                        {t.label}
                    </button>
                ))}

                <button className="md-logout" onClick={logout}>
                    <span className="md-nav-icon">🚪</span>
                    Se déconnecter
                </button>
            </aside>

            {/* ── MAIN ── */}
            <main className="md-main">

                {/* Topbar */}
                <div className="md-topbar">
                    <h1 className="md-topbar-title">
                        {TABS.find(t => t.id === tab)?.icon}{' '}
                        {TABS.find(t => t.id === tab)?.label}
                    </h1>
                    <div className="md-welcome-chip">
                        Bonjour, <span>{user.userName}</span>
                    </div>
                </div>

                {/* Alerts */}
                {msg.text && (
                    <div className={`md-alert md-alert-${msg.type}`}>{msg.text}</div>
                )}
                {loading && (
                    <div className="md-alert md-alert-info">⏳ Chargement…</div>
                )}

                {/* ══ DASHBOARD ══ */}
                {tab === 'dashboard' && (
                    <>
                        <div className="md-stats">
                            <div className="md-stat-card">
                                <div className="md-stat-label">Employés</div>
                                <div className="md-stat-value md-stat-blue">{employees.length}</div>
                            </div>
                            <div className="md-stat-card">
                                <div className="md-stat-label">Total tâches</div>
                                <div className="md-stat-value md-stat-purple">{tasks.length}</div>
                            </div>
                            <div className="md-stat-card">
                                <div className="md-stat-label">Terminées</div>
                                <div className="md-stat-value md-stat-green">{completedCount}</div>
                            </div>
                            <div className="md-stat-card">
                                <div className="md-stat-label">En cours</div>
                                <div className="md-stat-value md-stat-amber">{inProgressCount}</div>
                            </div>
                            <div className="md-stat-card">
                                <div className="md-stat-label">Productivité</div>
                                <div className="md-stat-value md-stat-yellow">{productivity}%</div>
                            </div>
                        </div>

                        <div className="md-grid2">
                            {/* Recent employees */}
                            <div className="md-card">
                                <div className="md-card-title">👥 Employés récents</div>
                                {employees.length === 0 ? (
                                    <div className="md-empty">Aucun employé.</div>
                                ) : (
                                    <table className="md-table">
                                        <thead>
                                        <tr>
                                            <th>Nom</th>
                                            <th>Email</th>
                                            <th>Statut</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {employees.slice(0, 5).map(emp => (
                                            <tr key={emp.employeesId}>
                                                <td>{emp.employeName}</td>
                                                <td style={{ color: '#5b6280' }}>{emp.emailEmploye}</td>
                                                <td>{empBadge(emp.status)}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>

                            {/* Recent tasks */}
                            <div className="md-card">
                                <div className="md-card-title">✅ Tâches récentes</div>
                                {tasks.length === 0 ? (
                                    <div className="md-empty">Aucune tâche.</div>
                                ) : tasks.slice(0, 5).map(task => (
                                    <div key={task.taskId} className="md-task-card">
                                        <div>
                                            <div className="md-task-title">{task.titleTask}</div>
                                            <div className="md-task-meta">
                                                👤 {empNameById(task.employeesId)}
                                            </div>
                                        </div>
                                        {statusBadge(task.statusTask)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* ══ EMPLOYEES ══ */}
                {tab === 'employees' && (
                    <>
                        {/* Edit form */}
                        {editEmp && (
                            <div className="md-edit-panel">
                                <div className="md-edit-title">✏️ Modifier l'employé</div>
                                <form className="md-form" onSubmit={handleUpdateEmployee}>
                                    <div className="md-form-row md-form-row-3">
                                        <div>
                                            <div className="md-input-label">Nom complet</div>
                                            <input className="md-input" type="text"
                                                   value={editEmp.employeName}
                                                   onChange={e => setEditEmp({ ...editEmp, employeName: e.target.value })} />
                                        </div>
                                        <div>
                                            <div className="md-input-label">Email</div>
                                            <input className="md-input" type="email"
                                                   value={editEmp.emailEmploye}
                                                   onChange={e => setEditEmp({ ...editEmp, emailEmploye: e.target.value })} />
                                        </div>
                                        <div>
                                            <div className="md-input-label">Statut</div>
                                            <select className="md-select" value={editEmp.status}
                                                    onChange={e => setEditEmp({ ...editEmp, status: e.target.value })}>
                                                <option value="Online">En ligne</option>
                                                <option value="Working">Actif</option>
                                                <option value="Offline">Hors ligne</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.7rem' }}>
                                        <button type="submit" className="md-btn md-btn-warning">
                                            💾 Enregistrer
                                        </button>
                                        <button type="button" className="md-btn md-btn-ghost"
                                                onClick={() => setEditEmp(null)}>
                                            Annuler
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Add form */}
                        {!editEmp && (
                            <div className="md-card">
                                <div className="md-card-title">➕ Ajouter un employé / stagiaire</div>
                                <form className="md-form" onSubmit={handleAddEmployee}>
                                    <div className="md-form-row md-form-row-2">
                                        <div>
                                            <div className="md-input-label">Nom complet *</div>
                                            <input className="md-input" type="text"
                                                   placeholder="ex: Ahmed Benali"
                                                   value={empForm.employeName}
                                                   onChange={e => setEmpForm({ ...empForm, employeName: e.target.value })} />
                                        </div>
                                        <div>
                                            <div className="md-input-label">Email (= identifiant de connexion) *</div>
                                            <input className="md-input" type="email"
                                                   placeholder="ex: ahmed@worksight.com"
                                                   value={empForm.emailEmploye}
                                                   onChange={e => setEmpForm({ ...empForm, emailEmploye: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="md-form-row md-form-row-2">
                                        <div>
                                            <div className="md-input-label">Mot de passe *</div>
                                            <input className="md-input" type="password"
                                                   placeholder="Minimum 4 caractères"
                                                   value={empForm.password}
                                                   onChange={e => setEmpForm({ ...empForm, password: e.target.value })} />
                                        </div>
                                        <div>
                                            <div className="md-input-label">Rôle *</div>
                                            <select className="md-select" value={empForm.role}
                                                    onChange={e => setEmpForm({ ...empForm, role: e.target.value })}>
                                                <option value="EMPLOYEE">Employé</option>
                                                <option value="INTERN">Stagiaire</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <button type="submit" className="md-btn md-btn-primary">
                                            ➕ Créer le compte
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Table */}
                        <div className="md-card">
                            <div className="md-card-title">
                                Tous les employés
                                <span style={{ color: '#3d4166', fontWeight: 400, fontSize: '0.82rem', marginLeft: '0.5rem' }}>
                                    ({employees.length})
                                </span>
                            </div>
                            {employees.length === 0 ? (
                                <div className="md-empty">Aucun employé enregistré.</div>
                            ) : (
                                <table className="md-table">
                                    <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Email</th>
                                        <th>Statut</th>
                                        <th>Tâches</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {employees.map(emp => (
                                        <tr key={emp.employeesId}>
                                            <td>{emp.employeName}</td>
                                            <td style={{ color: '#5b6280' }}>{emp.emailEmploye}</td>
                                            <td>{empBadge(emp.status)}</td>
                                            <td style={{ color: '#818cf8' }}>
                                                {tasks.filter(t => t.employeesId === emp.employeesId).length}
                                            </td>
                                            <td>
                                                <div className="md-actions">
                                                    <button className="md-btn md-btn-warning"
                                                            style={{ padding: '0.3rem 0.7rem', fontSize: '0.78rem' }}
                                                            onClick={() => setEditEmp({ ...emp })}>
                                                        ✏️
                                                    </button>
                                                    <button className="md-btn md-btn-danger"
                                                            style={{ padding: '0.3rem 0.7rem', fontSize: '0.78rem' }}
                                                            onClick={() => handleDeleteEmployee(emp.employeesId)}>
                                                        🗑
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </>
                )}

                {/* ══ TASKS ══ */}
                {tab === 'tasks' && (
                    <>
                        {/* Create task */}
                        <div className="md-card">
                            <div className="md-card-title">➕ Créer une tâche</div>
                            <form className="md-form" onSubmit={handleAddTask}>
                                <div className="md-form-row md-form-row-2">
                                    <div>
                                        <div className="md-input-label">Titre *</div>
                                        <input className="md-input" type="text"
                                               placeholder="Titre de la tâche"
                                               value={taskForm.titleTask}
                                               onChange={e => setTaskForm({ ...taskForm, titleTask: e.target.value })} />
                                    </div>
                                    <div>
                                        <div className="md-input-label">Assigner à *</div>
                                        <select className="md-select" value={taskForm.employeesId}
                                                onChange={e => setTaskForm({ ...taskForm, employeesId: e.target.value })}>
                                            <option value="">Sélectionner un employé</option>
                                            {employees.map(emp => (
                                                <option key={emp.employeesId} value={emp.employeesId}>
                                                    {emp.employeName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <div className="md-input-label">Description</div>
                                    <textarea className="md-textarea" rows={2}
                                              placeholder="Description optionnelle…"
                                              value={taskForm.descriptionTask}
                                              onChange={e => setTaskForm({ ...taskForm, descriptionTask: e.target.value })} />
                                </div>
                                <div className="md-form-row md-form-row-2">
                                    <div>
                                        <div className="md-input-label">Deadline</div>
                                        <input className="md-input" type="date"
                                               value={taskForm.deadlineTask}
                                               onChange={e => setTaskForm({ ...taskForm, deadlineTask: e.target.value })} />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <button type="submit" className="md-btn md-btn-primary" style={{ width: '100%' }}>
                                            ✅ Créer la tâche
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Task list */}
                        <div className="md-card">
                            <div className="md-card-title">
                                Toutes les tâches
                                <span style={{ color: '#3d4166', fontWeight: 400, fontSize: '0.82rem', marginLeft: '0.5rem' }}>
                                    ({tasks.length})
                                </span>
                            </div>
                            {tasks.length === 0 ? (
                                <div className="md-empty">Aucune tâche créée.</div>
                            ) : (
                                tasks.map(task => (
                                    <div key={task.taskId} className="md-task-card">
                                        <div style={{ flex: 1 }}>
                                            <div className="md-task-title">{task.titleTask}</div>
                                            {task.descriptionTask && (
                                                <div className="md-task-desc">{task.descriptionTask}</div>
                                            )}
                                            <div className="md-task-meta">
                                                👤 {empNameById(task.employeesId)}
                                                {task.deadlineTask && (
                                                    <span style={{ marginLeft: '0.8rem' }}>
                                                        📅 {String(task.deadlineTask).substring(0, 10)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="md-task-actions">
                                            <select className="md-status-select"
                                                    value={task.statusTask}
                                                    onChange={e => handleUpdateStatus(task.taskId, e.target.value)}>
                                                <option value="Pending">En attente</option>
                                                <option value="In Progress">En cours</option>
                                                <option value="Completed">Terminé</option>
                                            </select>
                                            <button className="md-btn md-btn-danger"
                                                    style={{ padding: '0.3rem 0.7rem', fontSize: '0.78rem' }}
                                                    onClick={() => handleDeleteTask(task.taskId)}>
                                                🗑 Supprimer
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                )}

                {/* ══ ANALYTICS ══ */}
                {tab === 'analytics' && (
                    <>
                        <div className="md-stats">
                            <div className="md-stat-card">
                                <div className="md-stat-label">En attente</div>
                                <div className="md-stat-value" style={{ color: '#9ca3af' }}>{pendingCount}</div>
                            </div>
                            <div className="md-stat-card">
                                <div className="md-stat-label">En cours</div>
                                <div className="md-stat-value md-stat-amber">{inProgressCount}</div>
                            </div>
                            <div className="md-stat-card">
                                <div className="md-stat-label">Terminées</div>
                                <div className="md-stat-value md-stat-green">{completedCount}</div>
                            </div>
                            <div className="md-stat-card">
                                <div className="md-stat-label">Productivité</div>
                                <div className="md-stat-value md-stat-yellow">{productivity}%</div>
                            </div>
                        </div>

                        {/* Productivity bar */}
                        <div className="md-card">
                            <div className="md-card-title">🎯 Productivité globale</div>
                            <div className="md-prod-wrap">
                                <div className="md-prod-bar" style={{ width: `${productivity}%` }}>
                                    {productivity}%
                                </div>
                            </div>
                            <p style={{ color: '#3d4166', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                                {completedCount} tâche(s) terminée(s) sur {tasks.length} au total
                            </p>
                        </div>

                        {/* Per-employee breakdown */}
                        <div className="md-card">
                            <div className="md-card-title">👥 Performance par employé</div>
                            {employees.length === 0 ? (
                                <div className="md-empty">Aucun employé.</div>
                            ) : employees.map(emp => {
                                const et   = tasks.filter(t => t.employeesId === emp.employeesId);
                                const done = et.filter(t => t.statusTask === 'Completed').length;
                                const pct  = et.length > 0 ? Math.round(done * 100 / et.length) : 0;
                                return (
                                    <div className="md-progress-row" key={emp.employeesId}>
                                        <div className="md-progress-info">
                                            <span>{emp.employeName}</span>
                                            <span>{done}/{et.length} — {pct}%</span>
                                        </div>
                                        <div className="md-progress-track">
                                            <div className="md-progress-fill"
                                                 style={{
                                                     width: `${pct}%`,
                                                     background: pct > 70
                                                         ? 'linear-gradient(90deg,#059669,#34d399)'
                                                         : pct > 40
                                                             ? 'linear-gradient(90deg,#d97706,#fbbf24)'
                                                             : 'linear-gradient(90deg,#dc2626,#f87171)'
                                                 }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}

            </main>
        </div>
    );
}

export default ManagerDashboard;