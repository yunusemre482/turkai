import { State, User } from "@/types/user.types";
import api from "@/config/axios";
import {
  DELETE_TOKEN,
  RESET_STATE,
  SET_ERROR,
  SET_LOADING,
  SET_TOKEN,
  SET_USER,
  SET_USERS,
} from "../mutation";
import { FETCH_USER, FETCH_USERS, LOGIN, LOGOUT, REGISTER, SET_FETCHED_USER } from "../actions";
import { LoginPayload, RegisterPayload } from "@/types/auth.types";
import tokenService from "@/config/token.service";
import router from "@/router";

const initialState: State = {
  users: [],
  user: null,
  loading: false,
  error: "",
};

export const state = () => ({ ...initialState });

export const getters = {
  users: (state: State) => state.users,
  user: (state: State) => state.user,
  loading: (state: State) => state.loading,
  error: (state: State) => state.error,
};

export const mutations = {
  [SET_USERS](state: State, users: User[]) {
    state.users = users;
  },
  [SET_USER](state: State, user: User) {
    state.user = user;
  },
  [SET_LOADING](state: State, loading: boolean) {
    state.loading = loading;
  },
  [SET_ERROR](state: State, error: string) {
    state.error = error;
  },
  [SET_TOKEN](state: State, token: string) {
    tokenService.saveAccessToken(token);
  },
  [DELETE_TOKEN](state: State) {
    tokenService.destroyAccessToken();
  },
  [LOGOUT](state: State) {
    tokenService.destroyAccessToken();
    router.push("/auth/login");
  },
  [RESET_STATE](state: State) {
    Object.assign(state, initialState);
  },
};

export const actions = {

  async [LOGIN]({ commit }: any, payload: LoginPayload) {
    commit(SET_LOADING, true);
    const response = await api.post("/auth/login", payload);

    if (response.status !== 200) {
      commit(SET_ERROR, response.data);
      commit(SET_LOADING, false);
      return false;
    }

    commit(SET_TOKEN, response.data.data.access_token);
    commit(SET_LOADING, false);

    return true;
  },
  async [REGISTER]({ commit }: any, payload: RegisterPayload) {
    commit(SET_LOADING, true);
    const response = await api.post("/auth/register", payload);

    if (response.status !== 201) {
      commit(SET_ERROR, response.data);
      commit(SET_LOADING, false);
      return;
    }

    commit(SET_LOADING, false);
  },
  async [LOGOUT]({ commit }: any) {
    commit(DELETE_TOKEN);
    commit(RESET_STATE);
  },
  async [FETCH_USERS]({ commit }: any) {
    commit(SET_LOADING, true);
    const response = await api.get("/users");

    if (response.status !== 200) {
      commit(SET_ERROR, response.data);
      commit(SET_LOADING, false);
      return;
    }

    commit(SET_USERS, response.data);
    commit(SET_LOADING, false);
  },
  async [FETCH_USER]({ commit }: any, id: number) {
    commit(SET_LOADING, true);
    const response = await api.get(`/users/${id}`);

    if (response.status !== 200) {
      commit(SET_ERROR, response.data);
      commit(SET_LOADING, false);
      return;
    }

    commit(SET_USER, response.data);
    commit(SET_LOADING, false);
  },
  [SET_FETCHED_USER]({ commit }: any, payload: any) {
    const user = payload.user as User;

    if (user) {
      commit(SET_USER, user);
    }
  },
  [RESET_STATE]({ commit }: any) {
    commit(RESET_STATE);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
