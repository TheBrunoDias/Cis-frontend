import { addHours } from 'date-fns';
import cookies from 'js-cookie';
import { createContext } from 'react';
import { login } from '../services/authService';
import { Scope } from '../types/scopes';

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContextProps = {
  handleLogin: (props: LoginProps) => Promise<boolean>;
  getAuthUser: () => UserProps | undefined;
  handleSignOut: () => void;
};

type LoginProps = {
  username: string;
  password: string;
};

type UserProps = {
  id: string;
  role: 'ADMIN' | 'SECRETARY' | 'TECHNICAL_MANAGER' | 'INTERN';
  username: string;
  scopes: Scope[];
};

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const handleLogin = async (props: LoginProps) => {
    try {
      const { token, user } = await login(props);
      cookies.set('cis.token', token, {
        path: '/',
        expires: addHours(Date.now(), 8),
      });

      cookies.set('cis.user', JSON.stringify(user), {
        path: '/',
        expires: addHours(Date.now(), 8),
      });
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getAuthUser = () => {
    const u = cookies.get('cis.user');

    if (u) {
      const json = JSON.parse(u) as UserProps;

      return json;
    }
  };

  const handleSignOut = () => {
    cookies.remove('cis.token');
    cookies.remove('cis.user');

    window.location.replace('/');
    return;
  };

  return (
    <>
      <AuthContext.Provider value={{ handleLogin, getAuthUser, handleSignOut }}>{children}</AuthContext.Provider>
    </>
  );
};

export { AuthContext, AuthProvider };
