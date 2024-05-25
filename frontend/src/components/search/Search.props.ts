export type SearchProps<T> = {
  placeHolder: string,
  onSearchResponse: (searchString: string, data: any) => void;
  apiCallers: Array<(text: string) => Promise<Array<T>>>;
}

export type SearchResultListProps<T> = {
  results: Array<T>;
  resultListPosition: "top" | "bottom";
  renderResultItem: (item: T) => JSX.Element;
  keyExtractor: (item: T, index: number) => string;
}

export type SearchBoxProps<T> = {
  apiCallers: Array<(text: string) => Promise<Array<T>>>;
  placeHolder: string;
  resultListPosition: "top" | "bottom";
  renderResultItem: (item: T) => JSX.Element;
  keyExtractor: (item: T, index: number) => string;
}