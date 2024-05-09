import { useDispatch, useSelector } from "react-redux";

import {
   documentOutlineSelector
} from "src/states/redux/document_outline";
import {
  getDocumentOutlineAsyncThunk
} from "src/states/redux/document_outline/thunks/getDocumentOutlineAsyncThunk";

// Import types
import type { AppDispatch } from "src/states/redux";

export const {
  useDocumentOutline,
  useDocumentOutlineState,
  useDocumentOutlineActions
} = (function() {
  const createDispatchers = function(dispatch: AppDispatch) {
    return {
      /**
       * Use this dispatcher to get document outline
       */
      getPlayerIDAsync() {
        dispatch(getDocumentOutlineAsyncThunk());
      }
    }
  }

  return {
    /**
     * Use this hook to get state of `document outline` and dispatchers to manipulate
     * state
     * @returns
     */
    useDocumentOutline() {
      const documentOutline = useSelector(documentOutlineSelector);
      const dispatch = useDispatch();

      return {
        documentOutline,
        documentOutlineDispatcher: createDispatchers(dispatch)
      }
    },

    /**
     * Use this hook to get state of `document outline
     * @returns
     */
    useDocumentOutlineState() {
      const documentOutline = useSelector(documentOutlineSelector);

      return documentOutline;
    },

    /**
     * Use this hook to get dispatchers to manipulate state
     * @returns
     */
    useDocumentOutlineActions() {
      const dispatch = useDispatch();

      return createDispatchers(dispatch);
    }
  }
})();