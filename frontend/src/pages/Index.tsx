import React from "react";
import { useNavigate } from "react-router-dom";

const Index: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="text-center bg-white p-10 rounded-xl shadow-2xl max-w-lg w-full">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4 drop-shadow">Bienvenido</h1>
        <p className="mb-8 text-gray-600 text-lg">Accede a la plataforma de ciberseguridad para continuar.</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

export default Index;
