import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface DashboardProps {
  token: string | null; // Token JWT pour l'authentification des routes protégées
  onLogout: () => void; // Fonction callback pour la déconnexion
}

// URL de l'API dashboard - à adapter selon votre backend
const API_URL = "http://localhost:8000/dashboard";

const Dashboard: React.FC<DashboardProps> = ({ token, onLogout }) => {
  // États pour gérer les données et le statut
  const [message, setMessage] = useState("Chargement..."); // Message principal
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState<string | null>(null); // Gestion des erreurs
  const [dashboardData, setDashboardData] = useState<any>(null); // Données du dashboard

  useEffect(() => {
    // Fonction asynchrone pour récupérer les données protégées
    const fetchSecureData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Vérification que le token existe
        if (!token) {
          setMessage("Aucun token disponible. Veuillez vous reconnecter.");
          setLoading(false);
          return;
        }

        // Appel API avec le token dans les headers
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          timeout: 5000, // Timeout de 5 secondes
        });

        // Si la réponse est réussie (status 200-299)
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data)
          setDashboardData(response.data);
          setMessage("Données chargées avec succès !");
        } else {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
      } catch (err: any) {
        // Gestion détaillée des erreurs
        if (err.response?.status === 401) {
          setMessage("Token invalide ou expiré. Veuillez vous reconnecter.");
          setError("Erreur d'authentification");

          // Déconnexion automatique en cas de token invalide
          setTimeout(onLogout, 3000);
        } else if (err.response?.status === 403) {
          setMessage("Accès refusé. Permissions insuffisantes.");
          setError("Erreur d'autorisation");
        } else if (err.code === "ECONNABORTED") {
          setMessage("Timeout de la requête. Vérifiez votre connexion.");
          setError("Timeout");
        } else if (err.response?.data?.detail) {
          setMessage(err.response.data.detail);
          setError("Erreur serveur");
        } else {
          setMessage("Erreur de connexion au serveur. Veuillez réessayer.");
          setError("Erreur réseau");
        }
      } finally {
        setLoading(false);
      }
    };

    // Appel de la fonction seulement si un token est présent
    if (token) {
      fetchSecureData();
    } else {
      setMessage("Aucun token disponible. Veuillez vous reconnecter.");
      setLoading(false);
    }
  }, [token, onLogout]); // Dépendances : token et onLogout

  // Fonction pour rafraîchir les données manuellement

  const handleRefresh = () => {
    setMessage("Rechargement...");
    setLoading(true);

    const fetchSecureData = async () => {

      try {
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDashboardData(response.data);
        setMessage("Données rafraîchies avec succès !");
      } catch (err) {
        setMessage("Erreur lors du rafraîchissement");
      } finally {
        setLoading(false);
      }
    };

    fetchSecureData();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* En-tête du dashboard */}

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Tableau de Bord
            </h1>

            <div className="flex items-center gap-4">
              {/* Bouton de rafraîchissement */}
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "⏳" : "🔄"} Rafraîchir
              </button>

              {/* Bouton de déconnexion */}
              <button
                onClick={onLogout}
                className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                🚪 Déconnexion
              </button>
            </div>
          </div>

          {/* Message de statut */}
          <div
            className={`p-4 rounded-lg mb-6 ${
              error
                ? "bg-red-100 border border-red-400 text-red-700"
                : loading
                ? "bg-blue-100 border border-blue-400 text-blue-700"
                : "bg-green-100 border border-green-400 text-green-700"
            }`}
          >
            <p className="font-medium">{message}</p>
            {error && <p className="text-sm mt-1">Erreur: {error}</p>}
          </div>

          {/* Indicateur de chargement */}
          {loading && (
            <div className="flex justify-center my-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>

        {/* Grille de cartes de données */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Carte 1 - Données utilisateur */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">👤</span>
              </div>
              <h2 className="font-semibold text-lg text-gray-900">
                Profil Utilisateur
              </h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Informations sur votre compte et préférences.
            </p>
            {dashboardData?.user && (
              <div className="text-xs text-gray-500">
                <p>Email: {dashboardData.user.email}</p>
                {/* user */}
                <p>
                  Username: {dashboardData.user.userName }
                </p>
                <p>
                  Status: {dashboardData.user.is_active ? "Actif" : "Inactif"}
                </p>
                
              </div>
            )}
          </div>

          {/* Carte 2 - Statistiques */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
              <h2 className="font-semibold text-lg text-gray-900">
                Statistiques
              </h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Données et métriques importantes.
            </p>
            {dashboardData?.stats ? (
              <div className="space-y-2">
                <p className="text-sm">Total: {dashboardData.stats.total}</p>
                <p className="text-sm">Messages: {dashboardData.stats.messages}</p>
                <p className="text-sm">
                  Complétés: {dashboardData.stats.completed}
                </p>
              </div>
            ) : (
              <p className="text-xs text-gray-400">Chargement des stats...</p>
            )}
          </div>

          {/* Carte 3 - Activité récente */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-2xl">📋</span>
              </div>
              <h2 className="font-semibold text-lg text-gray-900">
                Activité Récente
              </h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Dernières actions et événements.
            </p>
            {dashboardData?.activities ? (
              <ul className="text-xs text-gray-500 space-y-1">
                {dashboardData.activities
                  .slice(0, 3)
                  .map((activity: any, index: number) => (
                    <li key={index}>• {activity.action}</li>
                  ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-400">Aucune activité récente</p>
            )}
          </div>

          {/* Carte 4 - Actions rapides */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <span className="text-2xl">⚡</span>
              </div>
              <h2 className="font-semibold text-lg text-gray-900">
                Actions Rapides
              </h2>
            </div>
            <div className="space-y-2">
              <Link
                to="/Dashboard"
                className="block w-full text-left px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                ✏️ Modifier le profil
              </Link>
              <Link
                to="/settings"
                className="block w-full text-left px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                ⚙️ Paramètres
              </Link>
              <button
                onClick={handleRefresh}
                className="w-full text-left px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                🔄 Actualiser les données
              </button>
            </div>
          </div>
        </div>

        {/* Section supplémentaire pour les données détaillées */}
        {/* {dashboardData && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Détails des Données
            </h2>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {JSON.stringify(dashboardData, null, 2)}
            </pre>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Dashboard;
