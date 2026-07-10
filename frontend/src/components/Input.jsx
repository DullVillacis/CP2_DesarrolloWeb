const Input = ({ label, name, error, ...props }) => {
  return (
    <div className="campo">
      {label && (
        <label htmlFor={name} className="campo-label">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        className={`campo-input ${error ? "campo-input--error" : ""}`}
        {...props}
      />
      {error && <span className="campo-error">{error}</span>}
    </div>
  );
};

export default Input;
