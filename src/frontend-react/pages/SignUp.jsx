import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import "./Auth.css";

const LEFT_PILLS = [
  { icon: "🚀", cls: "icon-indigo", label: "Démarrage rapide",       desc: "Opérationnel en moins de 10 minutes" },
  { icon: "🔒", cls: "icon-teal",   label: "Sécurisé",               desc: "Chiffrement des données de bout en bout" },
  { icon: "💬", cls: "icon-pink",   label: "Messagerie intégrée",    desc: "Communiquez sans quitter la plateforme" },
];

function SignUp() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role,     setRole]     = useState("");
  const [error,    setError]    = useState("");
  const [success,  setSuccess]  = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!userName || !password || !role) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    if (password.length < 4) {
      setError("Le mot de passe doit contenir au moins 4 caractères.");
      return;
    }
    setLoading(true);
    try {
      const data = await registerUser(userName, password, role);
      if (data.success) {
        setSuccess("Compte créé avec succès ! Redirection vers la connexion…");
        setTimeout(() => navigate("/signin"), 1500);
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
                Rejoignez<br />
                <span>WorkSight</span>
              </h1>
              <p className="auth-left-sub" style={{ marginTop: '0.75rem' }}>
                Créez votre compte en quelques secondes et commencez à gérer
                vos équipes à distance efficacement.
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
              <div className="auth-card-icon">✨</div>
              <h2 className="auth-card-title">Créer un compte</h2>
              <p className="auth-card-sub">Rejoignez WorkSight gratuitement</p>
            </div>

            {error && (
                <div className="auth-alert auth-alert-error">
                  ⚠️ {error}
                </div>
            )}
            {success && (
                <div className="auth-alert auth-alert-success">
                  ✅ {success}
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
                      placeholder="Choisissez un nom d'utilisateur"
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
                      placeholder="Choisissez un mot de passe (min. 4 car.)"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      autoComplete="new-password"
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
                    ? <><div className="auth-spinner" /> Création en cours…</>
                    : <>Créer mon compte →</>
                }
              </button>
            </form>

            <p className="auth-footer-link">
              Déjà un compte ?{" "}
              <Link to="/signin">Se connecter</Link>
            </p>
          </div>
        </div>

      </div>
  );
}

export default SignUp;