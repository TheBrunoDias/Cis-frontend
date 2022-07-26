import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { format, parse } from 'date-fns';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAppointment } from '../../hooks/useAppointment';

export const SelectDates: React.FC = () => {
  const { handlePrev, handleSelectDate } = useAppointment();

  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const dateParsed = parse(`${data.date} ${data.hour}`, 'yyyy-MM-dd HH:mm', new Date());

      handleSelectDate(dateParsed);
    } catch (error) {
      toast.error(error.message);
    }
  });

  return (
    <>
      <p className="text-2xl mb-5">Seleção das Data e Hora: </p>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item lg={6}>
            <TextField
              type="date"
              label="Data"
              required
              fullWidth
              defaultValue={format(new Date(), 'yyyy-MM-dd')}
              {...register('date')}
            />
          </Grid>
          <Grid item lg={6}>
            <TextField label="Hora" select fullWidth {...register('hour')}>
              {hours.map((hour) => (
                <MenuItem key={hour} value={hour}>
                  {hour}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <div className="flex justify-end items-stretch gap-2 my-5">
          <Button onClick={handlePrev} variant="outlined">
            Voltar
          </Button>
          <Button variant="contained" type="submit">
            Confirmar
          </Button>
        </div>
      </form>
    </>
  );
};

const hours = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
];
