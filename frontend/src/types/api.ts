export interface IAPIMethods {
  getAsync?(...args: any[]): Promise<any>;
  getMultipleAsync?(...args: any[]): Promise<any>;
}