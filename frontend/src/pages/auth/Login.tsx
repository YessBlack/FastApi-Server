import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { parseFastApiError } from "../../utils/parseFastApiError";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async () => {
    setMessage("");
    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(parseFastApiError(data.detail));
      return;
    }

    setMessage(data.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Iniciar Sesión
        </h1>
        <div className="space-y-6">
          <Input
            value={email}
            onChange={setEmail}
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
            label="Email:"
          />
          <div>
            <Input
              value={password}
              onChange={setPassword}
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              required
              label="Contraseña:"
            />
          </div>
          <Button text="Iniciar Sesión" onClick={handleSubmit} />
        </div>
        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message === "Login exitoso" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
        <p className="mt-4 text-center text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
