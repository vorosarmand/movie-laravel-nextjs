import { Movie } from "@/types/movies";
import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: [] as Movie[],
  reducers: {
    setMovies(_, action) {
      return action.payload;
    },
    addMovie(state, action) {
      state.push(action.payload);
    },
    editMovie(state, action) {
      const index = state.findIndex((movie) => movie.id === action.payload.id);
      state[index] = action.payload;
    },
    removeMovie(state, action) {
      return state.filter((movie) => movie.id !== action.payload.id);
    },
  },
});

export const { setMovies, addMovie, editMovie, removeMovie } =
  moviesSlice.actions;
export default moviesSlice.reducer;
