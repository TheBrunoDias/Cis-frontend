import { Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Specialty } from '../../types/specialty';

type SpecialtiesTableProps = {
  specialties: Specialty[];
};

export const SpecialtiesTable: React.FC<SpecialtiesTableProps> = ({ specialties }) => {
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
      field: 'healthInsurencePrice',
      headerName: 'Preço Convênio',
      renderCell: (r) => (
        <>{new Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency' }).format(r.row.healthInsurencePrice)}</>
      ),
      width: 150,
    },
    {
      field: 'privatePrice',
      headerName: 'Preço Particular',
      renderCell: (r) => (
        <>{new Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency' }).format(r.row.privatePrice)}</>
      ),
      width: 150,
    },
    {
      field: 'color',
      headerName: 'Cor',
      headerAlign: 'center',
      sortable: false,
      align: 'center',
      renderCell: (r) => (
        <>
          <div style={{ backgroundColor: r.row.color }} className="w-5 h-5 rounded-full" />
        </>
      ),
      width: 100,
    },
    {
      field: 'edit',
      headerName: 'Editar',
      headerAlign: 'center',
      sortable: false,
      align: 'center',
      renderCell: (r) => (
        <Link to={`/painel/especialidades/cadastro?id=${r.row.id}`}>
          <IconButton>
            <Edit />
          </IconButton>
        </Link>
      ),
      width: 100,
    },
  ];

  const rows: GridRowsProp = specialties;

  return (
    <>
      <div className="w-full h-[600px] border border-light-main rounded-lg p-5">
        <DataGrid rows={rows} columns={cols} />
      </div>
    </>
  );
};
