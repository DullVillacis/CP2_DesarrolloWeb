import { useState, useEffect } from "react";
import { Ticket } from "lucide-react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import { ETIQUETA_ESTADO } from "../utils/constantes";
import {
  listarReservasDeMiLocal,
  completarReserva,
} from "../services/reservationService";

const LocalReservations = () => {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargar = async () => {
    setCargando(true);
    try {
      const { data } = await listarReservasDeMiLocal();
      setReservas(data);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const completar = async (id) => {
    await completarReserva(id);
    cargar();
  };

  if (cargando) {
    return (
      <>
        <Navbar />
        <Loader texto="Cargando reservas..." />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="contenedor">
        <h1 className="pagina-titulo">Reservas recibidas</h1>
        <p className="pagina-sub">Reservas hechas sobre tus ofertas.</p>

        {reservas.length === 0 ? (
          <EmptyState
            icono={<Ticket size={40} />}
            titulo="Sin reservas todavía"
            texto="Cuando alguien reserve tus ofertas aparecerán aquí."
          />
        ) : (
          <div className="reservas-lista">
            {reservas.map((reserva) => (
              <div key={reserva._id} className="reserva-card">
                <div className="reserva-info">
                  <h3>
                    {reserva.oferta ? reserva.oferta.titulo : "Oferta eliminada"}
                  </h3>
                  <p className="reserva-meta">
                    Cliente:{" "}
                    {reserva.consumidor ? reserva.consumidor.nombre : "-"} ·
                    Cantidad: {reserva.cantidad}
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
                      variant="primary"
                      onClick={() => completar(reserva._id)}
                    >
                      Marcar entregada
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

export default LocalReservations;
