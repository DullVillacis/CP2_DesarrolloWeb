import { useState, useEffect } from "react";
import { Ticket } from "lucide-react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import { etiquetaCategoria, ETIQUETA_ESTADO } from "../utils/constantes";
import { formatoPrecio } from "../utils/formato";
import {
  listarMisReservas,
  cancelarReserva,
} from "../services/reservationService";

const MyReservations = () => {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargar = async () => {
    setCargando(true);
    try {
      const { data } = await listarMisReservas();
      setReservas(data);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const cancelar = async (id) => {
    if (!window.confirm("¿Cancelar esta reserva?")) return;
    await cancelarReserva(id);
    cargar();
  };

  if (cargando) {
    return (
      <>
        <Navbar />
        <Loader texto="Cargando tus reservas..." />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="contenedor">
        <h1 className="pagina-titulo">Mis reservas</h1>
        <p className="pagina-sub">Tus rescates y códigos de retiro.</p>

        {reservas.length === 0 ? (
          <EmptyState
            icono={<Ticket size={40} />}
            titulo="Aún no tienes reservas"
            texto="Explora las ofertas y rescata tu primer pack."
          />
        ) : (
          <div className="reservas-lista">
            {reservas.map((reserva) => (
              <div key={reserva._id} className="reserva-card">
                <div className="reserva-info">
                  {reserva.oferta && (
                    <span className="badge">
                      {etiquetaCategoria(reserva.oferta.categoria)}
                    </span>
                  )}
                  <h3>
                    {reserva.oferta ? reserva.oferta.titulo : "Oferta eliminada"}
                  </h3>
                  {reserva.oferta && reserva.oferta.local && (
                    <p className="reserva-meta">
                      {reserva.oferta.local.nombreNegocio}
                    </p>
                  )}
                  <p className="reserva-meta">
                    Cantidad: {reserva.cantidad}
                    {reserva.oferta &&
                      ` · ${formatoPrecio(reserva.oferta.precioDescuento)}`}
                  </p>
                </div>
                <div className="reserva-lado">
                  <span className={`estado-pill estado-${reserva.estado}`}>
                    {ETIQUETA_ESTADO[reserva.estado]}
                  </span>
                  <div className="reserva-codigo">
                    <span>Código</span>
                    <strong>{reserva.codigoRetiro}</strong>
                  </div>
                  {reserva.estado === "pendiente" && (
                    <Button
                      variant="ghost"
                      onClick={() => cancelar(reserva._id)}
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyReservations;
