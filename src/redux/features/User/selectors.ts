import { ReduxState } from '../../store';

export const getUserName = (state: ReduxState) => state.user.username;

export const isLoggedIn = (state: ReduxState) => state.user.isLoggedIn;