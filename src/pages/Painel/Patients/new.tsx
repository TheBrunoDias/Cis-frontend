import { ArrowBack } from '@mui/icons-material';
import {
  Autocomplete,
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoadingButton } from '../../../components/LoadingButton';
import { createPatient, getPatient, updatePatient } from '../../../services/patientService';
import { listProfessionals } from '../../../services/professionalService';
import { Professional } from '../../../types/professional';

type FormProps = {
  name: string;
  socialName?: string;
  enabled: boolean;
  document: string;
  documentType: 'CPF' | 'RG' | 'RNA' | 'CNH';
  email?: string;
  phone: string;
  disability: boolean;
  disabilityDescription?: string;
  address: string;
  description?: string;
  professional?: {
    id: string;
    name: string;
  };
};

export const PatientNew: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [updateID, setUpdatedId] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [loadingInitialData, setLoadingInitialData] = useState(true);
  const [professionalsFilter, setProfessionalsFilter] = useState<Professional[]>([]);

  const { register, handleSubmit, setValue, getValues, watch } = useForm<FormProps>({
    defaultValues: {
      name: '',
      socialName: '',
      document: '',
      documentType: 'CPF',
      email: '',
      phone: '',
      disability: false,
      disabilityDescription: '',
      address: '',
      description: '',
      professional: undefined,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      if (updateID) {
        await updatePatient(updateID, data);
        toast.success('Paciente Atualizado com Sucesso');
      } else {
        const created = await createPatient(data);
        console.log(created);
        toast.success('Paciente Cadastrado com Sucesso');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  });

  const handleFilterProfessionals = async (value: string) => {
    try {
      setLoadingFilter(true);

      const professionals = await listProfessionals({ name: value });
      setProfessionalsFilter(professionals);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingFilter(false);
    }
  };

  const queryPatient = async (id: string) => {
    try {
      setLoadingInitialData(true);
      const patient = await getPatient(id);

      setValue('address', patient.address);
      setValue('description', patient.description ?? undefined);
      setValue('disability', patient.disability);
      setValue('enabled', patient.enabled);
      setValue('disabilityDescription', patient.disabilityDescription ?? undefined);
      setValue('document', patient.document);
      setValue('documentType', patient.documentType);
      setValue('email', patient.email ?? undefined);
      setValue('name', patient.name);
      setValue('socialName', patient.socialName ?? undefined);
      setValue('phone', patient.phone);
      setValue('professional', patient.professional ?? undefined);
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
      queryPatient(id);
    } else {
      setUpdatedId(undefined);
      setLoadingInitialData(false);
    }
  }, []);

  return !loadingInitialData ? (
    <>
      <div className="flex justify-start space-x-3 items-center my-5 border-b border-light-darker pb-2 w-full">
        <Link to="/painel/pacientes">
          <IconButton color="primary">
            <ArrowBack />
          </IconButton>
        </Link>
        <Typography variant="h3" className="text-primary-50 font-bold">
          {!updateID ? 'Cadastrar Paciente' : 'Atualizar Paciente'}
        </Typography>
      </div>
      <form className="flex justify-center items-start space-x-2 max-w-4xl mx-auto" onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField fullWidth label="Nome" placeholder="Nome do Paciente" required {...register('name')} />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              fullWidth
              label="Nome Social"
              placeholder="Nome Social do Paciente"
              {...register('socialName')}
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField fullWidth label="Email" type="email" placeholder="Email do Paciente" {...register('email')} />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField fullWidth label="Telefone" placeholder="Telefone do Paciente" required {...register('phone')} />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              select
              defaultValue="CPF"
              required
              label="Tipo Documento"
              fullWidth
              {...register('documentType')}
            >
              <MenuItem value="CPF">CPF</MenuItem>
              <MenuItem value="RG">RG</MenuItem>
              <MenuItem value="CNH">CNH</MenuItem>
              <MenuItem value="RNA">RNA</MenuItem>
            </TextField>
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              fullWidth
              label="Nº Documento"
              placeholder="Documento do Paciente"
              required
              {...register('document')}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              fullWidth
              label="Endereço"
              placeholder="Cidade, Bairro, Rua, Número, CEP"
              required
              {...register('address')}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField multiline rows={6} fullWidth label="Descrição" {...register('description')} />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormControlLabel
              control={<Switch defaultChecked={getValues('disability')} />}
              label="Deficiência"
              {...register('disability')}
            />
            <TextField
              multiline
              rows={6}
              fullWidth
              label="Descrição da Deficiência"
              {...register('disabilityDescription')}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Autocomplete
              sx={{ width: '100%' }}
              fullWidth
              isOptionEqualToValue={(option, value) => option.name === value.name}
              getOptionLabel={(option) => option.name}
              onInputChange={(_event, value) => {
                if (value.trim() !== '') handleFilterProfessionals(value);
              }}
              options={professionalsFilter}
              loading={loadingFilter}
              {...register('professional')}
              defaultValue={getValues('professional')}
              onChange={(_event, value) => (value ? setValue('professional', value) : undefined)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Profissional vinculado"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loadingFilter ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
            <FormControlLabel
              control={<Switch defaultChecked={getValues('enabled')} />}
              label="Habilitado"
              {...register('enabled')}
            />
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
