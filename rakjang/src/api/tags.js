import axios from "./index";

export const fetchTags = () => async () => {
  const { data } = await axios.get("/tags");
  return data;
};
