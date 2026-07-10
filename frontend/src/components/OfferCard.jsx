import { Store, Clock } from "lucide-react";
import { etiquetaCategoria } from "../utils/constantes";
import { formatoPrecio } from "../utils/formato";

const OfferCard = ({ oferta, acciones }) => {
  const agotado =
    oferta.estado === "agotado" || oferta.cantidadDisponible === 0;

  return (
    <div className="oferta-card">
      <div className="oferta-card-top">
        <span className="badge">{etiquetaCategoria(oferta.categoria)}</span>
        <span className={`estado ${agotado ? "estado-agotado" : "estado-ok"}`}>
          {agotado ? "Agotado" : `${oferta.cantidadDisponible} disponibles`}
        </span>
      </div>

      <h3 className="oferta-titulo">{oferta.titulo}</h3>
      <p className="oferta-desc">{oferta.descripcion}</p>

      {oferta.local && oferta.local.nombreNegocio && (
        <p className="oferta-meta">
          <Store size={14} /> {oferta.local.nombreNegocio}
        </p>
      )}
      <p className="oferta-meta">
        <Clock size={14} /> Retiro: {oferta.horarioRetiro}
      </p>

      <div className="oferta-precio">
        <span className="precio-original">
          {formatoPrecio(oferta.precioOriginal)}
        </span>
        <span className="precio-actual">
          {formatoPrecio(oferta.precioDescuento)}
        </span>
      </div>

      {acciones && <div className="oferta-acciones">{acciones}</div>}
    </div>
  );
};

export default OfferCard;
