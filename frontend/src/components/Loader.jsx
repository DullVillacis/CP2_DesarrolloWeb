const Loader = ({ texto = "Cargando..." }) => (
  <div className="loader">
    <div className="loader-spinner" />
    <p>{texto}</p>
  </div>
);

export default Loader;
