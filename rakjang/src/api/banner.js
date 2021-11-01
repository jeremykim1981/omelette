import axios from "./index";

export const fetchBanners = async () => {
  const { data } = await axios.get("/banners");
  return data;
};

export const fetchBannerById = async (id) => {
  const { data } = await axios.get(`/banners/${id}`);
  return data;
};
