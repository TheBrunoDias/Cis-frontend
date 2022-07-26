import { Autocomplete, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppointment } from '../../hooks/useAppointment';
import { listInterns } from '../../services/internService';
import { listProfessionals } from '../../services/professionalService';
import { Intern } from '../../types/intern';
import { Professional } from '../../types/professional';
import { erroHandler } from '../../utils/erroHandler';

export const SelectProfessionalAndInterns: React.FC = () => {
  const { result, handleSelectProfessional, handleSelectInterns, handlePrev } = useAppointment();
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [interns, setInterns] = useState<Intern[]>([]);
  const [selectedInterns, setSelectedInterns] = useState<Intern[]>([]);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional>();

  const getProfessionalsBySpecialty = async (specialtyId: string) => {
    try {
      const result = await listProfessionals({ specialtyId });
      setProfessionals(result);
    } catch (error) {
      var e = erroHandler(error);
      toast.error(e);
    }
  };

  const getInternsBySpecialty = async (specialtyId: string) => {
    try {
      const result = await listInterns({ specialtyId });
      setInterns(result);
    } catch (error) {
      var e = erroHandler(error);
      toast.error(e);
    }
  };

  const handleSubmit = () => {
    if (result?.type === 'CLINICA_POPULAR' && !selectedProfessional) {
      toast.warning('Consultas Populares requerem um profissional!');
      return;
    }

    if (result?.type === 'CLINICA_ESCOLA' && !selectedInterns) {
      toast.warning('Consultas Escola requerem pelo menos um estagiário');
      return;
    }

    if (!selectedProfessional) {
      toast.warning('Profissional não selecionado!');
      return;
    }
    handleSelectInterns(selectedInterns);
    handleSelectProfessional(selectedProfessional);
  };

  useEffect(() => {
    if (result?.specialty) {
      getProfessionalsBySpecialty(result.specialty.id);
      getInternsBySpecialty(result.specialty.id);
    }
  }, []);

  return (
    <>
      <div className="flex justify-start items-stretch flex-col space-y-5">
        <p className="text-2xl">Selecione o Profissional: </p>
        <Autocomplete
          options={professionals}
          fullWidth
          isOptionEqualToValue={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.name}
          onChange={(_event, value) => (value ? setSelectedProfessional(value) : undefined)}
          defaultValue={result?.professional ?? undefined}
          renderInput={(params) => <TextField {...params} label="Profissional" required />}
        />

        <p className="text-2xl">Selecione os Estagiários: </p>
        <Autocomplete
          options={interns}
          fullWidth
          multiple
          isOptionEqualToValue={(option, value) => option.name === value.name}
          getOptionLabel={(option) => `${option.name} (${option.studentId})`}
          onChange={(_event, value) => (value ? setSelectedInterns(value) : undefined)}
          defaultValue={result?.interns ? result.interns : []}
          renderInput={(params) => <TextField {...params} label="Estagiários" />}
        />

        <div className="flex justify-end items-center gap-2">
          <Button onClick={handlePrev} variant="outlined">
            Voltar
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Proximo
          </Button>
        </div>
      </div>
    </>
  );
};
