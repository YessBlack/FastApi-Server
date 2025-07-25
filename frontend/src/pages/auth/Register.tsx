import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { parseFastApiError } from "../../utils/parseFastApiError";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async () => {
    setMessage("");

    const response = await fetch("http://127.0.0.1:8000/register", {
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
          Registrar Usuario
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
          <Input
            value={password}
            onChange={setPassword}
            type="password"
            id="password"
            name="password"
            autoComplete="new-password"
            required
            label="Contraseña:"
          />
          <Button text="Registrar" onClick={handleSubmit} />
        </div>
        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message === "Usuario registrado exitosamente"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
        <p className="mt-4 text-center text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
