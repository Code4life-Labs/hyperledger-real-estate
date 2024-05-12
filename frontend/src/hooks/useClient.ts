import { useDispatch, useSelector } from "react-redux";

// Import selectors
import { clientSelector } from "src/states/redux/client";

// Import thunks
import { getClientAsyncThunk } from "src/states/redux/client/thunks/getClientAyncThunk";
import { getClientsAsyncThunk } from "src/states/redux/client/thunks/getClientsAsyncThunk";

// Import types
import type { AppDispatch } from "src/states/redux";

export const {
  useClient,
  useClientState,
  useClientActions
} = (function() {
  const createDispatchers = function(dispatch: AppDispatch) {
    return {
      getClientsAsync() {
        dispatch(getClientsAsyncThunk());
      },

      getClientAsync(id: string) {
        dispatch(getClientAsyncThunk(id));
      }
    }
  }

  return {
    useClient() {
      const client = useSelector(clientSelector);
      const dispatch = useDispatch();

      return {
        client,
        clientDispatchers: createDispatchers(dispatch)
      }
    },

    useClientState() {
      const client = useSelector(clientSelector);

      return client;
    },

    useClientActions() {
      const dispatch = useDispatch();

      return createDispatchers(dispatch);
    }
  }
})();