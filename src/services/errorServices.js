export const throwError = (message) => {
  const _error = new Error(message);
  throw _error;
};
