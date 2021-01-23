export const productValidator = (initialState, values) => {
  const errors = {};
  for (let key in initialState) {
    if (initialState[key] === values[key]) {
      errors[key] = `${key} is Required`;
    }
  }
  delete errors['isFeatured'];
  return { isValid: Object.keys(errors).length === 0, errors };
};
