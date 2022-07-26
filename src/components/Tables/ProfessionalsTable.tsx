import { Block, Edit, Info } from '@mui/icons-material';
import { Chip, IconButton } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Professional } from '../../types/professional';
import { Scope } from '../../types/scopes';
import { ProfessionalModal } from '../Modals/ProfessionalModal';
import { SpecialtyModal } from '../Modals/SpecialtyModal';

type ProfessionalTableProps = {
  professionals: Professional[];
};

export const ProfessionalTable: React.FC<ProfessionalTableProps> = ({ professionals }) => {
  const [userCanEdit, setUserCanEdit] = useState(false);
  const { getAuthUser } = useAuth();

  useEffect(() => {
    const user = getAuthUser();
    if (user) {
      if (user.scopes.includes(Scope.update_professional)) setUserCanEdit(true);
    }
  }, []);

  const cols: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome',
      flex: 1,
    },
    {
      field: 'info',
      headerName: 'Informações',
      width: 200,
      renderCell: (r) => (
        <>
          <ProfessionalModal professional={r.row} iconBtn={<Info color="info" />} />
        </>
      ),
    },
    {
      field: 'professionalDocument',
      headerName: 'Nº Doc. Profissional',
      width: 300,
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
            <Link to={`/painel/profissionais/cadastro?id=${r.row.id}`}>
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

  const rows: GridRowsProp = professionals;

  return (
    <>
      <div className="w-full h-[600px] border border-light-main rounded-lg p-5">
        <DataGrid rows={rows} columns={cols} />
      </div>
    </>
  );
};
