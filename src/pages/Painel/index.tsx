import '@fullcalendar/react/dist/vdom';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { AppointmentPage } from './Appointment';
import { AppointmentNew } from './Appointment/new';
import { HomePage } from './Home';
import { InternsPage } from './Interns';
import { InternNew } from './Interns/new';
import { PatientsPage } from './Patients';
import { PatientNew } from './Patients/new';
import { ProfessionalsPage } from './Professionals';
import { ProfessionalNew } from './Professionals/new';
import { RoomsPage } from './Rooms';
import { RoomNew } from './Rooms/new';
import { ServicePackPage } from './ServicePack';
import { NewServicePack } from './ServicePack/new';
import { SpecialtiesPage } from './Specialties';
import { SpecialtiesNew } from './Specialties/new';

export const Painel: React.FC = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/pacientes" element={<PatientsPage />} />
          <Route path="/pacientes/cadastro" element={<PatientNew />} />
          <Route path="/profissionais" element={<ProfessionalsPage />} />
          <Route path="/profissionais/cadastro" element={<ProfessionalNew />} />
          <Route path="/estagiarios" element={<InternsPage />} />
          <Route path="/estagiarios/cadastro" element={<InternNew />} />
          <Route path="/salas" element={<RoomsPage />} />
          <Route path="/salas/cadastro" element={<RoomNew />} />
          <Route path="/especialidades" element={<SpecialtiesPage />} />
          <Route path="/especialidades/cadastro" element={<SpecialtiesNew />} />
          <Route path="/consultas" element={<AppointmentPage />} />
          <Route path="/consultas/cadastro" element={<AppointmentNew />} />
          <Route path="/pacotes/" element={<ServicePackPage />} />
          <Route path="/pacotes/cadastro" element={<NewServicePack />} />
        </Routes>
      </Layout>
    </>
  );
};
