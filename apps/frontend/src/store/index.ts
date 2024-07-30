import { createStore, createLogger } from "vuex";
import VuexPersistence from "vuex-persist";
import users from "./modules/users";
import companies from "./modules/companies";
import employees from "./modules/employees";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

const debug = import.meta.env.NODE_ENV !== "production";

export default createStore({
  modules: {
    users,
    companies,
    employees
  },
  strict: debug,
  plugins: debug ? [createLogger(), vuexLocal.plugin] : [vuexLocal.plugin],
});
