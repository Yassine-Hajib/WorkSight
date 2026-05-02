import React from 'react';
import { Link } from "react-router-dom";
import logo from "../../assets/1f21ebc6-cb2f-4a06-b250-a41fef57f12d.png";
import "./Home.css";

/* ─── Mock dashboard data ─── */
const mockEmployees = [
    { name: "Sophie Martin",  role: "Dev Frontend", status: "Actif",    statusCls: "pill-green", avatar: "https://i.pravatar.cc/30?img=47" },
    { name: "Karim Belkacem", role: "Chef de projet", status: "En réunion", statusCls: "pill-blue", avatar: "https://i.pravatar.cc/30?img=12" },
    { name: "Léa Dubois",     role: "UX Designer",  status: "En tâche",  statusCls: "pill-amber", avatar: "https://i.pravatar.cc/30?img=32" },
];

const features = [
    {
        icon: "👥", iconCls: "icon-indigo",
        title: "Gestion des employés",
        desc: "Ajoutez, modifiez et gérez vos collaborateurs depuis un tableau de bord centralisé. Profils complets, rôles et accès configurables.",
    },
    {
        icon: "✅", iconCls: "icon-teal",
        title: "Suivi des tâches",
        desc: "Créez des tâches, assignez-les, définissez des priorités et suivez l'avancement en temps réel avec des vues Kanban et liste.",
    },
    {
        icon: "📊", iconCls: "icon-pink",
        title: "Analyse de productivité",
        desc: "Visualisez les performances avec des graphiques détaillés, comparez les KPIs et générez des rapports exportables.",
    },
    {
        icon: "💬", iconCls: "icon-sky",
        title: "Messagerie intégrée",
        desc: "Communiquez directement avec vos équipes via le chat intégré, sans quitter la plateforme. Discussions privées et canaux d'équipe.",
    },
    {
        icon: "🔔", iconCls: "icon-amber",
        title: "Notifications en temps réel",
        desc: "Recevez des alertes instantanées sur les mises à jour de tâches, les délais imminents et l'activité de vos équipes.",
    },
    {
        icon: "🔒", iconCls: "icon-green",
        title: "Sécurité & Rôles",
        desc: "Contrôlez les accès avec des rôles personnalisés (Admin, Manager, Employé) et chiffrement des données de bout en bout.",
    },
];

const steps = [
    {
        num: "01",
        title: "Créez votre organisation",
        desc: "Inscrivez-vous en quelques secondes, configurez votre espace de travail et invitez vos équipes par e-mail.",
    },
    {
        num: "02",
        title: "Ajoutez vos collaborateurs",
        desc: "Importez vos employés manuellement ou via CSV. Définissez leurs rôles, départements et niveaux d'accès.",
    },
    {
        num: "03",
        title: "Assignez & suivez les tâches",
        desc: "Créez des projets, décomposez-les en tâches, assignez-les et suivez l'avancement en temps réel.",
    },
    {
        num: "04",
        title: "Analysez & optimisez",
        desc: "Consultez les tableaux de bord de performance, identifiez les goulets d'étranglement et prenez des décisions éclairées.",
    },
];

