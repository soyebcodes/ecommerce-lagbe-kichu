import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
} | null;

type AuthState = {
  accessToken: string | null;
  user: User;
};

const initialState: AuthState = { accessToken: null, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; user?: User }>
    ) => {
      state.accessToken = action.payload.accessToken;
      if (action.payload.user) state.user = action.payload.user;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
