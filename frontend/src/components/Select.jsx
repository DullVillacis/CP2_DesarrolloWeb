const Select = ({ label, name, opciones, ...props }) => {
  return (
    <div className="campo">
      {label && (
        <label htmlFor={name} className="campo-label">
          {label}
        </label>
      )}
      <select id={name} name={name} className="campo-input" {...props}>
        {opciones.map((opcion) => (
          <option key={opcion.valor} value={opcion.valor}>
            {opcion.etiqueta}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
