import { useDispatch, useSelector } from "react-redux";

// Import actions
import { UserActions } from "src/states/redux/user";

// Import selectors
import { userSelector } from "src/states/redux/user";

// Import thunks
import { getUserAsyncThunk } from "src/states/redux/user/thunks/getUserAsyncThunk";

// Import types
import type { AppDispatch } from "src/states/redux";

export const {
  useUser,
  useUserState,
  useUserActions
} = (function() {
  const createDispatchers = function(dispatch: AppDispatch) {
    return {
      getUserAsync(username: string, password: string) {
        dispatch(getUserAsyncThunk({ username, password }));
      },

      reset() {
        dispatch(UserActions.reset());
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