export type User = {
  id: string;
  enabled: boolean;
  username: string;
  role: 'ADMIN' | 'SECRETARY' | 'TECHNICAL_MANAGER' | 'INTERN';
};
