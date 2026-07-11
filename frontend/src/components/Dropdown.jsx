import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const Dropdown = ({ label, opciones, value, onChange, placeholder = "Selecciona" }) => {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const alClic = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setAbierto(false);
    };
    const alTecla = (e) => {
      if (e.key === "Escape") setAbierto(false);
    };
    document.addEventListener("mousedown", alClic);
    document.addEventListener("keydown", alTecla);
    return () => {
      document.removeEventListener("mousedown", alClic);
      document.removeEventListener("keydown", alTecla);
    };
  }, []);

  const seleccionada = opciones.find((o) => o.valor === value);

  const elegir = (valor) => {
    onChange(valor);
    setAbierto(false);
  };

  return (
    <div className="campo dropdown" ref={ref}>
      {label && <label className="campo-label">{label}</label>}
      <button
        type="button"
        className={`dropdown-boton ${abierto ? "abierto" : ""}`}
        onClick={() => setAbierto((v) => !v)}
      >
        <span>{seleccionada ? seleccionada.etiqueta : placeholder}</span>
        <ChevronDown size={18} className="dropdown-chevron" />
      </button>
      {abierto && (
        <ul className="dropdown-menu" role="listbox">
          {opciones.map((o) => (
            <li key={o.valor}>
              <button
                type="button"
                className={`dropdown-opcion ${o.valor === value ? "activa" : ""}`}
                onClick={() => elegir(o.valor)}
              >
                <span>{o.etiqueta}</span>
                {o.valor === value && <Check size={16} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
