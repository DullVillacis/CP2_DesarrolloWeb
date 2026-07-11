import { Link, useLocation } from "react-router-dom";
import {
  UtensilsCrossed,
  Ticket,
  LayoutDashboard,
  Store,
  ClipboardList,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useReservas } from "../context/ReservasContext";

const SideNav = () => {
  const { usuario } = useAuth();
  const { cantidad } = useReservas();
  const { pathname } = useLocation();

  if (!usuario) return null;

  const items =
    usuario.rol === "consumidor"
      ? [
          { to: "/ofertas", label: "Ofertas", icono: UtensilsCrossed },
          {
            to: "/mis-reservas",
            label: "Mis reservas",
            icono: Ticket,
            badge: cantidad,
          },
          { to: "/dashboard", label: "Panel", icono: LayoutDashboard },
        ]
      : [
          { to: "/mis-ofertas", label: "Mis ofertas", icono: Store },
          { to: "/reservas-local", label: "Reservas", icono: ClipboardList },
          { to: "/dashboard", label: "Panel", icono: LayoutDashboard },
        ];

  return (
    <nav className="sidenav" aria-label="Navegación principal">
      {items.map(({ to, label, icono: Icono, badge }) => {
        const activo = pathname === to || pathname.startsWith(`${to}/`);
        return (
          <Link
            key={to}
            to={to}
            className={`sidenav-item ${activo ? "activo" : ""}`}
          >
            <Icono size={22} />
            {badge > 0 && (
              <span className="sidenav-badge">{badge > 99 ? "99+" : badge}</span>
            )}
            <span className="sidenav-tooltip">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default SideNav;
