export const camelCaseToWords = (word) => {
  return (
    word.charAt(0).toUpperCase() +
    word
      .slice(1)
      .split(/(?=[A-Z])/)
      .join(' ')
  );
};
