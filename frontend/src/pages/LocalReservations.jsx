import { useState, useEffect } from "react";
import { Ticket } from "lucide-react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import { ETIQUETA_ESTADO, OPCIONES_ESTADO_RESERVA } from "../utils/constantes";
import { formatoPrecio } from "../utils/formato";
import {
  listarReservasDeMiLocal,
  completarReserva,
} from "../services/reservationService";

const LocalReservations = () => {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [estadoFiltro, setEstadoFiltro] = useState("");

  const reservasFiltradas = estadoFiltro
    ? reservas.filter((r) => r.estado === estadoFiltro)
    : reservas;

  const total = reservasFiltradas.reduce(
    (acc, r) => acc + (r.oferta?.precioDescuento || 0) * r.cantidad,
    0
  );

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
          <div className="reservas-hoja">
            <div className="reservas-hoja-cabecera">
              <Dropdown
                label="Estado"
                opciones={OPCIONES_ESTADO_RESERVA}
                value={estadoFiltro}
                onChange={setEstadoFiltro}
              />
              <div className="reservas-resumen">
                <span>{reservasFiltradas.length} reservas</span>
                <span className="reservas-total">
                  Total <strong>{formatoPrecio(total)}</strong>
                </span>
              </div>
            </div>

            {reservasFiltradas.length === 0 ? (
              <div className="reservas-vacio">
                No hay reservas con ese estado.
              </div>
            ) : (
              reservasFiltradas.map((reserva) => (
                <div key={reserva._id} className="reserva-fila">
                  <div className="reserva-info">
                    <h3>
                      {reserva.oferta
                        ? reserva.oferta.titulo
                        : "Oferta eliminada"}
                    </h3>
                    <p className="reserva-meta">
                      Cliente:{" "}
                      <strong className="reserva-cliente">
                        {reserva.consumidor ? reserva.consumidor.nombre : "-"}
                      </strong>{" "}
                      · Cantidad: {reserva.cantidad}
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
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default LocalReservations;
