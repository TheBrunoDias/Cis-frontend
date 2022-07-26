import { Search } from '@mui/icons-material';
import {
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoadingButton } from '../../../components/LoadingButton';
import { ProfessionalTable } from '../../../components/Tables/ProfessionalsTable';
import { listProfessionals } from '../../../services/professionalService';
import { listSpecialties } from '../../../services/specialtyService';
import { Professional } from '../../../types/professional';

type FormProps = {
  filter: string;
  value: string;
  specialty?: string;
};

export const ProfessionalsPage: React.FC = () => {
  const { register, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      filter: 'name',
      value: '',
      specialty: '0',
    },
  });
  const [loading, setLoading] = useState(false);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const { data: specialties, isFetching } = useQuery('specialties-select', listSpecialties);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      if (!data.value && (!data.specialty || data.specialty === '0')) {
        toast.warning('Infome um valor de busca ou uma especialidade');
        return;
      }
      if (data.value && !data.filter) {
        toast.warning('Selecione a opção de busca');
        return;
      }
      const result = await listProfessionals({
        [data.filter]: data.value,
        specialtyId: data.specialty ?? undefined,
      });
      setProfessionals(result);
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
          Profissionais
        </Typography>
        <Link to="/painel/profissionais/cadastro">
          <Button variant="contained" size="large">
            Cadastrar Novo
          </Button>
        </Link>
      </div>
      <div className="relative border border-light-main rounded-lg p-5">
        <form onSubmit={onSubmit}>
          <FormLabel id="intern-search-filter">Buscar profissionais por: </FormLabel>
          <RadioGroup row aria-labelledby="intern-search-filter" defaultValue={'name'}>
            <FormControlLabel value="name" control={<Radio />} label="Nome" {...register('filter')} />
            <FormControlLabel value="email" control={<Radio />} label="Email" {...register('filter')} />
            <FormControlLabel value="phone" control={<Radio />} label="Telefone" {...register('filter')} />
          </RadioGroup>

          <Grid container spacing={2}>
            <Grid item lg={5}>
              <TextField placeholder="Valor da busca" fullWidth {...register('value')} />
            </Grid>
            <Grid item lg={5}>
              <TextField label="Especialidade" fullWidth defaultValue={'0'} select {...register('specialty')}>
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
            <Grid item lg={2}>
              <LoadingButton loading={loading} type="submit" variant="contained" className="w-full h-full">
                <Search fontSize="large" />
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </div>

      {professionals && <ProfessionalTable professionals={professionals} />}
    </>
  );
};
