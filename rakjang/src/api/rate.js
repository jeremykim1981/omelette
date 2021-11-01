import axios from "./index";

export const fetchRate = async () => {
  const { data } = await axios.get("/rates");
  return data?.rates[0];
};
