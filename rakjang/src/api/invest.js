import axios from "./index";

export const fetchInvests =
  (query = "") =>
  async () => {
    const { data } = await axios.get(`/invests${query}`);
    return data;
  };

export const fetchInvestById = async (id, query = "") => {
  const { data } = await axios.get(`/invests/${id}${query}`);
  // await axios.put(`/invests/views/${id}`);
  return data;
};
