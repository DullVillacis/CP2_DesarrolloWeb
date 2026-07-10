const EmptyState = ({ icono, titulo, texto }) => (
  <div className="empty-state">
    {icono && <div className="empty-icono">{icono}</div>}
    <h3>{titulo}</h3>
    {texto && <p>{texto}</p>}
  </div>
);

export default EmptyState;
