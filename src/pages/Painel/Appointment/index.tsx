import { Search } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { addDays, format, parse } from 'date-fns';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoadingButton } from '../../../components/LoadingButton';
import { AppointmentTable } from '../../../components/Tables/AppointmentsTable';
import { listAppointments } from '../../../services/appointmentService';
import { Appointment } from '../../../types/appointment';

type FilterProps = {
  dateInit?: string;
  dateEnd?: string;
  patientId?: string;
  professionalId?: string;
  internId?: string;
};

export const AppointmentPage: React.FC = () => {
  const { register, handleSubmit } = useForm<FilterProps>({
    defaultValues: {
      dateInit: format(new Date(), 'yyyy-MM-dd'),
      dateEnd: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
    },
  });
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const init = data.dateInit ? parse(data.dateInit, 'yyyy-MM-dd', new Date()) : undefined;
      const end = data.dateEnd ? parse(data.dateEnd, 'yyyy-MM-dd', new Date()) : undefined;

      const result = await listAppointments({ ...data, dateInit: init, dateEnd: end });

      setAppointments(result);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  });

  return (
    <>
      <div className="flex justify-between items-center my-5 border-b border-light-darker pb-2">
        <Typography variant="h3" className="text-primary-50 font-bold">
          Consultas
        </Typography>
        <Link to="/painel/consultas/cadastro">
          <Button variant="contained" size="large">
            Cadastrar Novo
          </Button>
        </Link>
      </div>

      <div className="relative border border-light-main rounded-lg p-5">
        <p className="mb-4">Buscar por Data:</p>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item lg={5}>
              <TextField fullWidth type="date" label="Data Inicio" placeholder="dd/mm/aaaa" {...register('dateInit')} />
            </Grid>
            <Grid item lg={5}>
              <TextField fullWidth type="date" label="Data Fim" placeholder="dd/mm/aaaa" {...register('dateEnd')} />
            </Grid>
            <Grid item lg={2}>
              <LoadingButton loading={loading} type="submit" variant="contained" className="w-full h-full">
                <Search fontSize="large" />
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </div>

      {appointments && <AppointmentTable appointments={appointments} />}
    </>
  );
};
