import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { values, handleChange } = useForm({ email: "", password: "" });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      await login(values);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.mensaje || "No se pudo iniciar sesión");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-pagina">
      <div className="auth-tarjeta">
        <Link to="/" className="auth-logo">
          <Leaf size={20} /> FoodRescue
        </Link>
        <h2>¡Bienvenido de nuevo!</h2>
        <p className="auth-sub">Ingresa para seguir rescatando</p>

        {error && <div className="alerta alerta-error">{error}</div>}

        <form onSubmit={onSubmit}>
          <Input
            label="Correo"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder="tu@correo.com"
            required
          />
          <Input
            label="Contraseña"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Tu contraseña"
            required
          />
          <Button
            type="submit"
            variant="primary"
            className="btn-block"
            disabled={cargando}
          >
            {cargando ? "Ingresando..." : "Ingresar"}
          </Button>
        </form>

        <p className="auth-pie">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
