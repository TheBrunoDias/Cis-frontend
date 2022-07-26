import { Search } from '@mui/icons-material';
import { Button, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoadingButton } from '../../../components/LoadingButton';
import { PatientTable } from '../../../components/Tables/PatientTable';
import { listPatients } from '../../../services/patientService';
import { Patient } from '../../../types/patient';

type FormProps = {
  filter: string;
  value: string;
};

export const PatientsPage: React.FC = () => {
  const { register, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      filter: 'name',
      value: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      if (!data.value) {
        toast.warning('Infome um valor de busca');
        return;
      }
      const result = await listPatients({
        [data.filter]: data.value,
      });
      setPatients(result);
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
          Pacientes
        </Typography>
        <Link to="/painel/pacientes/cadastro">
          <Button variant="contained" size="large">
            Cadastrar Novo
          </Button>
        </Link>
      </div>

      <div className="relative border border-light-main rounded-lg p-5">
        <form onSubmit={onSubmit}>
          <FormLabel id="intern-search-filter">Buscar pacientes por: </FormLabel>
          <RadioGroup row aria-labelledby="intern-search-filter" defaultValue={'name'}>
            <FormControlLabel value="name" control={<Radio />} label="Nome" {...register('filter')} />
            <FormControlLabel value="socialName" control={<Radio />} label="Nome Social" {...register('filter')} />
            <FormControlLabel value="email" control={<Radio />} label="Email" {...register('filter')} />
            <FormControlLabel value="document" control={<Radio />} label="Nº Documento" {...register('filter')} />
            <FormControlLabel value="phone" control={<Radio />} label="Telefone" {...register('filter')} />
          </RadioGroup>

          <Grid container spacing={2}>
            <Grid item lg={10}>
              <TextField placeholder="Valor da busca" fullWidth {...register('value')} required />
            </Grid>
            <Grid item lg={2}>
              <LoadingButton loading={loading} type="submit" variant="contained" className="w-full h-full">
                <Search fontSize="large" />
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </div>

      {patients && <PatientTable patients={patients} />}
    </>
  );
};
