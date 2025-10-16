// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// export interface FilmApi {
//   Poster: string;
//   Title: string;
//   Type: string;
//   imdbID: string;
//   Year: string;
// }

// interface FilmsState {
//   films: FilmApi[];
//   selectedFilm: FilmApi | null;
//   search: string;
//   loading: boolean;
//   hasSearched: boolean;
//   error: string | null;
// }

// const initialState: FilmsState = {
//   films: [],
//   selectedFilm: null,
//   search: "",
//   loading: false,
//   hasSearched: false,
//   error: null,
// };

// // 🔍 AsyncThunk untuk mencari film dari OMDb API
// export const fetchFilms = createAsyncThunk<
//   FilmApi[],
//   string,
//   { rejectValue: string }
// >("films/fetchFilms", async (query, { rejectWithValue }) => {
//   try {
//     const apikey = import.meta.env.VITE_API_KEY;
//     const res = await fetch(
//       `https://www.omdbapi.com/?s=${query}&apikey=${apikey}`
//     );
//     const data = await res.json();
//     if (data.Response === "False") return [];
//     return data.Search || [];
//   } catch (err) {
//     return rejectWithValue("Gagal memuat data film");
//   }
// });

// export const filmsSlice = createSlice({
//   name: "films",
//   initialState,
//   reducers: {
//     setSearch: (state, action: PayloadAction<string>) => {
//       state.search = action.payload;
//     },
//     setSelectedFilm: (state, action: PayloadAction<FilmApi | null>) => {
//       state.selectedFilm = action.payload;
//     },
//     clearFilms: (state) => {
//       state.films = [];
//       state.selectedFilm = null;
//       state.search = "";
//       state.hasSearched = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchFilms.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.hasSearched = true;
//       })
//       .addCase(fetchFilms.fulfilled, (state, action) => {
//         state.loading = false;
//         state.films = action.payload;
//       })
//       .addCase(fetchFilms.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Terjadi kesalahan saat memuat film";
//       });
//   },
// });

// export const { setSearch, setSelectedFilm, clearFilms } = filmsSlice.actions;
// export default filmsSlice.reducer;
