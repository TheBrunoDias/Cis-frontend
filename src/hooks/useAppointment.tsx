import { useContext } from 'react';
import { AppointmentContext } from '../pages/Painel/Appointment/new';

export const useAppointment = () => useContext(AppointmentContext);
