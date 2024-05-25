import { useDispatch, useSelector } from "react-redux";

// Import actions
import { ClientActions } from "src/states/redux/client";

// Import selectors
import { clientSelector } from "src/states/redux/client";

// Import thunks
import { getClientAsyncThunk } from "src/states/redux/client/thunks/getClientAyncThunk";
import { getClientsAsyncThunk } from "src/states/redux/client/thunks/getClientsAsyncThunk";
import { createClientAsyncThunk } from "src/states/redux/client/thunks/createClientAsyncThunk";
import { updateClientAsyncThunk } from "src/states/redux/client/thunks/updateClientAsyncThunk";

// Import types
import type { AppDispatch } from "src/states/redux";
import type { Chaincode_Client } from "src/apis/chaincode/types";

export const {
  useClient,
  useClientState,
  useClientActions
} = (function() {
  const createDispatchers = function(dispatch: AppDispatch) {
    return {
      getClientsAsync(limit: number, skip: number) {
        dispatch(getClientsAsyncThunk({ limit, skip }));
      },

      getClientAsync(id: string) {
        dispatch(getClientAsyncThunk(id));
      },

      clearCurrentUser() {
        dispatch(ClientActions.clearCurrentClient());
      },

      clearUsers() {
        dispatch(ClientActions.clearClients());
      },

      setClients(data: Array<Chaincode_Client>) {
        dispatch(ClientActions.setClients(data));
      },

      createClientAsync(data: Chaincode_Client) {
        dispatch(createClientAsyncThunk(data));
      },

      updateClientAsync(data: Partial<Chaincode_Client>) {
        dispatch(updateClientAsyncThunk(data));
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