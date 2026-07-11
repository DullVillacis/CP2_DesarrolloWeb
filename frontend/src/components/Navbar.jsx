import { Link, useNavigate } from "react-router-dom";
import { Leaf, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import SideNav from "./SideNav";

const Navbar = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <Leaf size={22} />
          <span>FoodRescue</span>
        </Link>

        <div className="navbar-links">
          {usuario ? (
            <button onClick={cerrarSesion} className="btn-salir">
              <LogOut size={16} />
              <span>Salir</span>
            </button>
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
      <SideNav />
    </>
  );
};

export default Navbar;
