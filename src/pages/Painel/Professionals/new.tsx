import { ArrowBack } from '@mui/icons-material';
import { Chip, CircularProgress, Grid, IconButton, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoadingButton } from '../../../components/LoadingButton';
import { createProfessional, getProfessional, updateProfessional } from '../../../services/professionalService';
import { listSpecialties } from '../../../services/specialtyService';

type FormProps = {
  name: string;
  email: string;
  phone: string;
  professionalDocument: string;
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

export const ProfessionalNew: React.FC = () => {
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

  const queryProfessional = async (id: string) => {
    try {
      const professional = await getProfessional(id);

      setValue('name', professional.name);
      setValue('professionalDocument', professional.professionalDocument);
      setValue('email', professional.email);
      setValue('phone', professional.phone);
      setValue('specialty.id', professional.specialty.id);
      setValue('monday', professional.monday);
      setValue('tuesday', professional.tuesday);
      setValue('wednesday', professional.wednesday);
      setValue('thursday', professional.thursday);
      setValue('saturday', professional.saturday);
      setValue('friday', professional.friday);
      setValue('sunday', professional.sunday);
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
        await updateProfessional(updateID, data);
      } else {
        const created = await createProfessional(data);
        console.log(created);
        toast.success('Profissional Cadastrado com Sucesso');
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
      queryProfessional(id);
    } else {
      setUpdatedId(undefined);
      setLoadingInitialData(false);
    }
  }, []);

  return !loadingInitialData ? (
    <>
      <form className="flex justify-center items-start space-x-2" onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <div className="flex justify-start space-x-3 items-center my-5 border-b border-light-darker pb-2 w-full">
            <Link to="/painel/profissionais">
              <IconButton color="primary">
                <ArrowBack />
              </IconButton>
            </Link>
            <Typography variant="h3" className="text-primary-50 font-bold">
              {!updateID ? 'Cadastrar Profissional' : 'Atualizar Profissional'}
            </Typography>
          </div>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField fullWidth label="Nome" placeholder="Nome do Profissional" required {...register('name')} />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              placeholder="Email do Profissional"
              required
              {...register('email')}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <TextField
              fullWidth
              label="Doc Profissional"
              placeholder="Doc Profissional"
              required
              {...register('professionalDocument')}
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
