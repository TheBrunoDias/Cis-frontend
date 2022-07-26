import { Info } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Appointment } from '../../types/appointment';
import { AppointmentModal } from '../Modals/AppointmentModal';

type AppointmentTableProps = {
  appointments: Appointment[];
};

export const AppointmentTable: React.FC<AppointmentTableProps> = ({ appointments }) => {
  const cols: GridColDef[] = [
    {
      field: 'pacient',
      headerName: 'Paciente',
      renderCell: (r) => <>{r.row.patient.name}</>,
      flex: 1,
    },
    {
      field: 'date',
      headerName: 'Data',
      renderCell: (r) => <>{new Date(r.row.dateTime).toLocaleString() ?? ''}</>,
      flex: 1,
    },
    {
      field: 'price',
      headerName: 'Preço',
      renderCell: (r) => (
        <>{new Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency' }).format(r.row.price)}</>
      ),
      flex: 1,
    },
    {
      field: 'professional',
      headerName: 'Profissional',
      renderCell: (r) => <>{r.row.professional.name}</>,
      flex: 1,
    },
    {
      field: 'info',
      headerName: 'Informações',
      renderCell: (r) => (
        <AppointmentModal
          appointment={r.row}
          iconBtn={
            <>
              <Info />
            </>
          }
        />
      ),
      flex: 1,
    },
  ];

  const rows: GridRowsProp = appointments;

  return (
    <>
      <div className="w-full h-[600px] border border-light-main rounded-lg p-5">
        <DataGrid rows={rows} columns={cols} />
      </div>
    </>
  );
};
