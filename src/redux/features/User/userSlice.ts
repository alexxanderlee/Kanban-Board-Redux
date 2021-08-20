import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
  username: string ;
};

const initialState: IUserState = {
  username: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    logOut: (state) => {
      state.username = '';
    }
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;