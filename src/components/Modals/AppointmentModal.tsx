import { Close } from '@mui/icons-material';
import { Box, IconButton, Modal, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Appointment } from '../../types/appointment';

type AppointmentModalProps = {
  appointment: Appointment;
  iconBtn: React.ReactNode;
};

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ appointment, iconBtn }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen}>{iconBtn}</IconButton>

      <Modal open={open} onClose={handleClose}>
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

            <IconButton onClick={handleClose} color="primary">
              <Close />
            </IconButton>
          </Box>
          <Stack spacing={2}>
            <Typography>Tipo: {appointment.type}</Typography>
            <Typography>
              Paciente: {appointment.patient.socialName ?? appointment.patient.name} - {appointment.patient.document} -{' '}
              {appointment.patient.phone}
            </Typography>
            <Typography>Data: {new Date(appointment.dateTime).toLocaleString()}</Typography>
            <Typography>
              Preço: {new Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency' }).format(appointment.price)}
            </Typography>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
