import React from 'react';
import { Link } from "react-router-dom";
import logo from "../../assets/1f21ebc6-cb2f-4a06-b250-a41fef57f12d.png"

function Home() {
  return (
    <div className="min-h-screen bg-gray-600">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-5 py-1 bg-gray-800 shadow-md">
        <img src={logo} alt="WorkSight" className="w-80 h-50" />
        
        <div className="space-x-4">
          <Link to="/signin">
            <button className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition">
              Sign In
            </button>
          </Link>

          <Link to="/signup">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gray-700 flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20">
        
        {/* Texte */}
        <div className="md:w-1/2">
          <h2 className="text-5xl font-bold text-white leading-tight">
            Gérez vos équipes à distance avec <span className="text-indigo-600">WorkSight</span>
          </h2>

          <p className="mt-6 text-lg text-gray-200 leading-relaxed">
            Une plateforme centralisée permettant aux managers de superviser les employés,
            assigner des tâches, suivre l’activité et analyser la productivité en temps réel.
          </p>

          <div className="mt-8 flex space-x-4">
            <Link to="/signup">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg hover:bg-indigo-700 transition">
                Commencer
              </button>
            </Link>

            <Link to="/signin">
              <button className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg text-lg hover:bg-indigo-100 transition">
                Se connecter
              </button>
            </Link>
          </div>
        </div>

        {/* Image / Illustration */}
        <div className="flex items-center space-x-3">
  <img
    src={logo}
    alt="WorkSight Logo"
    className="w-80 h-80 object-contain"
  />
</div>
      </section>

      {/* Features */}
      <section className="px-10 md:px-20 py-16 bg-gray-800">
        <h3 className="text-3xl font-bold text-center text-gray-100 mb-12">
          Fonctionnalités principales
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-500 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-indigo-800 mb-3">Gestion des employés</h4>
            <p className="text-white">
              Ajoutez, modifiez et gérez vos employés facilement depuis un tableau de bord centralisé.
            </p>
          </div>

          <div className="p-6 bg-gray-500 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-indigo-800 mb-3">Suivi des tâches</h4>
            <p className="text-white">
              Créez des tâches, assignez-les aux employés et suivez leur avancement en temps réel.
            </p>
          </div>

          <div className="p-6 bg-gray-500 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-indigo-800 mb-3">Analyse de productivité</h4>
            <p className="text-white">
              Visualisez les performances des employés grâce à des statistiques et des rapports détaillés.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-gray-700 text-gray-100">
        © 2026 WorkSight - Tous droits réservés
      </footer>
    </div>
  );
}

export default Home;