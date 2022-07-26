export type Patient = {
  id: string;
  enabled: boolean;
  name: string;
  socialName: string | null;
  document: string;
  documentType: 'CPF' | 'RG' | 'RNA' | 'CNH';
  email: string | null;
  phone: string;
  address: string;
  disability: boolean;
  disabilityDescription: string | null;
  description: string | null;
  professional: {
    id: string;
    name: string;
  } | null;
};
