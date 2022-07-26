import { Close } from '@mui/icons-material';
import { Box, Button, CircularProgress, IconButton, Modal, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSpecialtyById } from '../../services/specialtyService';
import { Specialty } from '../../types/specialty';

type SpecialtyModalProps = {
  id: string;
  iconBtn: React.ReactNode;
};

export const SpecialtyModal: React.FC<SpecialtyModalProps> = ({ id, iconBtn }) => {
  const [open, setOpen] = useState(false);
  const [specialty, setSpecialty] = useState<Specialty>();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getSpecialty = async () => {
    try {
      const res = await getSpecialtyById(id);
      setSpecialty(res);
    } catch (error) {
      toast.error(error.message);
    } finally {
    }
  };

  useEffect(() => {
    if (open) getSpecialty();
  }, [open]);

  return (
    <>
      <button onClick={handleOpen}>{iconBtn}</button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '450px',
            height: '100%',
            bgcolor: 'background.paper',
            m: 2,
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" color="primary">
              Dados do Especialidade
            </Typography>

            <IconButton onClick={handleClose} color="primary">
              <Close />
            </IconButton>
          </Box>

          {specialty ? (
            <>
              <Stack spacing={2} sx={{ my: 4 }}>
                <Typography>Nome: {specialty.name}</Typography>
                <Typography>
                  Preço Convênio:{' '}
                  {new Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency' }).format(
                    specialty.healthInsurencePrice
                  )}
                </Typography>
                <Typography>
                  Preço Particular:{' '}
                  {new Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency' }).format(
                    specialty.privatePrice
                  )}
                </Typography>
                <Typography>Descrição: {specialty.description}</Typography>
              </Stack>

              <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'stretch', gap: 1 }}>
                <Link to={`/painel/especialidades/cadastro?id=${specialty.id}`}>
                  <Button variant="outlined">Editar Dados</Button>
                </Link>
              </Box>
            </>
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Modal>
    </>
  );
};
