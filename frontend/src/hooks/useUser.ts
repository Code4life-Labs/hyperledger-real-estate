import { useDispatch, useSelector } from "react-redux";

// Import actions
import { UserActions } from "src/states/redux/user";

// Import selectors
import { userSelector } from "src/states/redux/user";

// Import thunks
import { getUserAsyncThunk } from "src/states/redux/user/thunks/getUserAsyncThunk";
import { getUsersAsyncThunk } from "src/states/redux/user/thunks/getUsersAyncThunk";
import { authorizeUserAsyncThunk } from "src/states/redux/user/thunks/authorizeUserAsyncThunk";
import { verifyTokenAsyncThunk } from "src/states/redux/user/thunks/verifyTokenAsyncThunk";
import { createUserAsyncThunk } from "src/states/redux/user/thunks/createUserAsyncThunk";
import { updateUserAsyncThunk } from "src/states/redux/user/thunks/updateUserAsyncThunk";

// Import types
import type { AppDispatch } from "src/states/redux";
import type { Chaincode_User } from "src/apis/chaincode/types";

export const {
  useUser,
  useUserState,
  useUserActions
} = (function() {
  const createDispatchers = function(dispatch: AppDispatch) {
    return {
      getUserAsync(id: string) {
        dispatch(getUserAsyncThunk(id));
      },
      
      getUsersAsync(limit: number, skip: number) {
        dispatch(getUsersAsyncThunk({ limit, skip }));
      },

      authorize(username: string, password: string) {
        dispatch(authorizeUserAsyncThunk({ username, password }));
      },

      verifyUser() {
        dispatch(verifyTokenAsyncThunk());
      },

      clearCurrentUser() {
        dispatch(UserActions.clearCurrentUser());
      },

      clearUsers() {
        dispatch(UserActions.clearUsers());
      },

      reset() {
        dispatch(UserActions.reset());
      },

      setUsers(data: Array<Chaincode_User>) {
        dispatch(UserActions.setUsers(data));
      },

      createUserAsync(data: Chaincode_User) {
        dispatch(createUserAsyncThunk(data));
      },

      updateUserAsync(data: Partial<Chaincode_User>) {
        dispatch(updateUserAsyncThunk(data));
      }
    }
  }

  return {
    useUser() {
      const user = useSelector(userSelector);
      const dispatch = useDispatch();

      return {
        user,
        userDispatchers: createDispatchers(dispatch)
      }
    },

    useUserState() {
      const user = useSelector(userSelector);

      return user;
    },

    useUserActions() {
      const dispatch = useDispatch();

      return createDispatchers(dispatch);
    }
  }
})();