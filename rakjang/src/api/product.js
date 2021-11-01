import axios from "./index";
import { getJwtBearer } from ".";

export const fetchProducts =
  (query = "") =>
  async () => {
    const { data } = await axios.get(`/products${query}`);
    return data;
  };

export const fetchProductById = async (id) => {
  const { data } = await axios.get(`/products/${id}`);
  // await axios.put(`/products/views/${id}`);
  return data;
};

export const checkOutProduct = async (data) => {
  await axios.post(
    `/products/checkout`,
    { ...data },
    { headers: { Authorization: await getJwtBearer() } }
  );
};
