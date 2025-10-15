import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TicketRecord {
  title: string;
  date: string;
  count: number;
  htm: number;
  total: number;
}

interface TicketState {
  records: TicketRecord[];
}

const initialState: TicketState = {
  records: JSON.parse(localStorage.getItem("tickets") || "[]"),
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    addOrUpdateRecord: (state, action: PayloadAction<TicketRecord>) => {
      const newRecord = action.payload;
      const existing = state.records.find(
        (r) => r.title === newRecord.title && r.date === newRecord.date
      );

      if (existing) {
        existing.count += newRecord.count;
        existing.total = existing.count * existing.htm;
      } else {
        state.records.push(newRecord);
      }

      localStorage.setItem("tickets", JSON.stringify(state.records));
    },

    removeRecord: (
      state,
      action: PayloadAction<{ title: string; date: string }>
    ) => {
      state.records = state.records.filter(
        (r) =>
          !(r.title === action.payload.title && r.date === action.payload.date)
      );
      localStorage.setItem("tickets", JSON.stringify(state.records));
    },
  },
});

export const { addOrUpdateRecord, removeRecord } = ticketsSlice.actions;
export default ticketsSlice.reducer;
