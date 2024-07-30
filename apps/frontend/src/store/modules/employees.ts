import api from "@/config/axios";
import { Employee, State } from "@/types/employee.types";
import {
  RESET_STATE, SET_ERROR, SET_LOADING, SET_EMPLOYEES, SET_EMPLOYEE
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
  [DELETE_EMPLOYEE](state: State, id: number) {
    state.employees = state.employees.filter((employee) => employee.id !== id);
  },
  [SET_LOADING](state: State, loading: boolean) {
    state.loading = loading;
  },
  [SET_ERROR](state: State, error: string) {
    state.error = error;
  },
  [RESET_STATE](state: State) {
    Object.assign(state, initialState);
  },

};

export const actions = {
  async [FETCH_EMPLOYEES]({ commit }: any) {
    commit(SET_LOADING, true);
    try {
      const { data } = await api.get("/employees");
      commit(SET_EMPLOYEES, data);
    } catch (error: any) {
      commit(SET_ERROR, error.message);
    } finally {
      commit(SET_LOADING, false);
    }
  },
  async [CREATE_EMPLOYEE]({ commit }: any, employee: Employee) {
    commit(SET_LOADING, true);
    try {
      await api.post("/employees", employee);
    } catch (error: any) {
      commit(SET_ERROR, error.message);
    } finally {
      commit(SET_LOADING, false);
    }
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
  async [UPDATE_EMPLOYEE]({ commit }: any, employee: Employee) {
    commit(SET_LOADING, true);
    try {
      await api.put(`/employees/${employee.id}`, employee);
    } catch (error: any) {
      commit(SET_ERROR, error.message);
    } finally {
      commit(SET_LOADING, false);
    }
  },
  async [DELETE_EMPLOYEE]({ commit }: any, id: number) {
    commit(SET_LOADING, true);
    try {
      await api.delete(`/employees/${id}`);
      commit(SET_EMPLOYEE, null);
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
  error: '',
};

export const state = () => ({ ...initialState });

export default {
  state,
  getters,
  mutations,
  actions,
};

