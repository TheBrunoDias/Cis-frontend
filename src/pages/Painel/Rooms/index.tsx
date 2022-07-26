import { Button, CircularProgress, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { RoomsTable } from '../../../components/Tables/RoomTable';
import { listRoom } from '../../../services/roomService';

export const RoomsPage: React.FC = () => {
  const { data: rooms, isFetching } = useQuery('rooms', listRoom);

  return (
    <>
      <div className="flex justify-between items-center my-5 border-b border-light-darker pb-2">
        <Typography variant="h3" className="text-primary-50 font-bold">
          Salas
        </Typography>
        <Link to="/painel/salas/cadastro">
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

      {rooms && <RoomsTable rooms={rooms} />}
    </>
  );
};
