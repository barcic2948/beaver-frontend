import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface UserState {
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  scope: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = initialzeUserState();

function initialzeUserState(): UserState {
  const token = localStorage.getItem("access_token");
  if (token) {
    const decodedJwt: any = jwtDecode(token);
    return {
      username: decodedJwt.sub,
      firstName: decodedJwt.firstName,
      lastName: decodedJwt.lastName,
      scope: decodedJwt.scope,
      isLoggedIn: true,
    };
  } else {
    return {
      username: null,
      firstName: null,
      lastName: null,
      scope: null,
      isLoggedIn: false,
    };
  }
}

interface LoginPayload {
  username: string;
  firstName: string;
  lastName: string;
  scope: string;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.username = action.payload.username;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.scope = action.payload.scope;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.username = null;
      state.firstName = null;
      state.lastName = null;
      state.scope = null;
      state.isLoggedIn = false;
      localStorage.removeItem("access_token");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
