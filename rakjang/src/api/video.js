import axios from "./index";

export const fetchVideos = async () => {
  const { data } = await axios.get("/videos");
  return data;
};
