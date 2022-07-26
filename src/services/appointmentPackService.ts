import { api } from '../utils/api';
import { erroHandler } from './../utils/erroHandler';

type CreateAppointmentPackProps = {
  patientId: string;
  servicePackId: string;
  professionalId?: string;
  internsId?: string[];
  dates: Date[];
  type: 'CLINICA_ESCOLA' | 'CLINICA_POPULAR';
  description?: string;
  roomId: string;
};

type AppointmentPack = {
  servicePackId: string;
  appointments: {
    id: string;
    patient: { id: string; name: string; socialName: string | null; document: string; phone: string };
    dateTime: Date;
  }[];
};

export const createAppointmentPack = async (props: CreateAppointmentPackProps) => {
  try {
    const { data } = await api.post(`/appointmentPack`, props);

    return data.total as number;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export const getAppointmentPack = async (id: string) => {
  try {
    const { data } = await api.get(`/appointmentPack/${id}`);

    return data as AppointmentPack;
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};
