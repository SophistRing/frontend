export interface ApiResponse<T> {
  status: number;
  message: string | undefined;
  result: T;
  error: string | undefined;
}
