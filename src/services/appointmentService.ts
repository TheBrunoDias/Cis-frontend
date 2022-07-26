import { api } from '../utils/api';
import { Appointment } from './../types/appointment';
import { erroHandler } from './../utils/erroHandler';

type CreateAppointmentProps = {
  type: 'CLINICA_ESCOLA' | 'CLINICA_POPULAR';
  status?: 'PAID' | 'AWAITING_PAYMENT' | 'CANCELED';
  patientId: string;
  dateTime: Date;
  description?: string;
  price: number;
  totalPaid: number;
  professionalId?: string;
  internsId?: string[];
  roomId: string;
};

type AppointmentFilterProps = {
  type?: 'CLINICA_ESCOLA' | 'CLINICA_POPULAR';
  status?: 'PAID' | 'AWAITING_PAYMENT' | 'CANCELED';
  dateInit?: Date;
  dateEnd?: Date;
  patientId?: string;
  professionalId?: string;
  internId?: string;
  appointmentPackId?: string;
};

type UpdateAppointmentProps = {
  status?: 'PAID' | 'AWAITING_PAYMENT' | 'CANCELED';
  dateTime: Date;
  description?: string;
  price: number;
  totalPaid: number;
  internsId?: string[];
  roomId: string;
};

export const createAppointment = async (props: CreateAppointmentProps) => {
  try {
    const { data } = await api.post(`/appointments`, props);

    return data as Appointment;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const getAppointment = async (id: string) => {
  try {
    const { data } = await api.get(`/appointments/${id}`);

    return data as Appointment;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const listAppointments = async (params: AppointmentFilterProps) => {
  try {
    const { data } = await api.get(`/appointments`, { params });

    return data as Appointment[];
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const updateAppointment = async (id: string, props: UpdateAppointmentProps) => {
  try {
    const res = await api.put(`/appointments/${id}`, props);

    return res.status === 204;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};
