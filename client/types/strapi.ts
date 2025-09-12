export interface StrapiResponse<T> {
  data: T;
  meta?: any;
  message?: string;
}
