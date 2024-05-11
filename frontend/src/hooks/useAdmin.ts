import { useDispatch, useSelector } from "react-redux";

// Import selectors
import { adminSelector } from "src/states/redux/admin";

// Import thunks
import { getAdminsAsyncThunk } from "src/states/redux/admin/thunks/getAdminsAsyncThunk";

// Import types
import type { AppDispatch } from "src/states/redux";

export const {
  useAdmin,
  useAdminState,
  useAdminActions
} = (function() {
  const createDispatchers = function(dispatch: AppDispatch) {
    return {
      getRealEstatesAsync() {
        dispatch(getAdminsAsyncThunk());
      }
    }
  }

  return {
    useAdmin() {
      const admin = useSelector(adminSelector);
      const dispatch = useDispatch();

      return {
        admin,
        adminDispatchers: createDispatchers(dispatch)
      }
    },

    useAdminState() {
      const admin = useSelector(adminSelector);

      return admin;
    },

    useAdminActions() {
      const dispatch = useDispatch();

      return createDispatchers(dispatch);
    }
  }
})();