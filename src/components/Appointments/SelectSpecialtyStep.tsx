import { Button, MenuItem, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { useAppointment } from '../../hooks/useAppointment';
import { listSpecialties } from '../../services/specialtyService';

export const SelectSpecialtyStep: React.FC = () => {
  const { result, handleSelectSpecialty, handlePrev, handleSelectAppointmentType } = useAppointment();
  const { data: specialties } = useQuery('specialties', listSpecialties);
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
    const selected = specialties?.find((s) => s.id === data.specialty);
    if (!selected) {
      toast.warn('Selecione uma Especialidade');
      return;
    }
    handleSelectSpecialty(selected);
    handleSelectAppointmentType(data.type);
  });

  return (
    <>
      <div>
        <p className="text-2xl my-2">Seleção de Especialidade: </p>
        <form onSubmit={onSubmit} className="flex justify-start items-stretch flex-col space-y-5">
          <TextField
            label="Tipo de consulta"
            select
            fullWidth
            required
            defaultValue={result?.type ?? 'CLINICA_ESCOLA'}
            {...register('type')}
          >
            <MenuItem value="CLINICA_ESCOLA">CLINICA ESCOLA</MenuItem>
            <MenuItem value="CLINICA_POPULAR">CLINICA POPULAR</MenuItem>
          </TextField>
          <TextField
            label="Especialidade"
            fullWidth
            select
            required
            defaultValue={result?.specialty?.id ?? undefined}
            {...register('specialty')}
          >
            {specialties &&
              specialties.map((specialty) => (
                <MenuItem key={specialty.id} disabled={!specialty.enabled} value={specialty.id}>
                  {specialty.name}
                </MenuItem>
              ))}
          </TextField>

          <div className="flex justify-end items-center gap-2">
            <Button onClick={handlePrev} variant="outlined">
              Voltar
            </Button>
            <Button variant="contained" type="submit">
              Proximo
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
