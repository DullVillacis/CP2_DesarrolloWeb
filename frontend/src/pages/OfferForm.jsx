import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { useForm } from "../hooks/useForm";
import { CATEGORIAS } from "../utils/constantes";
import {
  crearOferta,
  actualizarOferta,
  obtenerOferta,
} from "../services/offerService";

const OfferForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const editando = Boolean(id);

  const { values, handleChange, setValues } = useForm({
    titulo: "",
    descripcion: "",
    categoria: "panaderia",
    precioOriginal: "",
    precioDescuento: "",
    cantidadDisponible: "",
    horarioRetiro: "",
    disponibleHasta: "",
  });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(editando);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (!editando) return;
    const cargar = async () => {
      try {
        const { data } = await obtenerOferta(id);
        setValues({
          titulo: data.titulo,
          descripcion: data.descripcion,
          categoria: data.categoria,
          precioOriginal: data.precioOriginal,
          precioDescuento: data.precioDescuento,
          cantidadDisponible: data.cantidadDisponible,
          horarioRetiro: data.horarioRetiro,
          disponibleHasta: data.disponibleHasta
            ? data.disponibleHasta.slice(0, 10)
            : "",
        });
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setGuardando(true);
    try {
      const datos = {
        ...values,
        precioOriginal: Number(values.precioOriginal),
        precioDescuento: Number(values.precioDescuento),
        cantidadDisponible: Number(values.cantidadDisponible),
      };
      if (editando) {
        await actualizarOferta(id, datos);
      } else {
        await crearOferta(datos);
      }
      navigate("/mis-ofertas");
    } catch (err) {
      const msg =
        err.response?.data?.errores?.[0] ||
        err.response?.data?.mensaje ||
        "No se pudo guardar la oferta";
      setError(msg);
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) {
    return (
      <>
        <Navbar />
        <Loader texto="Cargando oferta..." />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="contenedor contenedor-angosto">
        <h1 className="pagina-titulo">
          {editando ? "Editar oferta" : "Nueva oferta"}
        </h1>
        <p className="pagina-sub">Completa los datos del pack de comida.</p>

        {error && <div className="alerta alerta-error">{error}</div>}

        <form onSubmit={onSubmit} className="form-tarjeta">
          <Input
            label="Título"
            name="titulo"
            value={values.titulo}
            onChange={handleChange}
            required
          />
          <Input
            label="Descripción"
            name="descripcion"
            value={values.descripcion}
            onChange={handleChange}
            required
          />
          <Select
            label="Categoría"
            name="categoria"
            opciones={CATEGORIAS}
            value={values.categoria}
            onChange={handleChange}
          />
          <div className="form-fila">
            <Input
              label="Precio original"
              name="precioOriginal"
              type="number"
              step="0.01"
              min="0"
              value={values.precioOriginal}
              onChange={handleChange}
              required
            />
            <Input
              label="Precio con descuento"
              name="precioDescuento"
              type="number"
              step="0.01"
              min="0"
              value={values.precioDescuento}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-fila">
            <Input
              label="Cantidad disponible"
              name="cantidadDisponible"
              type="number"
              min="0"
              value={values.cantidadDisponible}
              onChange={handleChange}
              required
            />
            <Input
              label="Disponible hasta"
              name="disponibleHasta"
              type="date"
              value={values.disponibleHasta}
              onChange={handleChange}
              required
            />
          </div>
          <Input
            label="Horario de retiro"
            name="horarioRetiro"
            value={values.horarioRetiro}
            onChange={handleChange}
            placeholder="Ej: 18:00 - 20:00"
            required
          />

          <div className="form-acciones">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate("/mis-ofertas")}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={guardando}>
              {guardando
                ? "Guardando..."
                : editando
                ? "Guardar cambios"
                : "Crear oferta"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default OfferForm;
