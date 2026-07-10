import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, ShoppingBag, Store } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import Input from "../components/Input";
import Button from "../components/Button";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { values, handleChange, setValues } = useForm({
    nombre: "",
    email: "",
    password: "",
    rol: "consumidor",
    nombreNegocio: "",
    direccion: "",
    telefono: "",
  });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const elegirRol = (rol) => setValues((prev) => ({ ...prev, rol }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      await register(values);
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err.response?.data?.errores?.[0] ||
        err.response?.data?.mensaje ||
        "No se pudo crear la cuenta";
      setError(msg);
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
        <h2>Crea tu cuenta</h2>
        <p className="auth-sub">Únete y empieza a rescatar comida</p>

        <div className="rol-selector">
          <button
            type="button"
            className={`rol-opcion ${values.rol === "consumidor" ? "activa" : ""}`}
            onClick={() => elegirRol("consumidor")}
          >
            <span className="rol-icono">
              <ShoppingBag size={24} />
            </span>
            <span className="rol-nombre">Soy consumidor</span>
            <span className="rol-desc">Quiero comprar comida</span>
          </button>
          <button
            type="button"
            className={`rol-opcion ${values.rol === "local" ? "activa" : ""}`}
            onClick={() => elegirRol("local")}
          >
            <span className="rol-icono">
              <Store size={24} />
            </span>
            <span className="rol-nombre">Soy un local</span>
            <span className="rol-desc">Quiero vender excedentes</span>
          </button>
        </div>

        {error && <div className="alerta alerta-error">{error}</div>}

        <form onSubmit={onSubmit}>
          <Input
            label="Nombre"
            name="nombre"
            value={values.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            required
          />
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
            placeholder="Mínimo 6 caracteres"
            required
          />

          {values.rol === "local" && (
            <>
              <Input
                label="Nombre del negocio"
                name="nombreNegocio"
                value={values.nombreNegocio}
                onChange={handleChange}
                placeholder="Ej: Panadería El Trigo"
              />
              <Input
                label="Dirección"
                name="direccion"
                value={values.direccion}
                onChange={handleChange}
                placeholder="Dirección del local"
              />
              <Input
                label="Teléfono"
                name="telefono"
                value={values.telefono}
                onChange={handleChange}
                placeholder="09..."
              />
            </>
          )}

          <Button
            type="submit"
            variant="primary"
            className="btn-block"
            disabled={cargando}
          >
            {cargando ? "Creando cuenta..." : "Crear cuenta"}
          </Button>
        </form>

        <p className="auth-pie">
          ¿Ya tienes cuenta? <Link to="/login">Ingresa aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
