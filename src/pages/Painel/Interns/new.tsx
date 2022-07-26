import { ArrowBack } from '@mui/icons-material';
import { Chip, CircularProgress, Grid, IconButton, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoadingButton } from '../../../components/LoadingButton';
import { createIntern, getIntern, updateIntern } from '../../../services/internService';
import { listSpecialties } from '../../../services/specialtyService';

type FormProps = {
  name: string;
  studentId: string;
  email: string;
  phone: string;
  specialty: {
    id: string;
  };
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];
};

export const InternNew: React.FC = () => {
  const [updateID, setUpdatedId] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [loadingInitialData, setLoadingInitialData] = useState(true);

  const { register, handleSubmit, setValue, getValues, watch } = useForm<FormProps>({
    defaultValues: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
      specialty: {
        id: '0',
      },
    },
  });
  const [searchParams] = useSearchParams();

  const { data: specialties } = useQuery('specialties-select', listSpecialties);

  const queryIntern = async (id: string) => {
    try {
      const intern = await getIntern(id);

      setValue('name', intern.name);
      setValue('studentId', intern.studentId);
      setValue('email', intern.email);
      setValue('phone', intern.phone);
      setValue('specialty.id', intern.specialty.id);
      setValue('monday', intern.monday);
      setValue('tuesday', intern.tuesday);
      setValue('wednesday', intern.wednesday);
      setValue('thursday', intern.thursday);
      setValue('saturday', intern.saturday);
      setValue('friday', intern.friday);
      setValue('sunday', intern.sunday);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingInitialData(false);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      if (updateID) {
        await updateIntern(updateID, data);
        toast.success('Estagiário Atualizado com Sucesso');
      } else {
        const created = await createIntern(data);
        console.log(created);
        toast.success('Estagiário Cadastrado com Sucesso');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  });

  const handleDayHour = (
    day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday',
    hour: string
  ) => {
    var values = getValues(day);

    var index = values.indexOf(hour);

    if (index === -1) {
      values.push(hour);
    } else {
      values.splice(index, 1);
    }
    setValue(day, values);
  };

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setUpdatedId(id);
      queryIntern(id);
    } else {
      setUpdatedId(undefined);
      setLoadingInitialData(false);
    }
  }, []);

  return !loadingInitialData ? (
    <>
      <div className="flex justify-start space-x-3 items-center my-5 border-b border-light-darker pb-2 w-full">
        <Link to="/painel/estagiarios">
          <IconButton color="primary">
            <ArrowBack />
          </IconButton>
        </Link>
        <Typography variant="h3" className="text-primary-50 font-bold">
          {!updateID ? 'Cadastrar Estagiário' : 'Atualizar Estagiário'}
        </Typography>
      </div>
      <form className="flex justify-center items-start space-x-2" onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField fullWidth label="Nome" placeholder="Nome do estagiário" required {...register('name')} />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              placeholder="Email do estagiário"
              required
              {...register('email')}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <TextField
              fullWidth
              label="ID Estudante (RA)"
              placeholder="ID Estudante (RA)"
              required
              {...register('studentId')}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <TextField fullWidth label="Telefone" placeholder="Telefone" required {...register('phone')} />
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <TextField
              label="Especialidade"
              required
              fullWidth
              select
              defaultValue={getValues('specialty.id')}
              {...register('specialty.id')}
            >
              <MenuItem disabled value="0">
                Selecione uma especialidade
              </MenuItem>
              {specialties &&
                specialties.map((specialty) => (
                  <MenuItem key={specialty.id} value={specialty.id}>
                    {specialty.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <div className="w-full mx-auto">
              <div className="border-b border-light-darker my-5 pb-3 w-full">
                <Typography variant="h5" className="text-primary-50 font-bold">
                  Horários Disponíveis para consulta{' '}
                </Typography>
              </div>
              <Stack spacing={2} className="mx-auto mb-10 w-full flex">
                {days.map((day) => (
                  <div key={day.id} className="w-full my-2 mx-auto flex justify-center items-start flex-wrap">
                    <div className="my-1 min-w-[200px]">{day.title}</div>
                    {hours.map((hour) => (
                      <Chip
                        key={hour}
                        sx={{ mx: 1, border: '1px solid', borderColor: 'secondary.main' }}
                        variant={watch(day.id).includes(hour) ? 'filled' : 'outlined'}
                        color="secondary"
                        label={hour}
                        onClick={() => handleDayHour(day.id, hour)}
                      />
                    ))}
                  </div>
                ))}
              </Stack>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="flex justify-center items-center">
              <LoadingButton loading={loading} variant="contained" type="submit" sx={{ width: '300px', mx: 'auto' }}>
                Salvar
              </LoadingButton>
            </div>
          </Grid>
        </Grid>
      </form>
    </>
  ) : (
    <div className="flex justify-center items-center">
      <CircularProgress />
    </div>
  );
};

const days: {
  id: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  title: string;
}[] = [
  {
    id: 'monday',
    title: 'Segunda-Feira',
  },
  {
    id: 'tuesday',
    title: 'Terça-Feira',
  },
  {
    id: 'wednesday',
    title: 'Quarta-Feira',
  },
  {
    id: 'thursday',
    title: 'Quinta-Feira',
  },
  {
    id: 'friday',
    title: 'Sexta-Feira',
  },
  {
    id: 'saturday',
    title: 'Sabado',
  },
  {
    id: 'sunday',
    title: 'Domingo',
  },
];

const hours = [
  '8:00',
  '9:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
];
