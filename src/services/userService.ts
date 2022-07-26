import { User } from '../types/user';
import { api } from '../utils/api';
import { erroHandler } from '../utils/erroHandler';

type CreateUserProps = {
  username: string;
  password: string;
  role: 'ADMIN' | 'SECRETARY' | 'TECHNICAL_MANAGER' | 'INTERN';
};

type UpdateUserProps = {
  oldPassword?: string;
  newPassword?: string;
  enabled?: boolean;
};

export const createUser = async (props: CreateUserProps) => {
  try {
    const { data } = await api.post('/users', props);

    return data as User;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const res = await api.delete(`/users/${id}`);

    if (res.status === 204) return true;

    return false;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const getUser = async (id: string) => {
  try {
    const { data } = await api.get(`/users/${id}`);

    return data as User;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const listUsers = async () => {
  try {
    const { data } = await api.get('/users');

    return data as User[];
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const updateUser = async (id: string, props: UpdateUserProps) => {
  try {
    const res = await api.put(`/users/${id}`, props);

    if (res.status === 204) return true;

    return false;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};
