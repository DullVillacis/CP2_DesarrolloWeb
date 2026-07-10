import { useState, useEffect } from "react";
import { ShoppingBasket } from "lucide-react";
import Navbar from "../components/Navbar";
import OfferCard from "../components/OfferCard";
import Select from "../components/Select";
import Input from "../components/Input";
import Button from "../components/Button";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { CATEGORIAS } from "../utils/constantes";
import { listarOfertas } from "../services/offerService";
import { crearReserva } from "../services/reservationService";

const opcionesCategoria = [
  { valor: "", etiqueta: "Todas las categorías" },
  ...CATEGORIAS,
];

const Offers = () => {
  const [ofertas, setOfertas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtros, setFiltros] = useState({ categoria: "", precioMax: "" });
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const cargar = async () => {
    setCargando(true);
    try {
      const params = { estado: "disponible" };
      if (filtros.categoria) params.categoria = filtros.categoria;
      if (filtros.precioMax) params.precioMax = filtros.precioMax;
      const { data } = await listarOfertas(params);
      setOfertas(data);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const cambiarFiltro = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const aplicarFiltros = (e) => {
    e.preventDefault();
    cargar();
  };

  const reservar = async (oferta) => {
    setError("");
    setMensaje("");
    try {
      const { data } = await crearReserva({ oferta: oferta._id, cantidad: 1 });
      setMensaje(
        `Reservaste "${oferta.titulo}". Tu código de retiro es ${data.codigoRetiro}.`
      );
      cargar();
    } catch (err) {
      setError(err.response?.data?.mensaje || "No se pudo reservar la oferta");
    }
  };

  return (
    <>
      <Navbar />
      <div className="contenedor">
        <h1 className="pagina-titulo">Ofertas disponibles</h1>
        <p className="pagina-sub">
          Rescata comida rica antes de que se desperdicie.
        </p>

        {mensaje && <div className="alerta alerta-exito">{mensaje}</div>}
        {error && <div className="alerta alerta-error">{error}</div>}

        <form className="filtros" onSubmit={aplicarFiltros}>
          <Select
            label="Categoría"
            name="categoria"
            opciones={opcionesCategoria}
            value={filtros.categoria}
            onChange={cambiarFiltro}
          />
          <Input
            label="Precio máximo"
            name="precioMax"
            type="number"
            min="0"
            placeholder="Sin límite"
            value={filtros.precioMax}
            onChange={cambiarFiltro}
          />
          <Button type="submit" variant="primary">
            Filtrar
          </Button>
        </form>

        {cargando ? (
          <Loader texto="Cargando ofertas..." />
        ) : ofertas.length === 0 ? (
          <EmptyState
            icono={<ShoppingBasket size={40} />}
            titulo="No hay ofertas"
            texto="Prueba cambiando los filtros o vuelve más tarde."
          />
        ) : (
          <div className="ofertas-grid">
            {ofertas.map((oferta) => (
              <OfferCard
                key={oferta._id}
                oferta={oferta}
                acciones={
                  <Button
                    variant="primary"
                    className="btn-block"
                    onClick={() => reservar(oferta)}
                  >
                    Reservar
                  </Button>
                }
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Offers;
