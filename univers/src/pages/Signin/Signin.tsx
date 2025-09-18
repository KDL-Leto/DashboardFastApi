import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface RegisterProps {
  goLogin: () => void; // retour vers Login
}

const API_URL = "http://localhost:8000/register";

const Signin: React.FC<RegisterProps> = ({ goLogin }) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // état pour afficher succès/erreur
  const [loading, setLoading] = useState(false); // état de chargement du bouton
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        API_URL,
        { userName, email, password },
        { headers: { content_type: "application.json" } }
      );

      localStorage.setItem("access_token", res.data.access_token);
      navigate("/Login");
      console.log(res.data);

      setMessage("✅ Inscription réussie ! Vous pouvez vous connecter");
    } catch (err) {
      setMessage("❌ Erreur lors de l'inscription.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="justify-center items-center flex p-20">
      <div className="w-[30rem]  bg-white rounded-2xl shadow-lg p-6 ">
        <h1 className="text-2xl font-bold text-center mb-6">Creer un compte</h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded-lg p-2  outline-0"
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg p-2  outline-0"
          />
          <input
            type="text"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg p-2  outline-0"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-600 text-white rounded-lg p-2 hover:bg-yellow-700 "
          >
            {loading ? "Création..." : "S'inscrire"}
          </button>
        </form>
        {message && <p className="text-center text-sm mt-3">{message}</p>}
        <p className="text-sm text-center mt-4">
          {" "}
          {/* lien retour vers la connexion */}
          Déjà un compte ?{" "}
          <Link to="/Login">
            <span onClick={goLogin} className="text-yellow-600 hover:underline">
              Se connecter
            </span>
          </Link>
          {/* bouton retour */}
        </p>
      </div>
    </div>
  );
};

export default Signin;
