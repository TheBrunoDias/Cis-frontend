import { ArrowBack } from '@mui/icons-material';
import { CircularProgress, FormControlLabel, Grid, IconButton, Switch, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoadingButton } from '../../../components/LoadingButton';
import { createSpecialty, getSpecialtyById, updateSpecialty } from '../../../services/specialtyService';

type FormProps = {
  name: string;
  enabled?: boolean;
  healthInsurencePrice: number;
  privatePrice: number;
  description?: string;
  color?: string;
};

export const SpecialtiesNew: React.FC = () => {
  const [updateID, setUpdatedId] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [loadingInitialData, setLoadingInitialData] = useState(false);
  const { register, handleSubmit, setValue, getValues } = useForm<FormProps>({
    defaultValues: { color: '#34eb89', enabled: true },
  });
  const [searchParams] = useSearchParams();

  const getSpecialty = async (id: string) => {
    try {
      setLoadingInitialData(true);
      const specialty = await getSpecialtyById(id);
      setValue('name', specialty.name);
      setValue('color', specialty.color);
      setValue('description', specialty.description ?? undefined);
      setValue('healthInsurencePrice', specialty.healthInsurencePrice);
      setValue('privatePrice', specialty.privatePrice);
      setValue('enabled', specialty.enabled);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingInitialData(false);
    }
  };

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setUpdatedId(id);
      getSpecialty(id);
    } else {
      setUpdatedId(undefined);
    }
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      if (updateID) {
        var result = await updateSpecialty(updateID, data);
        if (result) toast.success('Especialidade atualizada com sucesso!');
      } else {
        await createSpecialty(data);
        toast.success('Especialidade Criada com sucesso!');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  });

  return !loadingInitialData ? (
    <>
      <div className="flex justify-start space-x-3 items-center my-5 border-b border-light-darker pb-2">
        <Link to="/painel/especialidades">
          <IconButton color="primary">
            <ArrowBack />
          </IconButton>
        </Link>
        <Typography variant="h3" className="text-primary-50 font-bold">
          {!updateID ? 'Cadastrar Especialidade' : 'Atualizar Especialidade'}
        </Typography>
      </div>
      <form onSubmit={onSubmit} className="max-w-5xl mx-auto">
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={12}>
            <TextField required fullWidth label="Nome" placeholder="Nome da Especialidade" {...register('name')} />
          </Grid>
          <Grid item lg={6} md={6} sm={12}>
            <TextField
              required
              fullWidth
              label="Cor de Identificação"
              type="color"
              defaultValue="#34eb89"
              {...register('color')}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12}>
            <TextField
              required
              fullWidth
              label="Preço Consulta Particular"
              type="number"
              inputProps={{ min: 0, step: 0.01 }}
              {...register('privatePrice')}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12}>
            <TextField
              required
              fullWidth
              label="Preço Consulta Convênio"
              inputProps={{ min: 0, step: 0.001 }}
              type="number"
              {...register('healthInsurencePrice')}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12}>
            <TextField
              multiline
              rows={10}
              fullWidth
              label="Descrição"
              placeholder="Uma breve descrição da Especialidade"
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
