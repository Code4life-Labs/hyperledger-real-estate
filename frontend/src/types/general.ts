export type RouteData = {
  path: string;
  name: string;
  Element: JSX.Element | (() => JSX.Element);
  children?: Array<RouteData>;
}

export type OutlineItemData = {
  title: string;
  value: string;
}

export type OutlineData = {
  title: string;
  value: string;
  items: Array<OutlineItemData>;
}