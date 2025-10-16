import { configureStore } from "@reduxjs/toolkit";
import ticketsReducer from "../features/tickets/ticketsSlice";
// import filmsReducer from "../features/films/filmSlice";

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    // films: filmsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
