import { Button, CircularProgress, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { SpecialtiesTable } from '../../../components/Tables/SpecialtiesTable';
import { listSpecialties } from '../../../services/specialtyService';

export const SpecialtiesPage: React.FC = () => {
  const { data: specialties, isFetching } = useQuery('specialties', listSpecialties);

  return (
    <>
      <div className="flex justify-between items-center my-5 border-b border-light-darker pb-2">
        <Typography variant="h3" className="text-primary-50 font-bold">
          Especialidade
        </Typography>
        <Link to="/painel/especialidades/cadastro">
          <Button variant="contained" size="large">
            Cadastrar Novo
          </Button>
        </Link>
      </div>

      {isFetching && (
        <div className="w-full h-full flex justify-center items-center">
          <CircularProgress />
        </div>
      )}

      {specialties && <SpecialtiesTable specialties={specialties} />}
    </>
  );
};
