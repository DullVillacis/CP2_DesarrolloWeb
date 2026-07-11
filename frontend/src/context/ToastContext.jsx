import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const cerrar = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const mostrarToast = useCallback(
    (mensaje, tipo = "exito") => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, mensaje, tipo }]);
      setTimeout(() => cerrar(id), 4000);
    },
    [cerrar]
  );

  return (
    <ToastContext.Provider value={{ mostrarToast }}>
      {children}
      <div className="toast-contenedor">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.tipo}`}>
            {t.tipo === "error" ? (
              <AlertCircle size={18} />
            ) : (
              <CheckCircle2 size={18} />
            )}
            <span className="toast-texto">{t.mensaje}</span>
            <button
              type="button"
              className="toast-cerrar"
              onClick={() => cerrar(t.id)}
              aria-label="Cerrar"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
