/* eslint-disable @typescript-eslint/no-explicit-any */
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
  status: number;
  detail: string;
  data: any | null;
};
