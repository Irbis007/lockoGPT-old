import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  name: string;
  email: string;
  isAuthorized: boolean;
  isLoading?: boolean;
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    isAuthorized: false,
    isLoading: true,
  },
  reducers: {
    set: (state, action: PayloadAction<User>) => ({ ...state, ...action.payload, isLoading: false }),
    logout: state => ({ ...state, isAuthorized: false }),
    setLoading: (state, action) => {
      state.isLoading = action.payload
    }
  }
});

export const { set: setUser, logout: logoutUser, setLoading } = userSlice.actions;
export default userSlice;
