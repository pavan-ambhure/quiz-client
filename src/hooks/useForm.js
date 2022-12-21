import { useState } from 'react';

function useForm(getFreshModelObject) {
  const [values, setValues] = useState(getFreshModelObject());
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setValues({
      ...values,
      [id]: value,
    });
  };
  return { values, setValues, errors, setErrors, handleInputChange };
}

export default useForm;
