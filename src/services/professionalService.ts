import { api } from '../utils/api';
import { Professional } from './../types/professional';
import { erroHandler } from './../utils/erroHandler';

type CreateProfessionalProps = {
  name: string;
  email: string;
  phone: string;
  professionalDocument: string;
  specialty: {
    id: string;
  };
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];
};

type ProfessionalFilterProps = {
  name?: string;
  specialtyId?: string;
  email?: string;
  phone?: string;
};

type UpdateProfessionalProps = {
  enabled?: boolean;
  phone: string;
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];
};

export const createProfessional = async (props: CreateProfessionalProps) => {
  try {
    const { data } = await api.post(`/professionals`, props);

    return data as Professional;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const deleteProfessional = async (id: string) => {
  try {
    const res = await api.delete(`/professionals/${id}`);

    return res.status === 204;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const getProfessional = async (id: string) => {
  try {
    const { data } = await api.get(`/professionals/${id}`);

    return data as Professional;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const listProfessionals = async (params: ProfessionalFilterProps) => {
  try {
    const { data } = await api.get(`/professionals`, {
      params: { ...params },
    });

    return data as Professional[];
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const updateProfessional = async (id: string, props: UpdateProfessionalProps) => {
  try {
    const res = await api.put(`/professionals/${id}`, props);

    return res.status === 204;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};
