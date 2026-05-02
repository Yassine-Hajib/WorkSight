import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import "./Auth.css";

const LEFT_PILLS = [
  { icon: "👥", cls: "icon-indigo", label: "Gestion des équipes",    desc: "Supervisez vos employés en temps réel" },
  { icon: "✅", cls: "icon-teal",   label: "Suivi des tâches",       desc: "Assignez et suivez l'avancement" },
  { icon: "📊", cls: "icon-pink",   label: "Analyse de productivité", desc: "Rapports détaillés et KPIs" },
];

function SignIn() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role,     setRole]     = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!userName || !password || !role) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    setLoading(true);
    try {
      const data = await loginUser(userName, password, role);
      if (data.success) {
        sessionStorage.setItem("user", JSON.stringify({
          userId:    data.userId,
          userName:  data.userName,
          role:      data.role,
          managerId: data.managerId,
        }));
        if (data.role === "MANAGER")       navigate("/manager-dashboard");
        else if (data.role === "EMPLOYEE") navigate("/employee-dashboard");
        else                               navigate("/dashboard/intern");
      } else {
        setError(data.message);
      }
    } catch {
      setError("Impossible de contacter le serveur. Vérifiez que le backend est lancé.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="auth-root">

        {/* ─── LEFT PANEL ─── */}
        <div className="auth-left">
          <div className="auth-left-inner">
            <div>
              <h1 className="auth-left-title">
                Bon retour sur<br />
                <span>WorkSight</span>
              </h1>
              <p className="auth-left-sub" style={{ marginTop: '0.75rem' }}>
                Connectez-vous pour superviser vos équipes, suivre vos tâches
                et analyser la productivité en temps réel.
              </p>
            </div>

            <div className="auth-pills">
              {LEFT_PILLS.map((p, i) => (
                  <div className="auth-pill" key={i}>
                    <div className={`auth-pill-icon ${p.cls}`}>{p.icon}</div>
                    <div className="auth-pill-text">
                      <span className="auth-pill-label">{p.label}</span>
                      <span className="auth-pill-desc">{p.desc}</span>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── RIGHT PANEL ─── */}
        <div className="auth-right">
          <div className="auth-card">

            <div className="auth-card-header">
              <div className="auth-card-icon">🔐</div>
              <h2 className="auth-card-title">Connexion</h2>
              <p className="auth-card-sub">Accédez à votre espace WorkSight</p>
            </div>

            {error && (
                <div className="auth-alert auth-alert-error">
                  ⚠️ {error}
                </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>

              <div className="auth-field">
                <label>Nom d'utilisateur</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">👤</span>
                  <input
                      type="text"
                      className="auth-input"
                      placeholder="Entrez votre nom d'utilisateur"
                      value={userName}
                      onChange={e => setUserName(e.target.value)}
                      autoComplete="username"
                  />
                </div>
              </div>

              <div className="auth-field">
                <label>Mot de passe</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">🔑</span>
                  <input
                      type="password"
                      className="auth-input"
                      placeholder="Entrez votre mot de passe"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      autoComplete="current-password"
                  />
                </div>
              </div>

              <div className="auth-field">
                <label>Rôle</label>
                <div className="auth-input-wrap auth-select-wrap">
                  <span className="auth-input-icon">🏷️</span>
                  <select
                      className="auth-select"
                      value={role}
                      onChange={e => setRole(e.target.value)}
                  >
                    <option value="">Sélectionnez votre rôle</option>
                    <option value="MANAGER">Manager</option>
                    <option value="EMPLOYEE">Employé</option>
                    <option value="INTERN">Stagiaire</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="auth-btn" disabled={loading}>
                {loading
                    ? <><div className="auth-spinner" /> Connexion en cours…</>
                    : <>Se connecter →</>
                }
              </button>
            </form>

            <p className="auth-footer-link">
              Pas encore de compte ?{" "}
              <Link to="/signup">Créer un compte</Link>
            </p>
          </div>
        </div>

      </div>
  );
}

export default SignIn;