import { Link } from "react-router-dom";
import {
  Leaf,
  Croissant,
  Salad,
  Wallet,
  Globe,
  Zap,
  Heart,
} from "lucide-react";
import Navbar from "../components/Navbar";

const Landing = () => {
  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="hero-contenido">
          <span className="hero-badge">
            <Leaf size={15} /> Menos desperdicio, más sabor
          </span>
          <h1 className="hero-titulo">
            Rescata comida deliciosa a{" "}
            <span className="destacado">mitad de precio</span>
          </h1>
          <p className="hero-texto">
            FoodRescue conecta locales con excedentes de comida y personas que
            quieren ahorrar mientras cuidan el planeta.
          </p>
          <div className="hero-acciones">
            <Link to="/register" className="btn btn-primary btn-lg">
              Empezar ahora
            </Link>
            <Link to="/login" className="btn btn-outline btn-lg">
              Ya tengo cuenta
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card hero-card--1">
            <span className="hero-card-icono">
              <Croissant size={28} />
            </span>
            <div>
              <strong>Pack panadería</strong>
              <p>
                $10 → <span className="precio-rescate">$4</span>
              </p>
            </div>
          </div>
          <div className="hero-card hero-card--2">
            <span className="hero-card-icono">
              <Salad size={28} />
            </span>
            <div>
              <strong>Pack ensaladas</strong>
              <p>
                $8 → <span className="precio-rescate">$3</span>
              </p>
            </div>
          </div>
          <div className="hero-blob" />
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <span className="icono-circulo">
            <Wallet size={26} />
          </span>
          <h3>Ahorra hasta 70%</h3>
          <p>Comida rica de tus locales favoritos a precios de rescate.</p>
        </div>
        <div className="feature-card">
          <span className="icono-circulo icono-circulo--coral">
            <Globe size={26} />
          </span>
          <h3>Cuida el planeta</h3>
          <p>Cada pack que rescatas evita que buena comida termine en la basura.</p>
        </div>
        <div className="feature-card">
          <span className="icono-circulo">
            <Zap size={26} />
          </span>
          <h3>Rápido y fácil</h3>
          <p>Reserva en segundos y muestra tu código al retirar.</p>
        </div>
      </section>

      <footer className="footer">
        <p>
          Hecho con <Heart size={14} className="icono-inline" /> para reducir el
          desperdicio de comida · FoodRescue 2026
        </p>
        <p className="footer-ds">
          <Link to="/design-system">Sistema de diseño</Link>
        </p>
      </footer>
    </>
  );
};

export default Landing;
