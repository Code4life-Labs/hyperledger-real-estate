export type Item<T> = {
  actualIndex: number;
  data: T;
}

export type DataTableProps<T> = {
  maxRows?: number,
  data: Array<T>;
  renderHeader: () => JSX.Element;
  renderRowData: (item: Item<T>, index: number) => JSX.Element;
  getDataAsync?: (skip: number, limit: number) => Promise<Array<T>>;
}