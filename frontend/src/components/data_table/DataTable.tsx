import React from 'react'

// Import hooks
import { useStateWESSFns } from 'src/hooks/useStateWESSFns';

// Import from components
import LoadingIndicator from '../loading_indicator/LoadingIndicator';
import Button from '../buttons/Button';

// Locally Import
import { DataTableLocalState as __LOCAL_STATE__ } from './state/DataTable';

// Import types
import { DataTableProps } from './DataTable.props';

// Import styles
import './DataTable.styles.css';

/**
 * Component will render a data table depend on `data`. In the early of this component, it only render data that is a its prop.
 * But maybe the data is still remain on server, so the datatable must be load them too.
 * 
 * By this way, this component will have 2 types of data:
 * - `Initial Data`: the data is fetched in first, before the component renders.
 * - `Asynchronous Data`: the data is fetched later.
 * @param param0 
 * @returns 
 */
export default function DataTable<T>({
  maxRows = 5,
  ...props
}: DataTableProps<T>) {
  const [state, setStateFns] = useStateWESSFns(
    __LOCAL_STATE__.getInitialState<T>(props, maxRows),
    function(changeState) { return __LOCAL_STATE__.getStateFns<T>(changeState, props) }  
  );

  // TO DO: Get number of data rows depend on currentPage, MaxRows and length of props.data.
  // Need to know which index is start and which is end. Optimize when iterate.
  // start is calculate with the idea of `step`. Depend on maxRows and currentPage (step is maxRows).
  // end is easier, just get maxRows * currentPage and compare with N (length of props.data). if result > N, then get N else get result.
  const printableDataRows = React.useMemo(() => {
    const d: Array<{ actualIndex: number, data: T }> = [];
    const N = state.data.length;
    const start = maxRows * (state.currentPage - 1);
    const end = maxRows * state.currentPage < N ? maxRows * state.currentPage : N;

    for(let i = start; i < end; i++) {
      d.push({ actualIndex: i, data: state.data[i] });
    }

    return d;
  }, [state.currentPage, state.data, maxRows]);

  React.useEffect(() => {
    /*
      This useEffect can be triggered by:
        - `props.data` is fullfilled by parent component. Then the length of `props.data` change.
    */
    /*
      Because when the first render, `props.data` is empty, so state.data is the same.
      Then if `props.data` is fullfilled, then set `props.data` to `data` state. 
    */
    if(props.data.length > state.data.length && !state.hasInitialData) {
      // If state has no data, the add new data to group and confirm the initial data is loaded.
      setStateFns.addDataToList(props.data);
      // RUN ONE TIME.
      setStateFns.confirmHasInitialData();
    }
  }, [props.data.length]);

  return (
    <div className="data-table-container">
      <div className="data-table-wrapper">
        {/* Table */}
        {
          printableDataRows.length > 0
            ? (
              <table className="data-table">
                <thead>
                  {
                    props.renderHeader()
                  }
                </thead>
                <tbody>
                  {
                    printableDataRows.map(props.renderRowData)
                  }
                </tbody>
              </table>
            )
            : (
              <p className="font-bold text-center">Vẫn chưa có dữ liệu nào :(</p>
            )
        }
      </div>
      {/* Buttons */}
      <div className="data-table-controller pt-[24px]">
        { state.isFetching && <LoadingIndicator text="Đang tải..." /> }
        <div className="flex items-center">
          <h3 className="font-bold">{state.currentPage}/{state.totalPages}</h3>
          <div className="flex ms-4">
            <Button
              buttonType="non_padding"
              onClick={() => setStateFns.changeCurrentPage(-1)}
              extendClassName="flex items-center justify-center p-4 me-2"
            >
              <span
                className="material-symbols-outlined text-on-primary"
              >keyboard_arrow_left</span>
            </Button>
            <Button
              buttonType="non_padding"
              onClick={() => setStateFns.changeCurrentPage(1)}
              extendClassName="flex items-center justify-center p-4"
            >
              <span
                className="material-symbols-outlined text-on-primary rotate-180"
              >keyboard_arrow_left</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}