export interface BaseV1ResponseModel<T> {
  totalRows: number;
  data: T;
  done: boolean;
  statusCode: number;
  errorMessage: number;
}

export interface BaseV1ObjectResponseModel<T> {
  data: T;
  done: boolean;
  statusCode: number;
  errorMessage: number;
}
