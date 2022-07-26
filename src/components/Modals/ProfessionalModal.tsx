import { Close } from '@mui/icons-material';
import { Box, Button, IconButton, Modal, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Professional } from '../../types/professional';

type ProfessionalProps = {
  professional: Professional;
  iconBtn: React.ReactNode;
};

export const ProfessionalModal: React.FC<ProfessionalProps> = ({ professional, iconBtn }) => {
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
            maxHeight: '350px',
            height: '100%',
            bgcolor: 'background.paper',
            m: 2,
            p: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" color="primary">
              Dados do Profissional
            </Typography>

            <IconButton onClick={handleClose} color="primary">
              <Close />
            </IconButton>
          </Box>

          <Stack spacing={2} sx={{ my: 4 }}>
            <Typography>Nome: {professional.name}</Typography>
            <Typography>Nº Documento: {professional.professionalDocument}</Typography>
            <Typography>Email: {professional.email}</Typography>
            <Typography>Telefone: {professional.phone}</Typography>
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'stretch', gap: 1 }}>
            <Link to={`/painel/profissionais/cadastro?id=${professional.id}`}>
              <Button variant="outlined">Editar Dados</Button>
            </Link>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
