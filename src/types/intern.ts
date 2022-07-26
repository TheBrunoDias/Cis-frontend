export type Intern = {
  id: string;
  enabled: boolean;
  name: string;
  studentId: string;
  email: string;
  phone: string;
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
