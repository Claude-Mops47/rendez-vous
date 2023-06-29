import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { alertActions } from ".";
import { history, apiService } from "../helpers";

import sessionCookie from "./sessionCookie";

const name = "auth";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const slice = createSlice({ name, initialState, reducers });

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

function createInitialState() {
  const user = localStorage.getItem("user");

  return {
    value: user ? JSON.parse(user) : null,
  };
}

function createReducers() {
  return {
    setAuth: function (state, action) {
      state.value = action.payload;
    },
    setToken: function (state, action) {
      state.value.token = action.payload;
    },
  };
}
function createExtraActions() {
  return {
    login: login(),
    logout: logout(),
  };
  function login() {
    return createAsyncThunk(
      `${name}/login`,
      async function ({ email, password }, { dispatch }) {
        dispatch(alertActions.clear());
        try {
          const response = await apiService.post(`${baseUrl}/authenticate`, {
            email,
            password,
          });

          const { user, token } = response.data;

          dispatch(authActions.setAuth(user));
          dispatch(authActions.setToken(token));

          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", token);
    

          sessionCookie.set('session', token,{expires: 7, sercure: true })

          const { from } = history.location.state || {
            from: { pathname: "/" },
          };
          history.navigate(from);
        } catch (error) {
          dispatch(alertActions.error(error.message));
        }
      }
    );
  }

  function logout() {
    return createAsyncThunk(`${name}/logout`, function (_, { dispatch }) {
      dispatch(authActions.setAuth(null));
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      history.navigate("/auth/login");
    });
  }
}
