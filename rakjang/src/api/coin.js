import axios from "./index";

export const fetchCoins =
  (query = "") =>
  async () => {
    const { data } = await axios.get(`/coins${query}`);
    return data;
  };

export const fetchCoinById = async (id) => {
  const { data } = await axios.get(`/coins/${id}`);
  return data;
};
