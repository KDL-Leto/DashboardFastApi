import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./containers/header/navbar";
import {
  HomePage,
  AboutPage,
  ProductPage,
  Login,
  Signin,
} from "./pages/pageImport";
import PyBook from "./pages/PyBook/PyBook";
import type React from "react";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";

const NavItems = [
  {
    title: "Home",
    path: "./",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Products",
    path: "/Products",
  },
  {
    title: "PyBook",
    path: "/PyBook",
  },
  
];

type Page = "Login" | "Signin" | "Dashboard";

const Univers: React.FC = () => {
  const [page, setPage] = useState<Page>("Login");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setPage("Dashboard");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setPage("Login");
  };

  const handleLogin = (newToken: string) => {
    localStorage.setItem("token", newToken); // sauvegarde du token dans le stockage local du navigateur
    setToken(newToken); // mise à jour de l'état local
    setPage("Dashboard"); // navigation vers le dashboard
  };

  return (
    <div className="">
      <BrowserRouter>
        <Navbar items={NavItems} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/Products" element={<ProductPage />} />
          <Route path="/PyBook" element={<PyBook />} />
          
          {/* Routes d'authentification */}
          <Route 
            path="/Login" 
            element={
              token ? (
                <Navigate to="/Dashboard" replace />
              ) : (
                <Login onLogin={handleLogin} goSignin={() => setPage("Signin")} />
              )
            } 
          />
          <Route 
            path="/Signin" 
            element={
              token ? (
                <Navigate to="/Dashboard" replace />
              ) : (
                <Signin goLogin = {() => setPage("Login")}/>
              )
            } 
          />
          <Route 
            path="/Dashboard" 
            element={
              token ? (
                <Dashboard token={token} onLogout={handleLogout} />
              ) : (
                <Navigate to="/Login" replace />
              )
            } 
          />
          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Univers;
