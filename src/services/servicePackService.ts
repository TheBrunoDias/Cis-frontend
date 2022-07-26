import { api } from '../utils/api';
import { ServicePack } from './../types/servicePack';
import { erroHandler } from './../utils/erroHandler';

type CreateServicePackProps = {
  name: string;
  specialtyId: string;
  quantity: number;
  pricePerAppointment: number;
};

export const createServicePack = async (props: CreateServicePackProps) => {
  try {
    const { data } = await api.post(`/servicePack`, {
      ...props,
      quantity: Number(props.quantity),
      pricePerAppointment: Number(props.pricePerAppointment),
    });

    return data as ServicePack;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const deleteServicePack = async (id: string) => {
  try {
    const res = await api.delete(`/servicePack/${id}`);

    return res.status === 204;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const getServicePackById = async (id: string) => {
  try {
    const { data } = await api.get(`/servicePack/${id}`);

    return data as ServicePack;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const listServicePack = async () => {
  try {
    const { data } = await api.get(`/servicePack`);

    return data as ServicePack[];
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const updateServicePack = async (id: string, props: CreateServicePackProps) => {
  try {
    const res = await api.put(`/servicePack/${id}`, {
      ...props,
      quantity: Number(props.quantity),
      pricePerAppointment: Number(props.pricePerAppointment),
    });

    return res.status === 204;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};
