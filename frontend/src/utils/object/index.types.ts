export type ToStringOptions = {
  /**
   * Seperator between `key` and `value`.
   */
  kvSeperator: string;
  /**
   * Seperator between `properties`.
   */
  seperator: string;
};

export type UpdateObjectOptionsType = {
  /**
   * If `canOverrideValues` is true, all item's values will be assigned to new one. Otherwise,
   * only falsy value of item will be assigned (default is "true").
   */
  canOverrideValues: boolean;
};