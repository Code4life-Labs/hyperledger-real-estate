export interface IAPIMethods {
  getAsync?<T>(...args: Array<T>): Promise<any>;
  getMultipleAsync?<T>(...args: Array<T>): Promise<any>;
}