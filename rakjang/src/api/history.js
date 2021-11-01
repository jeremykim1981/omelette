import axios from "./index";
import { getJwtBearer } from ".";

export const postHistory = async (data) => {
  return await axios.post(
    `/historys`,
    {
      ...data,
    },
    {
      headers: { Authorization: await getJwtBearer() },
    }
  );
};

export const fetchHistorys =
  (query = "") =>
  async () => {
    const { data } = await axios.get(`/historys${query}`, {
      headers: { Authorization: await getJwtBearer() },
    });
    return data;
  };

export const fetchHistoryById = async (id) => {
  const { data } = await axios.get(`/historys/${id}`, {
    headers: { Authorization: await getJwtBearer() },
  });
  return data;
};

export const updateHistoryBuyInvestContract = async (data) => {
  await axios.put(
    `/historys/buy/${data._id}`,
    {},
    { headers: { Authorization: await getJwtBearer() } }
  );
};
