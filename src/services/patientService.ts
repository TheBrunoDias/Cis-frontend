import { api } from '../utils/api';
import { Patient } from './../types/patient';
import { erroHandler } from './../utils/erroHandler';

type CreatePatientProps = {
  name: string;
  socialName?: string;
  document: string;
  enabled: boolean;
  documentType: 'CPF' | 'RG' | 'RNA' | 'CNH';
  email?: string;
  phone: string;
  disability: boolean;
  disabilityDescription?: string;
  address: string;
  description?: string;
  professional?: {
    id: string;
    name: string;
  };
};

type PatientFilterProps = {
  name?: string;
  socialName?: string;
  email?: string;
  document?: string;
  phone?: string;
};

export const createPatient = async (props: CreatePatientProps) => {
  try {
    const { data } = await api.post(`/patients`, props);

    return data as Patient;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const deletePatient = async (id: string) => {
  try {
    const res = await api.delete(`/patients/${id}`);

    return res.status === 204;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const getPatient = async (id: string) => {
  try {
    const { data } = await api.get(`/patients/${id}`);
    return data as Patient;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const listPatients = async (params: PatientFilterProps) => {
  try {
    const { data } = await api.get(`/patients`, { params: { ...params } });
    return data as Patient[];
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const updatePatient = async (id: string, props: CreatePatientProps) => {
  try {
    const res = await api.put(`/patients/${id}`, props);
    return res.status === 204;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};
