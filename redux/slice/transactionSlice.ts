import { storage } from "@/common/storage";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Transaction = {
  id: string;
  title: string;
  amount: number;
  date: string;
};

interface TransactionState {
  transactions: Record<string, Transaction[]>;
}

const initialState: TransactionState = {
  transactions: {},
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    loadTransactions: (state, action: PayloadAction<string>) => {
      const userKey = `${action.payload}Transactions`;
      const storedData = storage.getString(userKey);

      if (storedData) {
        state.transactions[userKey] = JSON.parse(storedData);
      }
    },

    addTransaction: (
      state,
      action: PayloadAction<{ key: string; transaction: Transaction }>
    ) => {
      const { key, transaction } = action.payload;
      const userKey = `${key}Transactions`;
      const storedData = storage.getString(userKey);
      const existingTransactions = storedData ? JSON.parse(storedData) : [];
      const updatedTransactions = [...existingTransactions, transaction];
      storage.set(userKey, JSON.stringify(updatedTransactions));
      state.transactions[userKey] = updatedTransactions;
    },
    deleteTransaction: (
      state,
      action: PayloadAction<{ key: string; id: string }>
    ) => {
      const userKey = `${action.payload.key}Transactions`;
      const storedData = JSON.parse(storage.getString(userKey));
      const trimmed = storedData.filter((e: any) => e.id !== action.payload.id);
      storage.set(userKey, JSON.stringify(trimmed));
      state.transactions[userKey] = trimmed;
    },
  },
});

export const { loadTransactions, addTransaction, deleteTransaction } =
  transactionSlice.actions;
export default transactionSlice.reducer;
