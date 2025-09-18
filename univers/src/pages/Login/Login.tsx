import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface LoginProps {
  onLogin: (token: string) => void;
  goSignin: () => void; // vers register
}

const API_URL = "http://localhost:8000/login"; // racine du backend (à adapter si besoin)

const Login: React.FC<LoginProps> = ({ onLogin, goSignin }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // empêche le rechargement de la page par défaut du formulaire
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        API_URL,
        { email, password }, // Send as JSON object
        { headers: { "Content-Type": "application/json" } }
      );

      const token: string = response.data.access_token; // extrait le token du JSON de réponse
      onLogin(token); // transmet le token au parent (App) pour l'enregistrer

      console.log(response.data);
      console.log(token);
    } catch (err) {
      // attrape les erreurs (mauvais identifiants, 400/401, etc.)
      setError("Identifiants incorrects ou serveur indisponible.");
      console.log(err);
    } finally {
      setLoading(false); // désactive l'état de chargement dans tous les cas
    }
  };

  return (
    <div className="justify-center items-center flex p-20">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Se connecter</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {" "}
          {/* formulaire avec gestion du submit */}
          <input
            type="text"
            placeholder="Email"
            value={email} // relie la valeur au state "username" (champ contrôlé)
            onChange={(e) => setEmail(e.target.value)} // met à jour le state à chaque frappe
            className="border rounded-lg p-2  outline-0"
          />
          <input
            type="text"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg p-2 outline-0"
          />
          <button
            type="submit"
            disabled={loading} // désactive le bouton pendant le chargement
            className="bg-yellow-600 text-white rounded-lg p-2 hover:bg-yellow-700 disabled:opacity-50"
          >
            {loading ? "connection..." : "se connecter"}
          </button>
        </form>
        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
        <p className="text-sm text-center mt-4">
          Pas de compte?{" "}
          <Link to="/Signin">
            <span
              onClick={goSignin}
              className="text-yellow-600 hover:underline"
            >
              S'inscrire
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
