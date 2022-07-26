import { Edit } from '@mui/icons-material';
import { Chip, IconButton } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Room } from '../../types/room';
import { SpecialtyModal } from '../Modals/SpecialtyModal';

type RoomsTableProps = {
  rooms: Room[];
};

export const RoomsTable: React.FC<RoomsTableProps> = ({ rooms }) => {
  const cols: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome',
      flex: 1,
    },
    {
      field: 'enabled',
      headerName: 'Status',
      headerAlign: 'center',
      sortable: false,
      align: 'center',
      renderCell: (r) => (
        <>
          <span className={`rounded-lg text-white p-2 ${r.row.enabled ? 'bg-green-400' : 'bg-red-400'}`}>
            {r.row.enabled ? 'Habilitado' : 'Desabilitado'}
          </span>
        </>
      ),
      width: 150,
    },
    {
      field: 'specialty',
      headerName: 'Especialidade',
      sortable: false,
      renderCell: (r) => (
        <div className="flex justify-start items-center flex-wrap gap-1 max-h-full overflow-auto">
          {r.row.specialties.map((specialty: any) => (
            <SpecialtyModal
              id={specialty.id}
              key={specialty.id}
              iconBtn={
                <Chip
                  label={specialty.name}
                  variant="filled"
                  onClick={() => {}}
                  sx={{ bgcolor: specialty.color, fontWeight: 500, color: '#fff' }}
                />
              }
            />
          ))}
        </div>
      ),
      flex: 1,
    },
    {
      field: 'edit',
      headerName: 'Editar',
      headerAlign: 'center',
      sortable: false,
      align: 'center',
      renderCell: (r) => (
        <Link to={`/painel/salas/cadastro?id=${r.row.id}`}>
          <IconButton>
            <Edit />
          </IconButton>
        </Link>
      ),
      width: 100,
    },
  ];

  const rows: GridRowsProp = rooms;
  return (
    <>
      <div className="w-full h-[600px] border border-light-main rounded-lg p-5">
        <DataGrid rows={rows} columns={cols} getRowHeight={(params) => params.densityFactor * 200} />
      </div>
    </>
  );
};
