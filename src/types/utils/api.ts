import { AxiosError } from 'axios';

export type ResponseData<T = unknown> = {
  success: boolean;
  code: number;
  message: string;
  payload: T;
};

export class ResponseError extends AxiosError<ResponseData> {}
