import { Button, MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAppointment } from '../../hooks/useAppointment';
import { listRoom } from '../../services/roomService';
import { Room } from '../../types/room';
import { erroHandler } from '../../utils/erroHandler';

export const SelectRoom: React.FC = () => {
  const { result, handleSelectRoom, handlePrev } = useAppointment();
  const { register, handleSubmit } = useForm();
  const [rooms, setRooms] = useState<Room[]>([]);

  const getRoomsBySpecialty = async (specialtyId: string) => {
    try {
      const result = await listRoom();
      const filterList = result.filter((r) => !!r.specialties.find((s) => s.id === specialtyId));
      setRooms(filterList);
    } catch (error) {
      const e = erroHandler(error);
      toast.error(e);
    }
  };

  const onSubmit = handleSubmit((data) => {
    const room = rooms.find((r) => r.id === data.roomId);

    if (!room) {
      toast.error('Erro ao selecionar a sala');
      return;
    }

    handleSelectRoom(room);
  });

  useEffect(() => {
    if (result?.specialty) getRoomsBySpecialty(result.specialty.id);
  }, []);

  return (
    <>
      <div className="flex justify-start items-stretch flex-col space-y-5">
        <p className="text-2xl">Selecione a Sala: </p>
        <form onSubmit={onSubmit}>
          <TextField select fullWidth required label="Sala" {...register('roomId')}>
            {rooms.map((room) => (
              <MenuItem disabled={!room.enabled} key={room.id} value={room.id}>
                {room.name}
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
