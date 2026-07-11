import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";
import { listarMisReservas } from "../services/reservationService";

const ReservasContext = createContext();

export const useReservas = () => useContext(ReservasContext);

export const ReservasProvider = ({ children }) => {
  const { usuario } = useAuth();
  const [cantidad, setCantidad] = useState(0);

  const refrescar = useCallback(async () => {
    if (!usuario || usuario.rol !== "consumidor") {
      setCantidad(0);
      return;
    }
    try {
      const { data } = await listarMisReservas();
      setCantidad(data.filter((r) => r.estado !== "cancelada").length);
    } catch {
      setCantidad(0);
    }
  }, [usuario]);

  useEffect(() => {
    refrescar();
  }, [refrescar]);

  return (
    <ReservasContext.Provider value={{ cantidad, refrescar }}>
      {children}
    </ReservasContext.Provider>
  );
};
