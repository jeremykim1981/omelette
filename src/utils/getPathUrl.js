export const getPathUrl = (url) => {
  const host =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_BACKEND_URL
      : process.env.REACT_APP_BACKEND_PRODUCTION_URL;
  return host + url;
};
