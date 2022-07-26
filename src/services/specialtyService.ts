import { api } from '../utils/api';
import { Specialty } from './../types/specialty';
import { erroHandler } from './../utils/erroHandler';

type CreateSpecialtyProps = {
  enabled?: boolean;
  name: string;
  healthInsurencePrice: number;
  privatePrice: number;
  description?: string;
  color?: string;
};

export const createSpecialty = async (props: CreateSpecialtyProps) => {
  try {
    const { data } = await api.post('/specialties', {
      ...props,
      privatePrice: Number(props.privatePrice),
      healthInsurencePrice: Number(props.healthInsurencePrice),
    });

    return data as Specialty;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const deleteSpecialty = async (id: string) => {
  try {
    const res = await api.delete(`/specialties/${id}`);

    return res.status === 204;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const getSpecialtyById = async (id: string) => {
  try {
    const { data } = await api.get(`/specialties/${id}`);

    return data as Specialty;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const listSpecialties = async () => {
  try {
    const { data } = await api.get(`/specialties/`);

    return data as Specialty[];
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const updateSpecialty = async (id: string, props: CreateSpecialtyProps) => {
  try {
    const res = await api.put(`/specialties/${id}`, {
      ...props,
      privatePrice: Number(props.privatePrice),
      healthInsurencePrice: Number(props.healthInsurencePrice),
    });

    return res.status === 204;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};
