
import { createReducer, on } from "@ngrx/store";
import { initialState } from "../state/state";
import * as AuthActions from "../actions/auth.actions";

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, state => ({
    ...state,
    loading: true
  })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(AuthActions.logoutSuccess, state => ({
    ...state,
    user: null
  }))
);