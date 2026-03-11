export const piniaPersistState = {
  recordedExpenses: {
    key: "recordedExpenses",
    storage: localStorage,
    pick: ["items"],
  },
};
