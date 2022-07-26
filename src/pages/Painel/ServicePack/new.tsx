import { ArrowBack } from '@mui/icons-material';
import { Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoadingButton } from '../../../components/LoadingButton';
import { createServicePack, getServicePackById, updateServicePack } from '../../../services/servicePackService';
import { listSpecialties } from '../../../services/specialtyService';

type FormProps = {
  name: string;
  specialtyId: string;
  quantity: number;
  pricePerAppointment: number;
};

export const NewServicePack: React.FC = () => {
  const [updateID, setUpdatedId] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [loadingInitialData, setLoadingInitialData] = useState(true);
  const { register, handleSubmit, setValue, getValues } = useForm<FormProps>();
  const { data: specialties } = useQuery('specialties-select', listSpecialties);

  const [searchParams] = useSearchParams();

  const getServicePack = async (id: string) => {
    try {
      setLoadingInitialData(true);

      const servicePack = await getServicePackById(id);

      setValue('name', servicePack.name);
      setValue('pricePerAppointment', servicePack.pricePerAppointment);
      setValue('quantity', servicePack.quantity);
      setValue('specialtyId', servicePack.specialty.id);
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
        var result = await updateServicePack(updateID, data);
        if (result) toast.success('Pacote Atualizado com Sucesso!');
      } else {
        await createServicePack(data);
        toast.success('Pacote Cadastrado com sucesso!');
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
      getServicePack(id);
    } else {
      setUpdatedId(undefined);
      setLoadingInitialData(false);
    }
  }, []);

  return (
    <>
      <div className="flex justify-start space-x-3 items-center my-5 border-b border-light-darker pb-2">
        <Link to="/painel/pacotes">
          <IconButton color="primary">
            <ArrowBack />
          </IconButton>
        </Link>
        <Typography variant="h3" className="text-primary-50 font-bold">
          {!updateID ? 'Cadastrar Pacote de Consultas' : 'Atualizar Pacote de Consultas'}
        </Typography>
      </div>
      {!loadingInitialData && (
        <form className="max-w-2xl mx-auto" onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField fullWidth label="Nome do Pacote" required {...register('name')} />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                label="Especialidade"
                required
                fullWidth
                select
                defaultValue={getValues('specialtyId')}
                {...register('specialtyId')}
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
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                fullWidth
                label="Quantidade de Consultas"
                type="number"
                inputProps={{ min: 0 }}
                required
                {...register('quantity')}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                fullWidth
                type="number"
                inputProps={{ min: 0, step: 0.01 }}
                label="Preço por Consulta"
                required
                {...register('pricePerAppointment')}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <LoadingButton type="submit" loading={loading} variant="contained" className="w-full">
                Salvar
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
};
