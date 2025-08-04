import { Movie } from "@/types/movies";
import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    current_page: 1,
    per_page: 15,
    total: 0,
    next_page_url: null,
    prev_page_url: null,
    data: [] as Movie[],
    links: [] as {
      active: boolean;
      label: string;
      url: string;
    }[],
  },
  reducers: {
    setMovies(_, action) {
      return action.payload;
    },
    addMovie(state, action) {
      state.data.push(action.payload);
    },
    editMovie(state, action) {
      const index = state.data.findIndex(
        (movie) => movie.id === action.payload.id
      );
      state.data[index] = action.payload;
    },
    removeMovie(state, action) {
      return {
        ...state,
        data: state.data.filter((movie) => movie.id !== action.payload.id),
      };
    },
  },
});

export const { setMovies, addMovie, editMovie, removeMovie } =
  moviesSlice.actions;
export default moviesSlice.reducer;
