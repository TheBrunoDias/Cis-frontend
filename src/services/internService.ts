import { api } from '../utils/api';
import { Intern } from './../types/intern';
import { erroHandler } from './../utils/erroHandler';

type CreateInternProps = {
  name: string;
  studentId: string;
  email: string;
  phone: string;
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

type UpdateInternProps = {
  name: string;
  studentId: string;
  email: string;
  phone: string;
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

type InternFilterProps = {
  name?: string;
  studentId?: string;
  email?: string;
  phone?: string;
  specialtyId?: string;
};

export const createIntern = async (props: CreateInternProps) => {
  try {
    const { data } = await api.post(`/interns`, props);

    return data as Intern;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const deleteIntern = async (id: string) => {
  try {
    const res = await api.delete(`/interns/${id}`);

    return res.status === 204;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const getIntern = async (id: string) => {
  try {
    const { data } = await api.get(`/interns/${id}`);
    return data as Intern;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const listInterns = async (params: InternFilterProps) => {
  try {
    const { data } = await api.get(`/interns`, { params: { ...params } });
    return data as Intern[];
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const updateIntern = async (id: string, props: UpdateInternProps) => {
  try {
    const res = await api.put(`/interns/${id}`, props);
    return res.status === 204;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};
