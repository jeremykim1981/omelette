import axios from "./index";

export const fetchBlogs = (query) => async () => {
  const { data } = await axios.get("/blogs");
  return data;
};

export const fetchBlogById = (id) => async () => {
  const { data } = await axios.get(`/blogs/${id}`);
  return data;
};

export const updateView = async (id) => {
  await axios.put(`/blogs/views/${id}`, {});
};
