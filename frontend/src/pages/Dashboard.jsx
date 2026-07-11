import { useState, useEffect } from "react";
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
import { listarMisOfertas, listarOfertas } from "../services/offerService";
import {
  listarMisReservas,
  listarReservasDeMiLocal,
} from "../services/reservationService";

const Dashboard = () => {
  const { usuario } = useAuth();
  const esLocal = usuario.rol === "local";
  const [conteos, setConteos] = useState({ a: null, b: null });

  useEffect(() => {
    const cargar = async () => {
      try {
        if (esLocal) {
          const [ofertas, reservas] = await Promise.all([
            listarMisOfertas(),
            listarReservasDeMiLocal(),
          ]);
          setConteos({ a: ofertas.data.length, b: reservas.data.length });
        } else {
          const [ofertas, reservas] = await Promise.all([
            listarOfertas({ estado: "disponible" }),
            listarMisReservas(),
          ]);
          setConteos({ a: ofertas.data.length, b: reservas.data.length });
        }
      } catch {
        setConteos({ a: 0, b: 0 });
      }
    };
    cargar();
  }, [esLocal]);

  const cards = esLocal
    ? [
        {
          to: "/mis-ofertas",
          icono: Package,
          titulo: "Mis ofertas",
          texto: "Crea, edita y administra tus packs de comida.",
          conteo: conteos.a,
          etiqueta: "publicadas",
        },
        {
          to: "/reservas-local",
          icono: Ticket,
          titulo: "Reservas recibidas",
          texto: "Revisa quién reservó tus ofertas.",
          conteo: conteos.b,
          etiqueta: "recibidas",
          coral: true,
        },
      ]
    : [
        {
          to: "/ofertas",
          icono: UtensilsCrossed,
          titulo: "Ver ofertas",
          texto: "Explora y filtra los packs disponibles.",
          conteo: conteos.a,
          etiqueta: "disponibles",
        },
        {
          to: "/mis-reservas",
          icono: Ticket,
          titulo: "Mis reservas",
          texto: "Consulta tus rescates y códigos de retiro.",
          conteo: conteos.b,
          etiqueta: "reservas",
          coral: true,
        },
      ];

  return (
    <>
      <Navbar />
      <div className="contenedor dashboard-pagina">
        <div className="dashboard-cabecera">
          <span className={`chip chip-${esLocal ? "coral" : "verde"}`}>
            {esLocal ? <Store size={15} /> : <ShoppingBag size={15} />}
            {esLocal ? "Local" : "Consumidor"}
          </span>
          <h1>¡Hola de nuevo, {usuario.nombre.split(" ")[0]}!</h1>
          <p className="dashboard-sub">
            {esLocal
              ? "Gestiona tus ofertas y ayuda a reducir el desperdicio de comida."
              : "Descubre ofertas cerca de ti y rescata comida deliciosa."}
          </p>
        </div>

        <div className="acciones-grid">
          {cards.map(({ to, icono: Icono, titulo, texto, conteo, etiqueta, coral }) => (
            <Link
              key={to}
              to={to}
              className={`accion-card ${coral ? "accion-card--coral" : ""}`}
            >
              <Icono className="accion-card-bg" size={140} strokeWidth={1.5} />
              <span className="accion-card-conteo">
                {conteo === null ? "—" : conteo}
                <small>{etiqueta}</small>
              </span>
              <h3>{titulo}</h3>
              <p>{texto}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
