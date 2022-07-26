export type Room = {
  id: string;
  name: string;
  description: string | null;
  enabled: boolean;
  specialties: {
    id: string;
    name: string;
    color: string;
  }[];
};
