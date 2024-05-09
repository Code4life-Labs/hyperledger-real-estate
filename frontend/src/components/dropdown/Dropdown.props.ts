export type DropdownProps<N> = {
  title: string;
  items: Array<N>;
  topValue: string;
  selectedValue: string;
  onSelectItem: (item: N) => void;
  onSelectTop: (value: string) => void;
  renderItem: (item: N) => JSX.Element;
}