import api from "@/config/axios";
import { Employee, Metadata, State } from "@/types/employee.types";
import {
  RESET_STATE, SET_ERROR, SET_LOADING, SET_EMPLOYEES, SET_EMPLOYEE,
  SET_METADATA
} from "@/store/mutation";
import {
  FETCH_EMPLOYEES,
  FETCH_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  CREATE_EMPLOYEE,
} from "@/store/actions";


export const getters = {
  employees: (state: State) => state.employees,
  employee: (state: State) => state.employee,
  employeeMetadata: (state: State) => state.metadata,
};

export const mutations = {
  [SET_EMPLOYEES](state: State, employees: Employee[]) {
    state.employees = employees;
  },
  [SET_EMPLOYEE](state: State, employee: Employee) {
    state.employee = employee;
  },
  [UPDATE_EMPLOYEE](state: State, employee: Employee) {
    state.employees = state.employees.map((e) => {
      if (e.id === employee.id) {
        return employee;
      }
      return e;
    });
  },
  [DELETE_EMPLOYEE](state: State, id: string) {
    state.employees = state.employees.filter((employee) => employee.id !== id);
  },
  [SET_LOADING](state: State, loading: boolean) {
    state.loading = loading;
  },
  [SET_ERROR](state: State, error: string) {
    state.error = error;
  },
  [SET_METADATA](state: State, metadata: Metadata) {
    state.metadata = metadata;
  },
  [RESET_STATE](state: State) {
    Object.assign(state, initialState);
  },

};

export const actions = {
  async [FETCH_EMPLOYEES]({ commit }: any, payload: Metadata) {
    commit(SET_LOADING, true);
    try {
      const queryParams = new URLSearchParams();

      if (payload.page) {
        queryParams.append("page", payload.page.toString());
      }
      if (payload.limit) {
        queryParams.append("limit", payload.limit.toString());
      }

      console.log("queryParams", queryParams);

      const { data } = await api.get("/employees", {
        params: queryParams,
      });

      commit(SET_EMPLOYEES, data.data.data);
      commit(SET_METADATA, data.data.meta);

    } catch (error: any) {
      commit(SET_ERROR, error.message);
    } finally {
      commit(SET_LOADING, false);
    }
  },
  async [CREATE_EMPLOYEE]({ commit }: any, employee: Employee) {
    commit(SET_LOADING, true);
    try {
      const response = await api.post("/employees/admin", employee);

      if (response.status === 201) {
        commit(SET_EMPLOYEE, response.data);
      }

      return true;

    } catch (error: any) {
      commit(SET_ERROR, error.message);
    } finally {
      commit(SET_LOADING, false);
    }

    return false;
  },
  async [FETCH_EMPLOYEE]({ commit }: any, id: number) {
    commit(SET_LOADING, true);
    try {
      const { data } = await api.get(`/employees/${id}`);
      commit(SET_EMPLOYEE, data);
    } catch (error: any) {
      commit(SET_ERROR, error.message);
    } finally {
      commit(SET_LOADING, false);
    }
  },
  async [UPDATE_EMPLOYEE]({ commit }: any, {
    employee,
    id
  }: { employee: Employee, id: string }) {

    commit(SET_LOADING, true);
    try {
      await api.patch(`/employees/${id}`, employee);
    } catch (error: any) {
      commit(SET_ERROR, error.message);
    } finally {
      commit(SET_LOADING, false);
    }
  },
  async[DELETE_EMPLOYEE]({ commit }: any, id: number) {
    commit(SET_LOADING, true);
    try {
      await api.delete(`/employees/${id}`);
      commit(SET_EMPLOYEE, null);
      commit(DELETE_EMPLOYEE, id);
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

const initialState: State = {
  employees: [],
  employee: null,
  loading: false,
  metadata: {
    total: 0,
    page: 1,
    limit: 10,
    totalPage: 0,
  },
  error: '',
};

export const state = () => ({ ...initialState });

export default {
  state,
  getters,
  mutations,
  actions,
};

