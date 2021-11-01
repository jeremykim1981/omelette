// // export const getPathUrl = (image) => {
// //   const BACKEND_URL =
// //     process.env.NODE_ENV === "development"
// //       ? process.env.NEXTAUTH_BACKEND_URL
// //       : process.env.NEXTAUTH_BACKEND_PRODUCTION_URL;

// // const STRAPI_URI = "http://localhost:1337";
// const STRAPI_URI = "https://admin.jajoin.co";
// //   const url =
// //     image?.provider === "local" ? BACKEND_URL + image?.url : image?.url;
// //   return url;
// // };
// export const getPathUrl = (url) => {
//   // const localUrl = STRAPI_URI + url;
//   // return provider === "local" ? localUrl : url;
//   return STRAPI_URI + url;
// };

// // export const getPathUrl = (image) => {
// //   const BACKEND_URL =
// //     process.env.NODE_ENV === "development"
// //       ? process.env.NEXTAUTH_BACKEND_URL
// //       : process.env.NEXTAUTH_BACKEND_PRODUCTION_URL;

// //   const url =
// //     image?.provider === "local" ? BACKEND_URL + image?.url : image?.url;
// //   return url;
// // };

// // export const getPathUrl = (url) => {
// //   const BACKEND_URL =
// //     process.env.NODE_ENV === "development"
// //       ? process.env.NEXTAUTH_BACKEND_URL
// //       : process.env.NEXTAUTH_BACKEND_PRODUCTION_URL;

// //   const newUrl = BACKEND_URL + url;
// //   return newUrl;
// // };

export const getPathUrl = (url) => {
  const host =
    process.env.NODE_ENV === "development"
      ? process.env.NEXTAUTH_BACKEND_URL
      : process.env.NEXTAUTH_BACKEND_PRODUCTION_URL;
  return host + url;
};
