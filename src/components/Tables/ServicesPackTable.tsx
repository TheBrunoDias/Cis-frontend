import { Block, Edit } from '@mui/icons-material';
import { Chip, IconButton } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Scope } from '../../types/scopes';
import { ServicePack } from '../../types/servicePack';
import { SpecialtyModal } from '../Modals/SpecialtyModal';

type ServicePackTableProps = {
  services: ServicePack[];
};

export const ServicesPackTable: React.FC<ServicePackTableProps> = ({ services }) => {
  const [userCanEdit, setUserCanEdit] = useState(false);
  const { getAuthUser } = useAuth();

  useEffect(() => {
    const user = getAuthUser();
    if (user) {
      if (user.scopes.includes(Scope.update_service_pack)) setUserCanEdit(true);
    }
  }, []);

  const cols: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome',
      flex: 1,
    },
    {
      field: 'quantity',
      headerName: 'Quantidade',
      flex: 1,
    },
    {
      field: 'pricePerAppointment',
      headerName: 'Preço por consulta',
      flex: 1,
      renderCell: (r) => (
        <span>
          {new Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency' }).format(r.row.pricePerAppointment)}
        </span>
      ),
    },
    {
      field: 'specialty',
      headerName: 'Especialidade',
      renderCell: (r) => (
        <>
          <SpecialtyModal
            id={r.row.specialty.id}
            iconBtn={
              <Chip
                onClick={() => {}}
                label={r.row.specialty.name}
                variant="filled"
                sx={{ bgcolor: r.row.specialty.color, fontWeight: 500, color: '#fff' }}
              />
            }
          />
        </>
      ),
      width: 200,
    },
    {
      field: 'edit',
      headerName: 'Editar',
      sortable: false,
      renderCell: (r) => (
        <>
          {userCanEdit ? (
            <Link to={`/painel/pacotes/cadastro?id=${r.row.id}`}>
              <IconButton>
                <Edit />
              </IconButton>
            </Link>
          ) : (
            <IconButton disabled>
              <Block />
            </IconButton>
          )}
        </>
      ),
      width: 100,
    },
  ];

  const rows: GridRowsProp = services;

  return (
    <>
      <div className="w-full h-[600px] border border-light-main rounded-lg p-5">
        <DataGrid rows={rows} columns={cols} />
      </div>
    </>
  );
};
