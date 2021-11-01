import axios from "./index";
import { getJwtBearer } from ".";

export const postOtp = async (data) => {
  await axios.post(
    `/otps`,
    {
      ...data,
    },
    { headers: { Authorization: await getJwtBearer() } }
  );
};

export const transferCoin = async (data) => {
  await axios.post(
    `/otps/transfer`,
    {
      ...data,
    },
    { headers: { Authorization: await getJwtBearer() } }
  );
};

export const exchangeCoin = async (data) => {
  await axios.post(
    `/otps/exchange`,
    {
      ...data,
    },
    { headers: { Authorization: await getJwtBearer() } }
  );
};

export const investCoin = async (data) => {
  await axios.post(
    `/otps/invest`,
    {
      ...data,
    },
    { headers: { Authorization: await getJwtBearer() } }
  );
};
