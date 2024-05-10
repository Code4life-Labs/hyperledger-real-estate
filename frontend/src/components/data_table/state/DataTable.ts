// Import from hooks
import { ChangeStateFnType } from "src/hooks/useStateWESSFns";

// Locally Import
import { DataTableProps } from "../DataTable.props";

function getInitialState<T>(props: DataTableProps<T>, maxRows = 5) {
  return {
    hasInitialData: false,
    isFetching: false,
    currentPage: 1,
    limit: maxRows,
    data: props.data,
    totalPages: Math.ceil(props.data.length / maxRows)
  }
}

function getStateFns<T>(
  changeState: ChangeStateFnType<ReturnType<typeof getInitialState<T>>>,
  props: DataTableProps<T>
) {
  const maxRows = props.maxRows ? props.maxRows : 5;
  const fns = {
    /**
     * Use this function to update `currentPage` state.
     * @param value 
     */
    changeCurrentPage: function(value: number) {
      changeState(
        "currentPage",
        // Update state
        function(data) { return data + value },
        // Prevent users increase the number of pages.
        function(data, _state) {
          // If the comopnent can get data asynchronously, the set `isFetching` to true and wait...
          if(props.getDataAsync && data >= _state.totalPages) {
            // Change `isFetching` to false.
            changeState("isFetching", function() { return true });

            // Fetch data.
            props
              .getDataAsync(_state.limit, _state.data.length)
              .then(payload => {
                // Change `isFetching` to true.
                changeState("isFetching", function() { return false });

                // If `payload` is empty, don't update `data` state.
                // Esle, add new list to `data` state.
                if(payload && payload.length > 0) {
                  fns.addDataToList(payload);

                  // Then move to next page.
                  changeState(
                    "currentPage",
                    function(data) { return data + 1 }
                  );
                }
              })
          }
          const next = data + value;
          return next < 1 || next > _state.totalPages;
        }
      );
    },

    /**
     * Use this function to add list to `data` state.
     * @param list 
     */
    addDataToList: function(list: Array<T>) {
      // Set new data.
      changeState(
        "data",
        function(data) { return [...data, ...list] }
      );

      // Update `totalPages` state.
      changeState(
        "totalPages",
        function(data) { return data + Math.ceil(list.length / maxRows) }
      );
    },

    /**
     * __THIS FUNCTION SHOULD BE USE ONE TIME!!!__
     * 
     * Use this function to confirm that the initial data is loaded.
     */
    confirmHasInitialData: function() {
      // Set new data.
      changeState(
        "hasInitialData",
        function() { return true; }
      );
    }
  };

  return fns;
}

export type DatatableStateFnsType = ReturnType<typeof getStateFns>;

export const DataTableLocalState = {
  getInitialState,
  getStateFns
};