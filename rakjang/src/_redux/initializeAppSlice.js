import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";

// AWS
import { Auth } from "aws-amplify";

// API
import { fetchProfileById } from "../api/profile";

export const initializeApp = createAsyncThunk(
  "initializeApp/initializeStore",
  async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();

      // if (!user) {
      //   return {
      //     user: null,
      //     status: "empty",
      //   };
      // }

      const { email, phone_number } = user.attributes;

      const id = user?.attributes["custom:id"];

      const { profile } = await fetchProfileById(id)();

      return {
        user: {
          id,
          email,
          username: profile?.username,
          wallet_id: profile?.wallet_id,
          cover_image: profile?.cover_image,
          first_name: profile?.first_name,
          last_name: profile?.last_name,
          coin: profile?.coin || 0,
          phone_number: profile?.phone_number || "",
          address: profile?.address?.address,
          postal_code: profile?.address?.postal_code,
          bank_name: profile?.bank?.bank_name,
          bank_number: profile?.bank?.bank_number,
          bank_account: profile?.bank?.bank_account,
          bank_branch: profile?.bank?.bank_branch,
          unread: profile?.unread,
          groups:
            user?.signInUserSession?.accessToken?.payload["cognito:groups"],
        },
      };
    } catch (error) {
      return {
        user: null,
        status: "error",
      };
    }
  }
);

const initializeAppStore = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [initializeApp.pending]: (state, action) => {
      if (state.status === "idle") {
        state.status = "loading";
      }
    },
    [initializeApp.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload.user;
    },
  },
});

export default initializeAppStore.reducer;
