import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
  username: string | null;
  isLoggedIn: boolean;
};

const initialState: IUserState = {
  username: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.username = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, logOut } = userSlice.actions;

export default userSlice.reducer;