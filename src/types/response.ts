export type PaginationResponse<T> = {
  count: number;
  next: null | number;
  current: number;
  previous: null | number;
  limit: number;
  results: T[];
};

export type BaseGetResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type ErrorResponse = {
  success: boolean;
  message: string;
  data: null;
};
