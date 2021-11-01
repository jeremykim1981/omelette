import axios from "./index";
import { getJwtBearer } from ".";

export const fetchInvestsContracts =
  (query = "") =>
  async () => {
    const { data } = await axios.get(`/contracts${query}`);
    return data;
  };

export const fetchInvestContractById = async (id, query = "") => {
  const { data } = await axios.get(`/contracts/${id}${query}`);
  await axios.put(`/contracts/views/${id}`);
  return data;
};

export const onSellInvestContract = async (data, query = "") => {
  await axios.post(
    `/contracts/sell`,
    { ...data },
    { headers: { Authorization: await getJwtBearer() } }
  );
};

export const onCancelInvestContract = async (data, query = "") => {
  await axios.post(
    `/contracts/cancel`,
    { ...data },
    { headers: { Authorization: await getJwtBearer() } }
  );
};

export const updateInvestContract = async (data, query = "") => {
  await axios.put(
    `/contracts/${data._id}${query}`,
    { ...data },
    { headers: { Authorization: await getJwtBearer() } }
  );
};

export const onBuyInvestContract = async (data, query = "") => {
  await axios.put(
    `/contracts/buy/${data._id}`,
    { ...data },
    { headers: { Authorization: await getJwtBearer() } }
  );
};

export const createInvestContract = async (data, query = "") => {
  await axios.post(
    `/contracts${query}`,
    { ...data },
    { headers: { Authorization: await getJwtBearer() } }
  );
};

export const deleteInvesrContract = async (id) => {
  await axios.delete(`/contracts/${id}`, {
    headers: { Authorization: await getJwtBearer() },
  });
};
