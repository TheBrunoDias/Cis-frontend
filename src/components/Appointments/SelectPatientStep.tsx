import { Autocomplete, Button, CircularProgress, TextField } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppointment } from '../../hooks/useAppointment';
import { listPatients } from '../../services/patientService';
import { Patient } from '../../types/patient';

export const SelectPatientStep: React.FC = () => {
  const { handleSelectPatient, result } = useAppointment();
  const [loading, setLoading] = useState(false);
  const [patientFilter, setPatientFilter] = useState<Patient[]>([]);
  const [selected, setSelected] = useState<Patient>();

  const handleFilterPatient = async (value: string) => {
    try {
      setLoading(true);
      const patients = await listPatients({ name: value });
      setPatientFilter(patients);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (selected) handleSelectPatient(selected);
  };

  return (
    <>
      <div>
        <p className="text-2xl my-2">Selecione o Paciente: </p>
        <div className="flex flex-col justify-end items-end gap-2">
          <Autocomplete
            sx={{ width: '100%' }}
            fullWidth
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => `${option.socialName ? option.socialName : option.name}`}
            onInputChange={(_event, value) => {
              if (value.trim() !== '') handleFilterPatient(value);
            }}
            options={patientFilter}
            loading={loading}
            onChange={(_event, value) => (value ? setSelected(value) : undefined)}
            defaultValue={result?.patient ?? undefined}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Paciente"
                placeholder="Nome do Paciente"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />

          <div>
            <Button disabled={!selected} onClick={handleNext} variant="contained">
              Proximo
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
