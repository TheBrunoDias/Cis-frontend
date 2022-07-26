export type Professional = {
  id: string;
  name: string;
  phone: string;
  email: string;
  professionalDocument: string;
  specialty: {
    id: string;
    name: string;
    color: string;
  };
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];
};
