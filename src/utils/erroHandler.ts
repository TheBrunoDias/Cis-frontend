import { AxiosError } from 'axios';

export const erroHandler = (error: unknown) => {
  const axiosErr = error as AxiosError;

  if (axiosErr.response?.data) {
    const data = axiosErr.response.data as any;
    return data.error.message as string;
  } else {
    const e = error as Error;
    return e.message;
  }
};
