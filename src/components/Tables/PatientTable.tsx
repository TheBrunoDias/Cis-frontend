import { Block, Edit, Info } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Patient } from '../../types/patient';
import { Scope } from '../../types/scopes';
import { PatientModal } from '../Modals/PatientModal';

type PatientTableProps = {
  patients: Patient[];
};

export const PatientTable: React.FC<PatientTableProps> = ({ patients }) => {
  const [userCanEdit, setUserCanEdit] = useState(false);
  const { getAuthUser } = useAuth();

  useEffect(() => {
    const user = getAuthUser();
    if (user) {
      if (user.scopes.includes(Scope.update_intern)) setUserCanEdit(true);
    }
  }, []);

  const cols: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome',
      flex: 1,
    },
    {
      field: 'document',
      headerName: 'Documento',
      flex: 1,
    },
    {
      field: 'phone',
      headerName: 'Telefone',
      flex: 1,
    },
    {
      field: 'info',
      headerName: 'Informações',
      width: 200,
      renderCell: (r) => (
        <>
          <PatientModal patient={r.row} iconBtn={<Info color="info" />} />
        </>
      ),
    },
    {
      field: 'edit',
      headerName: 'Editar',
      sortable: false,
      renderCell: (r) => (
        <>
          {userCanEdit ? (
            <Link to={`/painel/pacientes/cadastro?id=${r.row.id}`}>
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

  const rows: GridRowsProp = patients;

  return (
    <>
      <div className="w-full h-[600px] border border-light-main rounded-lg p-5">
        <DataGrid rows={rows} columns={cols} />
      </div>
    </>
  );
};
