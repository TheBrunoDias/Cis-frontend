import { ArrowBack } from '@mui/icons-material';
import {
  Autocomplete,
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoadingButton } from '../../../components/LoadingButton';
import { createRoom, getRoomById, updateRoom } from '../../../services/roomService';
import { listSpecialties } from '../../../services/specialtyService';

type FormProps = {
  name: string;
  description?: string;
  enabled: boolean;
  specialties: { id: string; name: string }[];
};

export const RoomNew: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [updateID, setUpdatedId] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [loadingInitialData, setLoadingInitialData] = useState(true);
  const { register, handleSubmit, setValue, getValues } = useForm<FormProps>({
    defaultValues: {
      specialties: [],
      name: '',
      description: '',
      enabled: true,
    },
  });

  const { data: specialties } = useQuery('specialties-select', listSpecialties);

  const getRoom = async (id: string) => {
    try {
      setLoadingInitialData(true);
      const room = await getRoomById(id);
      setValue('name', room.name);
      setValue('enabled', room.enabled);
      setValue('description', room.description ?? undefined);
      setValue('specialties', room.specialties);
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
        const result = await updateRoom(updateID, data);
        if (result) toast.success('Sala Atualizada com Sucesso');
      } else {
        const room = await createRoom(data);
        if (room) toast.success('Sala Cadastrada com sucesso');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setUpdatedId(id);
      getRoom(id);
    } else {
      setUpdatedId(undefined);
      setLoadingInitialData(false);
    }
  }, []);

  return !loadingInitialData ? (
    <>
      <div className="flex justify-start space-x-3 items-center my-5 border-b border-light-darker pb-2">
        <Link to="/painel/salas">
          <IconButton color="primary">
            <ArrowBack />
          </IconButton>
        </Link>
        <Typography variant="h3" className="text-primary-50 font-bold">
          {!updateID ? 'Cadastrar Sala' : 'Atualizar Sala'}
        </Typography>
      </div>

      <form onSubmit={onSubmit} className="max-w-5xl mx-auto">
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12}>
            <TextField required fullWidth label="Nome" placeholder="Nome da Sala" {...register('name')} />
          </Grid>
          <Grid item lg={12} md={12} sm={12}>
            <Autocomplete
              multiple
              options={specialties ?? []}
              getOptionLabel={(option) => option.name}
              defaultValue={getValues('specialties')}
              filterSelectedOptions
              isOptionEqualToValue={({ id }, value) => id === value.id}
              onChange={(_event, value) => {
                setValue('specialties', value);
              }}
              renderInput={(params) => <TextField {...params} label="Especialidades" placeholder="Especialidades" />}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12}>
            <TextField
              multiline
              rows={10}
              fullWidth
              label="Descrição"
              placeholder="Uma breve descrição da Sala"
              {...register('description')}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12}>
            <div>
              <FormControlLabel
                control={<Switch defaultChecked={getValues('enabled')} />}
                label="Habilitada"
                {...register('enabled')}
              />
              <LoadingButton type="submit" loading={loading} variant="contained" className="w-full">
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
