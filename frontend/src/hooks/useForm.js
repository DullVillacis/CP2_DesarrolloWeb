import { useState } from "react";

export const useForm = (valoresIniciales = {}) => {
  const [values, setValues] = useState(valoresIniciales);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => setValues(valoresIniciales);

  return { values, setValues, handleChange, reset };
};
