import { api } from '../utils/api';
import { Room } from './../types/room';
import { erroHandler } from './../utils/erroHandler';

type CreateRoomProps = {
  name: string;
  description?: string;
  specialties: { id: string }[];
};

type UpdateRoomProps = {
  description?: string;
  specialties: { id: string }[];
};

export const createRoom = async (props: CreateRoomProps) => {
  try {
    const { data } = await api.post(`/rooms`, props);

    return data as Room;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const deleteRoom = async (id: string) => {
  try {
    const res = await api.delete(`/rooms/${id}`);

    return res.status === 204;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const getRoomById = async (id: string) => {
  try {
    const { data } = await api.get(`/rooms/${id}`);

    return data as Room;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const listRoomBySpecialtyId = async (specialtyId: string) => {
  try {
    const { data } = await api.get(`/rooms/specialty/${specialtyId}`);

    return data as Room[];
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const listRoom = async () => {
  try {
    const { data } = await api.get(`/rooms`);

    return data as Room[];
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const updateRoom = async (id: string, props: UpdateRoomProps) => {
  try {
    const res = await api.put(`/rooms/${id}`, props);

    return res.status === 204;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};
