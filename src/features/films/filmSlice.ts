import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchFilms } from "../../utils/api";

export const fetchFilms = createAsyncThunk(
  "films/fetch",
  async (query: string) => {
    const data = await searchFilms(query);
    return data;
  }
);

type Film = { imdbID: string; Title: string; Year: string; Poster: string };
interface FilmsState {
  items: Film[];
  loading: boolean;
  error?: string;
}

const initialState: FilmsState = { items: [], loading: false };

const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload?.Search ?? [];
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default filmsSlice.reducer;
