import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-5 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-600">RemotePulse</h1>
        
        <div className="space-x-4">
          <Link to="/signin">
            <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition">
              Sign In
            </button>
          </Link>

          <Link to="/signup">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20">
        
        {/* Texte */}
        <div className="md:w-1/2">
          <h2 className="text-5xl font-bold text-gray-800 leading-tight">
            Gérez vos équipes à distance avec <span className="text-blue-600">RemotePulse</span>
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Une plateforme centralisée permettant aux managers de superviser les employés,
            assigner des tâches, suivre l’activité et analyser la productivité en temps réel.
          </p>

          <div className="mt-8 flex space-x-4">
            <Link to="/signup">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition">
                Commencer
              </button>
            </Link>

            <Link to="/signin">
              <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg text-lg hover:bg-blue-50 transition">
                Se connecter
              </button>
            </Link>
          </div>
        </div>

        {/* Image / Illustration */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="https://illustrations.popsy.co/blue/team-work.svg"
            alt="Remote Work"
            className="w-full max-w-lg"
          />
        </div>
      </section>

      {/* Features */}
      <section className="px-10 md:px-20 py-16 bg-white">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Fonctionnalités principales
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-blue-600 mb-3">Gestion des employés</h4>
            <p className="text-gray-600">
              Ajoutez, modifiez et gérez vos employés facilement depuis un tableau de bord centralisé.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-blue-600 mb-3">Suivi des tâches</h4>
            <p className="text-gray-600">
              Créez des tâches, assignez-les aux employés et suivez leur avancement en temps réel.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-blue-600 mb-3">Analyse de productivité</h4>
            <p className="text-gray-600">
              Visualisez les performances des employés grâce à des statistiques et des rapports détaillés.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-gray-100 text-gray-500">
        © 2026 RemotePulse - Tous droits réservés
      </footer>
    </div>
  );
}

export default Home;