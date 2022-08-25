export const validateEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
    email
  );
};

export const api = {
  baseUrl:
    process.env.REACT_APP_STAGING === "development"
      ? "https://dev.ngrokexposedServer.in"
      : process.env.REACT_APP_STAGING === "uat"
      ? "https://uat.ngrokexposedServer.in"
      : process.env.REACT_APP_STAGING === "production"
      ? "https://ngrokexposedServer.in"
      : "http://localhost:6001",
};
