import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import logo from '../../assets/images/logo.png';
import { LoadingButton } from '../../components/LoadingButton';
import { useAuth } from '../../hooks/useAuth';

type FormProps = {
  username: string;
  password: string;
};

export const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { handleLogin, getAuthUser } = useAuth();
  const { register, handleSubmit } = useForm<FormProps>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      const result = await handleLogin(data);

      if (result) {
        window.location.replace('/painel');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    const user = getAuthUser();

    if (user) {
      window.location.replace('/painel');
    }
  }, []);

  return (
    <main className="h-screen flex justify-center items-center ">
      <div className="border rounded-lg px-5 py-20 shadow-md space-y-5 flex justify-center items-stretch flex-col w-screen max-w-[500px]">
        <img src={logo} alt="Cis" className="object-contain w-1/2 mx-auto" />
        <form onSubmit={onSubmit} className="flex justify-start items-stretch flex-col w-full space-y-3">
          <TextField label="Username" required fullWidth {...register('username')} />
          <TextField type="password" label="Senha" required fullWidth {...register('password')} />
          <LoadingButton loading={loading} type="submit" variant="contained">
            Entrar
          </LoadingButton>
        </form>
      </div>
    </main>
  );
};
