import { Button, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { ServicesPackTable } from '../../../components/Tables/ServicesPackTable';
import { listServicePack } from '../../../services/servicePackService';

export const ServicePackPage: React.FC = () => {
  const { data: servicesPack } = useQuery('servicesPack', listServicePack);

  return (
    <>
      <div className="flex justify-between items-center my-5 border-b border-light-darker pb-2">
        <Typography variant="h3" className="text-primary-50 font-bold">
          Pacotes de Consultas
        </Typography>
        <Link to="/painel/pacotes/cadastro">
          <Button variant="contained" size="large">
            Cadastrar Novo
          </Button>
        </Link>
      </div>

      {servicesPack && <ServicesPackTable services={servicesPack} />}
    </>
  );
};
