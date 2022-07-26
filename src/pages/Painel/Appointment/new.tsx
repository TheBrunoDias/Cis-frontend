import { Edit } from '@mui/icons-material';
import { Button, Grid, IconButton, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';
import { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import { SelectAppointmentPack } from '../../../components/Appointments/SelectAppointmentPack';
import { SelectDates } from '../../../components/Appointments/SelectDates';
import { SelectPatientStep } from '../../../components/Appointments/SelectPatientStep';
import { SelectProfessionalAndInterns } from '../../../components/Appointments/SelectProfessionalAndInterns';
import { SelectRoom } from '../../../components/Appointments/SelectRoom';
import { SelectSpecialtyStep } from '../../../components/Appointments/SelectSpecialtyStep';
import { createAppointment } from '../../../services/appointmentService';
import { Intern } from '../../../types/intern';
import { Patient } from '../../../types/patient';
import { Professional } from '../../../types/professional';
import { Room } from '../../../types/room';
import { ServicePack } from '../../../types/servicePack';
import { Specialty } from '../../../types/specialty';

type AppointmentContextProps = {
  result: AppointmentResultProps | undefined;
  handleSelectPatient: (patient: Patient) => void;
  handleSelectSpecialty: (specialty: Specialty) => void;
  handleSelectAppointmentType: (type: 'CLINICA_ESCOLA' | 'CLINICA_POPULAR') => void;
  handleSelectProfessional: (professional: Professional) => void;
  handleSelectInterns: (interns: Intern[]) => void;
  handleSelectAppointmentsPack: (pack: ServicePack) => void;
  handleSelectPriceAndQuantity: (price: number, quantity: number) => void;
  handleSelectRoom: (room: Room) => void;
  handleSelectDate: (dates: Date) => void;
  handlePrev: () => void;
};

export const AppointmentContext = createContext({} as AppointmentContextProps);

type AppointmentResultProps = {
  patient?: Patient;
  specialty?: Specialty;
  type?: 'CLINICA_ESCOLA' | 'CLINICA_POPULAR';
  professional?: Professional;
  interns?: Intern[];
  room?: Room;
  date?: Date;
  pack?: ServicePack;
  paid?: number;
  price?: number;
};

const steps = [
  {
    title: 'Seleção de Paciente',
    step: <SelectPatientStep />,
  },
  {
    title: 'Seleção de Especialidade',
    step: <SelectSpecialtyStep />,
  },
  {
    title: 'Seleção de Pacote',
    step: <SelectAppointmentPack />,
  },
  {
    title: 'Profissional e Estagiários',
    step: <SelectProfessionalAndInterns />,
  },
  {
    title: 'Sala',
    step: <SelectRoom />,
  },
  {
    title: 'Seleção de Data',
    step: <SelectDates />,
  },
];

export const AppointmentNew: React.FC = () => {
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [result, setResult] = useState<AppointmentResultProps>();
  const [quantity, setQuantity] = useState<number>(1);

  const handleNext = () => setActiveStep((s) => ++s);
  const handlePrev = () => setActiveStep((s) => (s === 0 ? 0 : --s));

  const handleSelectPatient = (patient: Patient) => {
    setResult((r) => {
      return { ...r, patient };
    });

    handleNext();
  };
  const handleSelectSpecialty = (specialty: Specialty) => {
    setResult((r) => {
      return { ...r, specialty };
    });
    handleNext();
  };
  const handleSelectAppointmentType = (type: 'CLINICA_ESCOLA' | 'CLINICA_POPULAR') => {
    setResult((r) => {
      return { ...r, type };
    });
  };
  const handleSelectProfessional = (professional: Professional) => {
    setResult((r) => {
      return { ...r, professional };
    });
    handleNext();
  };
  const handleSelectInterns = (interns: Intern[]) => {
    setResult((r) => {
      return { ...r, interns };
    });
  };
  const handleSelectPriceAndQuantity = (price: number, quantity: number) => {
    setResult((r) => {
      return { ...r, price };
    });
    setQuantity(quantity);
    handleNext();
  };
  const handleSelectAppointmentsPack = (pack: ServicePack) => {
    setResult((r) => {
      return { ...r, pack };
    });
    handleNext();
  };
  const handleSelectRoom = (room: Room) => {
    setResult((r) => {
      return { ...r, room };
    });
    handleNext();
  };

  const handleSelectDate = (date: Date) => {
    setResult((r) => {
      return { ...r, date };
    });
    handleNext();
  };

  const handleConfirm = async () => {
    try {
      setLoadingConfirm(true);
      if (!result) throw new Error('Dados Inválidos');
      const { date, interns, pack, paid, patient, price, professional, room, type } = result;

      if (!type) throw new Error('Tipo inválido');
      if (!date) throw new Error('Data Inválida');
      if (type === 'CLINICA_ESCOLA' && !interns) throw new Error('Clinica escola requer ao menos 1 estagiário');
      if (!professional) throw new Error('Profissional Inválido');
      if (!patient) throw new Error('Paciente Inválido');
      if (!room) throw new Error('Sala Inválida');
      if (!price) throw new Error('Preço Inválido');

      const res = await createAppointment({
        type,
        status: 'AWAITING_PAYMENT',
        patientId: patient.id,
        dateTime: date,
        description: '',
        price,
        totalPaid: 0,
        professionalId: professional.id,
        internsId: interns?.map((i) => i.id),
        roomId: room.id,
      });

      if (res) toast.success('Consulta Cadastrada com Sucesso');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingConfirm(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center my-5 border-b border-light-darker pb-2">
        <Typography variant="h3" className="text-primary-50 font-bold">
          Nova Consulta
        </Typography>
      </div>

      <AppointmentContext.Provider
        value={{
          result,
          handleSelectPatient,
          handleSelectSpecialty,
          handleSelectAppointmentType,
          handleSelectProfessional,
          handleSelectInterns,
          handleSelectAppointmentsPack,
          handleSelectPriceAndQuantity,
          handleSelectRoom,
          handleSelectDate,
          handlePrev,
        }}
      >
        <Grid container spacing={2}>
          <Grid item lg={6}>
            <Stepper orientation="vertical" activeStep={activeStep}>
              {steps.map(({ title, step }) => (
                <Step key={title}>
                  <StepLabel>{title}</StepLabel>
                  <StepContent>
                    <div className="p-3 w-full">{step}</div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid item lg={6}>
            <div className="rounded-lg border border-light-main p-2">
              <p className="font-semibold">Dados da consulta:</p>

              <div className="flex justify-start items-center gap-5">
                <p className="leading-10">
                  Paciente: <b>{result?.patient?.socialName ?? result?.patient?.name}</b>
                </p>
                {(result?.patient?.name || result?.patient?.socialName) && (
                  <>
                    <IconButton size="small" onClick={() => setActiveStep(0)}>
                      <Edit />
                    </IconButton>
                  </>
                )}
              </div>

              <div className="flex justify-start items-center gap-5">
                <p className="leading-10">
                  Tipo de consulta: <b>{result?.type === 'CLINICA_ESCOLA' ? 'CLINICA ESCOLA' : 'CLINICA POPULAR'}</b>
                </p>
                <IconButton size="small" onClick={() => setActiveStep(1)}>
                  <Edit />
                </IconButton>
              </div>

              <div className="flex justify-start items-center gap-5">
                <p className="leading-10">
                  Especialidade: <b>{result?.specialty?.name}</b>
                </p>
                {result?.specialty && (
                  <>
                    <IconButton size="small" onClick={() => setActiveStep(1)}>
                      <Edit />
                    </IconButton>
                  </>
                )}
              </div>
              <div className="flex justify-start items-center gap-5">
                <p className="leading-10">
                  Quantidade de consultas: <b>{quantity}</b>
                </p>
                {quantity && (
                  <>
                    <IconButton size="small" onClick={() => setActiveStep(2)}>
                      <Edit />
                    </IconButton>
                  </>
                )}
              </div>
              <div className="flex justify-start items-center gap-5">
                <p className="leading-10">
                  Preço por consulta: <b>{result?.price}</b>
                </p>

                {result?.price && (
                  <>
                    <IconButton size="small" onClick={() => setActiveStep(1)}>
                      <Edit />
                    </IconButton>
                  </>
                )}
              </div>
              <div className="flex justify-start items-center gap-5">
                <p className="leading-10">
                  Profissional: <b>{result?.professional?.name}</b>
                </p>

                {result?.professional && (
                  <>
                    <IconButton size="small" onClick={() => setActiveStep(3)}>
                      <Edit />
                    </IconButton>
                  </>
                )}
              </div>
              <div className="flex justify-start items-center gap-5">
                <p className="leading-10">
                  Estagiários: <b>{result?.interns?.map((intern) => intern.name).join(', ')}</b>
                </p>

                {result?.interns && (
                  <>
                    <IconButton size="small" onClick={() => setActiveStep(3)}>
                      <Edit />
                    </IconButton>
                  </>
                )}
              </div>
              <div className="flex justify-start items-center gap-5">
                <p className="leading-10">
                  Sala: <b>{result?.room ? result.room.name : undefined}</b>
                </p>

                {result?.room && (
                  <>
                    <IconButton size="small" onClick={() => setActiveStep(4)}>
                      <Edit />
                    </IconButton>
                  </>
                )}
              </div>
              <div className="flex justify-start items-center gap-5">
                <p className="leading-10">
                  Data e Hora: <b>{result?.date ? result.date.toLocaleString() : undefined}</b>
                </p>

                {result?.date && (
                  <>
                    <IconButton size="small" onClick={() => setActiveStep(5)}>
                      <Edit />
                    </IconButton>
                  </>
                )}
              </div>
              {result?.patient &&
                result.type &&
                result.specialty &&
                result.price &&
                quantity &&
                result.professional &&
                result.room &&
                result.date && (
                  <>
                    <Button variant="contained" sx={{ my: 2 }} onClick={handleConfirm}>
                      Confirmar
                    </Button>
                  </>
                )}
            </div>
          </Grid>
        </Grid>
      </AppointmentContext.Provider>
    </>
  );
};
