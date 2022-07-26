import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { Close } from '@mui/icons-material';
import { Box, CircularProgress, IconButton, Modal, Stack, Typography } from '@mui/material';
import { addDays, format } from 'date-fns';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getAppointment, listAppointments } from '../../services/appointmentService';
import { Appointment } from '../../types/appointment';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [appointment, setAppointment] = useState<Appointment>();

  const { data } = useQuery('appointments', () =>
    listAppointments({ dateInit: new Date(), dateEnd: addDays(new Date(), 7) })
  );

  const handleClick = (id: string) => {
    getAppointment(id).then((result) => {
      setAppointment(result);
      setOpen(true);
    });
  };

  return (
    <>
      <div className="calendar">
        {data && (
          <FullCalendar
            customButtons={{
              addButtom: {
                click: () => {
                  navigate('/painel/consultas/cadastro');
                },
                text: 'Nova Consulta',
              },
            }}
            headerToolbar={{
              left: 'title',
              center: '',
              right: 'addButtom',
            }}
            plugins={[dayGridPlugin]}
            initialView="dayGridWeek"
            locale={'pt-br'}
            eventClick={({ event }) => handleClick(event.id)}
            events={data.map((d) => {
              return {
                id: d.id,
                title: d.patient.name,
                date: format(new Date(d.dateTime), 'yyyy-MM-dd'),
              };
            })}
          />
        )}
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '550px',
            height: '100%',
            bgcolor: 'background.paper',
            m: 2,
            p: 2,
            display: 'flex',
            justifyContent: 'fles-start',
            alignItems: 'flex-start',
            flexDirection: 'column',
            gap: 5,
          }}
        >
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" color="primary">
              Dados da Consulta
            </Typography>

            <IconButton onClick={() => setOpen(false)} color="primary">
              <Close />
            </IconButton>
          </Box>
          {appointment ? (
            <Stack spacing={2}>
              <Typography>Tipo: {appointment.type}</Typography>
              <Typography>
                Paciente: {appointment.patient.socialName ?? appointment.patient.name} - {appointment.patient.document}{' '}
                - {appointment.patient.phone}
              </Typography>
              <Typography>Data: {new Date(appointment.dateTime).toLocaleString()}</Typography>
              <Typography>
                Preço:{' '}
                {new Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency' }).format(appointment.price)}
              </Typography>
            </Stack>
          ) : (
            <>
              <CircularProgress />
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};
