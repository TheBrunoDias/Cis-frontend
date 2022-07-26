export type ServicePack = {
  id: string;
  name: string;
  enabled: boolean;
  specialty: {
    id: string;
    name: string;
    color: string;
  };
  quantity: number;
  pricePerAppointment: number;
};
