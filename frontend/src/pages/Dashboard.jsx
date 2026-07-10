import { Link } from "react-router-dom";
import {
  Store,
  ShoppingBag,
  Package,
  Ticket,
  UtensilsCrossed,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { usuario } = useAuth();
  const esLocal = usuario.rol === "local";

  return (
    <>
      <Navbar />
      <div className="contenedor">
        <div className="dashboard-cabecera">
          <span className={`chip chip-${esLocal ? "coral" : "verde"}`}>
            {esLocal ? <Store size={15} /> : <ShoppingBag size={15} />}
            {esLocal ? "Local" : "Consumidor"}
          </span>
          <h1>Hola, {usuario.nombre.split(" ")[0]}</h1>
          <p className="dashboard-sub">
            {esLocal
              ? "Gestiona tus ofertas y ayuda a reducir el desperdicio de comida."
              : "Descubre ofertas cerca de ti y rescata comida deliciosa."}
          </p>
        </div>

        <div className="acciones-grid">
          {esLocal ? (
            <>
              <Link to="/mis-ofertas" className="accion-card">
                <span className="icono-circulo">
                  <Package size={26} />
                </span>
                <h3>Mis ofertas</h3>
                <p>Crea, edita y administra tus packs de comida.</p>
              </Link>
              <Link to="/mis-ofertas" className="accion-card">
                <span className="icono-circulo icono-circulo--coral">
                  <Ticket size={26} />
                </span>
                <h3>Reservas recibidas</h3>
                <p>Revisa quién reservó tus ofertas.</p>
              </Link>
            </>
          ) : (
            <>
              <Link to="/ofertas" className="accion-card">
                <span className="icono-circulo">
                  <UtensilsCrossed size={26} />
                </span>
                <h3>Ver ofertas</h3>
                <p>Explora y filtra los packs disponibles.</p>
              </Link>
              <Link to="/mis-reservas" className="accion-card">
                <span className="icono-circulo icono-circulo--coral">
                  <Ticket size={26} />
                </span>
                <h3>Mis reservas</h3>
                <p>Consulta tus rescates y códigos de retiro.</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
