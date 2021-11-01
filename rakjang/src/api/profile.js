import axios from "./index";
import { getJwtBearer } from ".";

export const createProfile = async (data) => {
  await axios.post(`/profiles`, { ...data });
};

export const checkValidateProfile = async (data) => {
  await axios.post(`/profiles/checkValidateProfile`, { ...data });
};

export const updateProfile = async (id, data) => {
  await axios.put(
    `/profiles/${id}`,
    {
      ...data,
    },
    { headers: { Authorization: await getJwtBearer() } }
  );
};

export const updateNotiProfile = async (id, data) => {
  await axios.put(
    `/profiles/noti/${id}`,
    {
      ...data,
    },
    { headers: { Authorization: await getJwtBearer() } }
  );
};

export const fetchProfileById = (id) => async () => {
  const { data } = await axios.get(`/profiles/${id}`, {
    headers: { Authorization: await getJwtBearer() },
  });
  return data;
};

export const fetchProfileByPhoneNumber = (number) => async () => {
  const { data } = await axios.get(`/profiles/phone_number/${number}`, {
    headers: { Authorization: await getJwtBearer() },
  });
  return data;
};

export const fetchProfileByUserName = (name) => async () => {
  const { data } = await axios.get(`/profiles/username/${name}`, {
    headers: { Authorization: await getJwtBearer() },
  });
  return data;
};