function Home() {
    return (
        <div style={{ background: 'var(--bg-deep)', minHeight: '100vh' }}>

            {/* ─── NAVBAR ─── */}
            <nav className="ws-nav">
                <div className="ws-logo">
                    <img src={logo} alt="WorkSight" />
                </div>
                <div className="ws-nav-links">
                    <Link to="/signin" className="btn-outline">Se connecter</Link>
                    <Link to="/signup" className="btn-primary">Commencer gratuitement</Link>
                </div>
            </nav>

            {/* ─── HERO ─── */}
            <section className="ws-hero">
                <div className="ws-grid-bg" />

                {/* Text side */}
                <div className="ws-hero-content">
                    <div className="ws-badge">
                        <span className="ws-badge-dot" />
                        Disponible maintenant
                    </div>

                    <h1>
                        Superviser vos équipes avec{" "}
                        <span className="highlight">WorkSight</span>
                    </h1>

                    <p>
                        La plateforme tout-en-un pour les managers qui supervisent des équipes
                        à distance : gestion des employés, suivi des tâches, messagerie et analyse
                        de productivité en temps réel.
                    </p>

                    <div className="ws-hero-cta">
                        <Link to="/signup" className="btn-hero-primary">
                            Démarrer gratuitement →
                        </Link>
                        <Link to="/signin" className="btn-hero-outline">
                            Se connecter
                        </Link>
                    </div>

                    <div className="ws-hero-stats">
                        <div className="ws-stat-item">
                            <span className="ws-stat-value">2 400+</span>
                            <span className="ws-stat-label">Équipes actives</span>
                        </div>
                        <div className="ws-stat-item">
                            <span className="ws-stat-value">98%</span>
                            <span className="ws-stat-label">Satisfaction client</span>
                        </div>
                        <div className="ws-stat-item">
                            <span className="ws-stat-value">99.9%</span>
                            <span className="ws-stat-label">Disponibilité</span>
                        </div>
                    </div>
                </div>

                {/* Visual / mock dashboard */}
                <div className="ws-hero-visual">
                    <div className="ws-orb ws-orb-1" />
                    <div className="ws-orb ws-orb-2" />

                    <div className="ws-dashboard-mock">
                        {/* Window chrome */}
                        <div className="ws-mock-header">
                            <div className="ws-mock-dot" style={{ background: '#ff5f57' }} />
                            <div className="ws-mock-dot" style={{ background: '#febc2e' }} />
                            <div className="ws-mock-dot" style={{ background: '#28c840' }} />
                            <div className="ws-mock-bar" />
                        </div>

                        {/* Employee rows */}
                        {mockEmployees.map((e, i) => (
                            <div className="ws-mock-row" key={i}>
                                <img src={e.avatar} alt={e.name} className="ws-mock-avatar" />
                                <div className="ws-mock-info">
                                    <div className="ws-mock-name">{e.name}</div>
                                    <div className="ws-mock-role">{e.role}</div>
                                </div>
                                <span className={`ws-mock-pill ${e.statusCls}`}>{e.status}</span>
                            </div>
                        ))}

                        {/* Progress bar */}
                        <div className="ws-mock-progress-block">
                            <div className="ws-mock-prog-label">
                                <span>Sprint Q2 — Avancement</span>
                                <span>74%</span>
                            </div>
                            <div className="ws-mock-prog-bar">
                                <div className="ws-mock-prog-fill" style={{ width: '74%' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── FEATURES ─── */}
            <section className="ws-features">
                <p className="ws-section-label">Fonctionnalités</p>
                <h3 className="ws-section-title">Tout ce dont vous avez besoin</h3>
                <p className="ws-section-sub">
                    WorkSight centralise la gestion de vos équipes distantes dans une interface
                    claire et puissante, conçue pour les managers modernes.
                </p>

                <div className="ws-features-grid">
                    {features.map((f, i) => (
                        <div className="ws-feature-card" key={i}>
                            <div className={`ws-feature-icon ${f.iconCls}`}>{f.icon}</div>
                            <h4>{f.title}</h4>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── HOW IT WORKS ─── */}
            <section className="ws-how">
                <p className="ws-section-label">Comment ça marche</p>
                <h3 className="ws-section-title">Opérationnel en 10 minutes</h3>
                <p className="ws-section-sub">
                    Pas de configuration complexe. Suivez ces quatre étapes pour commencer
                    à superviser vos équipes efficacement.
                </p>

                <div className="ws-steps">
                    {steps.map((s, i) => (
                        <div className="ws-step" key={i}>
                            <div className="ws-step-num">{s.num}</div>
                            <div className="ws-step-body">
                                <h4>{s.title}</h4>
                                <p>{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── CTA BANNER ─── */}
            <div className="ws-cta">
                <h2>Prêt à transformer la gestion de vos équipes ?</h2>
                <p>Rejoignez plus de 2 400 équipes qui font confiance à WorkSight. Aucune carte bancaire requise.</p>
                <Link to="/signup" className="btn-hero-primary">
                    Commencer gratuitement →
                </Link>
            </div>

            {/* ─── FOOTER ─── */}
            <footer className="ws-footer">
                <div className="ws-footer-grid">
                    <div className="ws-footer-brand">
                        <img src={logo} alt="WorkSight" />
                        <p>
                            WorkSight aide les managers à superviser, coordonner et analyser leurs
                            équipes distantes depuis une plateforme centralisée et intuitive.
                        </p>
                    </div>

                    <div className="ws-footer-col">
                        <h5>Produit</h5>
                        <ul>
                            <li><a href="#">Fonctionnalités</a></li>
                            <li><a href="#">Tarifs</a></li>
                            <li><a href="#">Sécurité</a></li>
                            <li><a href="#">Mises à jour</a></li>
                        </ul>
                    </div>

                    <div className="ws-footer-col">
                        <h5>Entreprise</h5>
                        <ul>
                            <li><a href="#">À propos</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Confidentialité</a></li>
                        </ul>
                    </div>
                </div>

                <div className="ws-footer-bottom">
                    © 2026 WorkSight — Tous droits réservés
                </div>
            </footer>

        </div>
    );
}

export default Home;