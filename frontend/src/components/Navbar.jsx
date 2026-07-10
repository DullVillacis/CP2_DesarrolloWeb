import { Link, useNavigate } from "react-router-dom";
import { Leaf, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <Leaf size={22} />
        <span>FoodRescue</span>
      </Link>

      <div className="navbar-links">
        {usuario ? (
          <>
            {usuario.rol === "consumidor" && (
              <>
                <Link to="/ofertas">Ofertas</Link>
                <Link to="/mis-reservas">Mis reservas</Link>
              </>
            )}
            {usuario.rol === "local" && <Link to="/mis-ofertas">Mis ofertas</Link>}
            <Link to="/dashboard">Panel</Link>
            <span className="navbar-user">
              Hola, {usuario.nombre.split(" ")[0]}
            </span>
            <button onClick={cerrarSesion} className="btn btn-ghost">
              <LogOut size={16} /> Salir
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Ingresar</Link>
            <Link to="/register" className="btn btn-primary">
              Crear cuenta
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
