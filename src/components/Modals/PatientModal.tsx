import { Close } from '@mui/icons-material';
import { Box, Button, IconButton, Modal, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Patient } from '../../types/patient';

type PatientModalProps = {
  patient: Patient;
  iconBtn: React.ReactNode;
};

export const PatientModal: React.FC<PatientModalProps> = ({ patient, iconBtn }) => {
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
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" color="primary">
              Dados do Paciente
            </Typography>

            <IconButton onClick={handleClose} color="primary">
              <Close />
            </IconButton>
          </Box>

          <Stack spacing={2} sx={{ my: 4 }}>
            <Typography>Nome: {patient.socialName ?? patient.name}</Typography>
            <Typography>
              Documento: ({patient.documentType}) {patient.document}
            </Typography>
            <Typography>Email: {patient.email}</Typography>
            <Typography>Telefone: {patient.phone}</Typography>
            <Typography>Endereço: {patient.address}</Typography>
            <Typography>Deficiência: {patient.disability ? 'SIM' : 'NÃO'}</Typography>
            <Typography>Descrição da Deficiência: {patient.disabilityDescription}</Typography>
            <Typography>Descrição: {patient.description}</Typography>
            <Typography>
              Profissional Vinculado: {patient.professional ? <>{patient.professional.name}</> : 'NÃO'}
            </Typography>
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'stretch', gap: 1 }}>
            <Link to={`/painel/pacientes/cadastro?id=${patient.id}`}>
              <Button variant="outlined">Editar Dados</Button>
            </Link>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
