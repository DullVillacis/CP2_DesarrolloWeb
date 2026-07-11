import { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, Ticket } from "lucide-react";
import Button from "../components/Button";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import OfferCard from "../components/OfferCard";
import EmptyState from "../components/EmptyState";
import { useToast } from "../context/ToastContext";
import { OPCIONES_ESTADO_RESERVA } from "../utils/constantes";

const COLORES = [
  { nombre: "Verde", variable: "--verde", hex: "#12b886" },
  { nombre: "Verde 2", variable: "--verde-2", hex: "#0ca678" },
  { nombre: "Coral", variable: "--coral", hex: "#ff6b4a" },
  { nombre: "Coral 2", variable: "--coral-2", hex: "#f0502e" },
  { nombre: "Mango", variable: "--mango", hex: "#ffc53d" },
  { nombre: "Error", variable: "--error", hex: "#fa5252" },
  { nombre: "Tinta", variable: "--tinta", hex: "#1b2a2f" },
  { nombre: "Tinta suave", variable: "--tinta-suave", hex: "#5b6b70" },
  { nombre: "Crema", variable: "--crema", hex: "#fff9f2" },
  { nombre: "Crema 2", variable: "--crema-2", hex: "#fff1e6" },
  { nombre: "Borde", variable: "--borde", hex: "#efe6da" },
  { nombre: "Blanco", variable: "--blanco", hex: "#ffffff" },
];

const GRADIENTES = [
  { nombre: "Gradiente verde", variable: "--grad-verde" },
  { nombre: "Gradiente coral", variable: "--grad-coral" },
];

const ofertaDemo = {
  categoria: "panaderia",
  estado: "disponible",
  cantidadDisponible: 5,
  titulo: "Pack Panadería Sorpresa",
  descripcion: "Croissants, panes y bollería recién horneada del día.",
  local: { nombreNegocio: "Panadería El Trigo" },
  horarioRetiro: "18:00 - 20:00",
  precioOriginal: 10,
  precioDescuento: 4,
};

const DesignSystem = () => {
  const { mostrarToast } = useToast();
  const [estado, setEstado] = useState("");

  return (
    <div className="ds-pagina">
      <header className="ds-header">
        <Link to="/" className="ds-logo">
          <Leaf size={22} /> FoodRescue
        </Link>
        <span className="ds-tag">Design System</span>
      </header>

      <div className="ds-contenedor">
        <div className="ds-intro">
          <h1 className="pagina-titulo">Sistema de diseño</h1>
          <p className="pagina-sub">
            Colores, tipografía y componentes reutilizables de FoodRescue.
          </p>
        </div>

        <section className="ds-seccion">
          <h2 className="ds-seccion-titulo">Colores</h2>
          <div className="ds-swatches">
            {COLORES.map((c) => (
              <div key={c.variable} className="ds-swatch">
                <div
                  className="ds-swatch-color"
                  style={{ background: `var(${c.variable})` }}
                />
                <div className="ds-swatch-info">
                  <strong>{c.nombre}</strong>
                  <code>{c.variable}</code>
                  <code>{c.hex}</code>
                </div>
              </div>
            ))}
          </div>
          <div className="ds-swatches ds-swatches--grad">
            {GRADIENTES.map((g) => (
              <div key={g.variable} className="ds-swatch">
                <div
                  className="ds-swatch-color"
                  style={{ background: `var(${g.variable})` }}
                />
                <div className="ds-swatch-info">
                  <strong>{g.nombre}</strong>
                  <code>{g.variable}</code>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="ds-seccion">
          <h2 className="ds-seccion-titulo">Tipografía</h2>
          <div className="ds-panel">
            <h1 className="pagina-titulo">Título display · Fraunces</h1>
            <h3 className="oferta-titulo">Subtítulo · Poppins 600</h3>
            <p className="pagina-sub">
              Texto de párrafo en Poppins. Se usa para descripciones y contenido
              secundario en tono suave.
            </p>
          </div>
        </section>

        <section className="ds-seccion">
          <h2 className="ds-seccion-titulo">Botones</h2>
          <div className="ds-panel ds-fila">
            <Button variant="primary">Primary</Button>
            <Button variant="coral">Coral</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
        </section>

        <section className="ds-seccion">
          <h2 className="ds-seccion-titulo">Formularios</h2>
          <div className="ds-panel ds-grid-2">
            <Input label="Campo de texto" placeholder="Escribe algo" />
            <Input
              label="Campo con error"
              placeholder="Correo"
              error="Correo inválido"
            />
            <Dropdown
              label="Dropdown"
              opciones={OPCIONES_ESTADO_RESERVA}
              value={estado}
              onChange={setEstado}
            />
          </div>
        </section>

        <section className="ds-seccion">
          <h2 className="ds-seccion-titulo">Etiquetas y estados</h2>
          <div className="ds-panel ds-fila">
            <span className="badge">Categoría</span>
            <span className="estado-pill estado-pendiente">Pendiente</span>
            <span className="estado-pill estado-completada">Completada</span>
            <span className="estado-pill estado-cancelada">Cancelada</span>
            <span className="estado estado-ok">5 disponibles</span>
            <span className="estado estado-agotado">Agotado</span>
          </div>
        </section>

        <section className="ds-seccion">
          <h2 className="ds-seccion-titulo">Notificaciones (toast)</h2>
          <div className="ds-panel ds-fila">
            <Button
              variant="primary"
              onClick={() => mostrarToast("Acción completada con éxito", "exito")}
            >
              Toast de éxito
            </Button>
            <Button
              variant="danger"
              onClick={() => mostrarToast("Algo salió mal", "error")}
            >
              Toast de error
            </Button>
          </div>
        </section>

        <section className="ds-seccion">
          <h2 className="ds-seccion-titulo">Card de oferta</h2>
          <div className="ds-panel">
            <div className="ds-card-demo">
              <OfferCard
                oferta={ofertaDemo}
                acciones={
                  <Button variant="primary" className="btn-block">
                    Reservar
                  </Button>
                }
              />
            </div>
          </div>
        </section>

        <section className="ds-seccion">
          <h2 className="ds-seccion-titulo">Estado vacío</h2>
          <div className="ds-panel">
            <EmptyState
              icono={<Ticket size={40} />}
              titulo="Sin resultados"
              texto="Cuando haya datos aparecerán aquí."
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DesignSystem;
