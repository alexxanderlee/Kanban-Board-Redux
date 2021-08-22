import userReducer from './userSlice';

import { userActions } from './userSlice';
import * as userSelectors from './selectors';

export {
  userActions,
  userSelectors,
};

export default userReducer;