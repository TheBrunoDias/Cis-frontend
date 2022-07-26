export type Appointment = {
  id: string;
  type: 'CLINICA_ESCOLA' | 'CLINICA_POPULAR';
  status: 'PAID' | 'AWAITING_PAYMENT' | 'CANCELED';
  patient: {
    id: string;
    name: string;
    socialName: string | null;
    document: string;
    phone: string;
  };
  dateTime: Date;
  description: string | null;
  price: number;
  totalPaid: number;
  professional: {
    id: string;
    name: string;
  } | null;
  interns:
    | {
        id: string;
        name: string;
        studentId: string;
      }[]
    | null;
  appointmentPackId: string | null;
  roomId: string;
};
