import React, { useState, useEffect } from 'react';
export const useForm = (callback, initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  function onChange(name, text) {
    setValues({ ...values, [name]: text });
  }

  const onSubmit = () => {
    callback();
  };

  return { values, setValues, errors, setErrors, onSubmit, onChange };
};
