import api from "@/config/axios";
import { State, Company } from "@/types/companies.types";
import {
  SET_COMPANIES,
  SET_COMPANY,
  DELETE_COMPANY,
  UPDATE_COMPANY,
  SET_LOADING,
  SET_ERROR,
  RESET_STATE,
  SET_METADATA,
} from "@/store/mutation";
import { FETCH_COMPANIES, FETCH_COMPANY } from "@/store/actions";
import { Metadata } from "@/types/employee.types";

export const getters = {
  companies: (state: State) => state.companies,
  company: (state: State) => state.company,
  companyMetadata: (state: State) => state.metadata,
};

export const mutations = {
  [SET_COMPANIES](state: State, companies: Company[]) {
    state.companies = companies;
  },
  [SET_COMPANY](state: State, company: Company) {
    state.company = company;
  },
  [DELETE_COMPANY](state: State, id: number) {
    state.companies = state.companies.filter((company) => company.id !== id);
  },
  [UPDATE_COMPANY](state: State, company: Company) {
    state.companies = state.companies.map((c) => {
      if (c.id === company.id) {
        return company;
      }
      return c;
    });
  },
  [SET_LOADING](state: State, loading: boolean) {
    state.loading = loading;
  },
  [SET_METADATA](state: State, metadata: Metadata) {
    state.metadata = metadata;
  },
  [SET_ERROR](state: State, error: string) {
    state.error = error;
  },
  [RESET_STATE](state: State) {
    Object.assign(state, initialState);
  }

};
export const actions = {
  async [FETCH_COMPANIES]({ commit }: any, payload: Metadata) {


    commit(SET_LOADING, true);
    try {

      const queryParams = new URLSearchParams();

      if (payload.page) {
        queryParams.append("page", payload.page.toString());
      }

      if (payload.limit) {
        queryParams.append("limit", payload.limit.toString());
      }

      const { data } = await api.get("/companies", {
        params: queryParams,
      });

      commit(SET_COMPANIES, data.data.data);
      commit(SET_METADATA, data.data.meta);
    } catch (error: any) {
      commit(SET_ERROR, error.message);
    } finally {
      commit(SET_LOADING, false);
    }
  },
  async [FETCH_COMPANY]({ commit }: any, id: number) {
    commit(SET_LOADING, true);
    try {
      const { data } = await api.get(`/companies/${id}`);
      commit(SET_COMPANY, data);
    } catch (error: any) {
      commit(SET_ERROR, error.message);
    } finally {
      commit(SET_LOADING, false);
    }
  },
  async [UPDATE_COMPANY]({ commit }: any, company: Company) {
    commit(SET_LOADING, true);
    try {
      await api.patch(`/companies/${company.id}`, company);
    } catch (error: any) {
      commit(SET_ERROR, error.message);
    } finally {
      commit(SET_LOADING, false);
    }
  },
  async [DELETE_COMPANY]({ commit }: any, id: number) {
    commit(SET_LOADING, true);
    try {
      await api.delete(`/companies/${id}`);
      commit(SET_COMPANY, null);
      commit(DELETE_COMPANY, id);
    } catch (error: any) {
      commit(SET_ERROR, error.message);
    } finally {
      commit(SET_LOADING, false);
    }
  },
  [RESET_STATE]({ commit }: any) {
    commit(RESET_STATE);
  },
};

const initialState = {
  companies: [],
  company: null,
  loading: false,
  error: "",
  metadata: {
    page: 1,
    limit: 10,
    total: 0,
  },

};

export const state = () => ({ ...initialState });

export default {
  state,
  getters,
  mutations,
  actions,
};

