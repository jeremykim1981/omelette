import axios from "axios";
import { Auth } from "aws-amplify";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:1337"
      : "https://aixmlhnsui.execute-api.ap-southeast-1.amazonaws.com/production",
  headers: {
    ["X-Api-Key"]: "WEB",
  },
});

export const getJwtBearer = async () => {
  const {
    accessToken: { jwtToken },
  } = await Auth.currentSession();
  return `Bearer ${jwtToken}`;
};

export default instance;
