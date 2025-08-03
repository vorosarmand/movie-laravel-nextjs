import { Settings } from "@/types/settings";
import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: { pg_ratings: [] } as Settings,
  reducers: {
    setSettings(_, action) {
      return action.payload;
    },
  },
});

export const { setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
