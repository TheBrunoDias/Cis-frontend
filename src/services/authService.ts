import { api } from '../utils/api';
import { Scope } from './../types/scopes';
import { erroHandler } from './../utils/erroHandler';

type loginProps = {
  username: string;
  password: string;
};

type TokenPayload = {
  id: string;
  role: 'ADMIN' | 'SECRETARY' | 'TECHNICAL_MANAGER' | 'INTERN';
  username: string;
  scopes: Scope[];
};

const login = async (props: loginProps) => {
  try {
    const { data } = await api.post('/auth/signin', props);

    const token = data.token as string;
    const user = data.user as TokenPayload;

    return { token, user };
  } catch (error) {
    const e = erroHandler(error);
    throw new Error(e);
  }
};

export { login };
