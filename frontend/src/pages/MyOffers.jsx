import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Package, Pencil, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import OfferCard from "../components/OfferCard";
import Button from "../components/Button";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { listarMisOfertas, eliminarOferta } from "../services/offerService";

const MyOffers = () => {
  const navigate = useNavigate();
  const [ofertas, setOfertas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargar = async () => {
    setCargando(true);
    try {
      const { data } = await listarMisOfertas();
      setOfertas(data);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const eliminar = async (oferta) => {
    if (!window.confirm(`¿Eliminar la oferta "${oferta.titulo}"?`)) return;
    await eliminarOferta(oferta._id);
    cargar();
  };

  return (
    <>
      <Navbar />
      <div className="contenedor">
        <div className="pagina-cabecera">
          <div>
            <h1 className="pagina-titulo">Mis ofertas</h1>
            <p className="pagina-sub">Administra tus packs de comida.</p>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate("/mis-ofertas/nueva")}
          >
            <Plus size={18} /> Nueva oferta
          </Button>
        </div>

        {cargando ? (
          <Loader texto="Cargando tus ofertas..." />
        ) : ofertas.length === 0 ? (
          <EmptyState
            icono={<Package size={40} />}
            titulo="No tienes ofertas"
            texto="Crea tu primera oferta para empezar a rescatar comida."
          />
        ) : (
          <div className="ofertas-grid">
            {ofertas.map((oferta) => (
              <OfferCard
                key={oferta._id}
                oferta={oferta}
                acciones={
                  <>
                    <Button
                      variant="outline"
                      onClick={() =>
                        navigate(`/mis-ofertas/${oferta._id}/editar`)
                      }
                    >
                      <Pencil size={16} /> Editar
                    </Button>
                    <Button variant="ghost" onClick={() => eliminar(oferta)}>
                      <Trash2 size={16} /> Eliminar
                    </Button>
                  </>
                }
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyOffers;
