import { useState, useEffect } from "react";
import { Ticket } from "lucide-react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import {
  etiquetaCategoria,
  ETIQUETA_ESTADO,
  OPCIONES_ESTADO_RESERVA,
} from "../utils/constantes";
import { formatoPrecio } from "../utils/formato";
import {
  listarMisReservas,
  cancelarReserva,
} from "../services/reservationService";
import { useReservas } from "../context/ReservasContext";

const MyReservations = () => {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const { refrescar } = useReservas();

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
    refrescar();
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
                    {reserva.oferta && (
                      <span className="badge">
                        {etiquetaCategoria(reserva.oferta.categoria)}
                      </span>
                    )}
                    <h3>
                      {reserva.oferta
                        ? reserva.oferta.titulo
                        : "Oferta eliminada"}
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
                        variant="danger"
                        onClick={() => cancelar(reserva._id)}
                      >
                        Cancelar
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

export default MyReservations;
