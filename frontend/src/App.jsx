import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { ReservasProvider } from "./context/ReservasContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Offers from "./pages/Offers";
import MyOffers from "./pages/MyOffers";
import OfferForm from "./pages/OfferForm";
import MyReservations from "./pages/MyReservations";
import LocalReservations from "./pages/LocalReservations";
import DesignSystem from "./pages/DesignSystem";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ReservasProvider>
          <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/design-system" element={<DesignSystem />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ofertas"
            element={
              <ProtectedRoute roles={["consumidor"]}>
                <Offers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mis-reservas"
            element={
              <ProtectedRoute roles={["consumidor"]}>
                <MyReservations />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mis-ofertas"
            element={
              <ProtectedRoute roles={["local"]}>
                <MyOffers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mis-ofertas/nueva"
            element={
              <ProtectedRoute roles={["local"]}>
                <OfferForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mis-ofertas/:id/editar"
            element={
              <ProtectedRoute roles={["local"]}>
                <OfferForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reservas-local"
            element={
              <ProtectedRoute roles={["local"]}>
                <LocalReservations />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ReservasProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
