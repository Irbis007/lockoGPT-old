import { createSlice } from '@reduxjs/toolkit';

export const promptSlice = createSlice({
  name: 'prompt',
  initialState: {
    currentPrompt: '',
  },
  reducers: {
    setPrompt: (state, action) => {
      state.currentPrompt = action.payload;
    }
  }
});

export const { setPrompt } = promptSlice.actions;
export default promptSlice.reducer;
