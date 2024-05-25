export interface IAPIMethods {
  getAsync?(...args: any[]): Promise<any>;
  getMultipleAsync?(...args: any[]): Promise<any>;
  postAsync?(...args: any[]): Promise<any>;
  patchAsync?(...args: any[]): Promise<any>;
  deleteAsync?(...args: any[]): Promise<any>;
}