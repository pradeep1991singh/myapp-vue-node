import transactions from "../services/api/transactions";

export default {
  state: () => ({
    isLoading: false,
    transactions: [],
  }),

  mutations: {
    loadingTransactions(state, isLoading) {
      state.isLoading = isLoading;
    },
    loadTransactions(state, transactions) {
      state.transactions = transactions;
    },
  },
  actions: {
    loadLatestTransactions(context) {
      context.commit("loadingTransactions", true);
      transactions
        .getAll()
        .then((res) => {
          console.log(res);
          context.commit("loadTransactions", res.data);
          context.commit("loadingTransactions", false);
        })
        .catch((error) => {
          console.error(error);
          context.commit("loadingTransactions", false);
        });
    },
  },
};
