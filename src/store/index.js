import { createStore } from "vuex";
import usersModule from "./users.module";
import transactionsModule from "./transactions.module";

export default createStore({
  modules: {
    user: usersModule,
    transactions: transactionsModule,
  },
});
