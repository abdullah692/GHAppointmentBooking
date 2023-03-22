import logo from './logo.svg';
// import './App.css';y
import OnlineBooking from './Components/OnlineBooking';
import AppointmentTypes from './Components/AppointmentTypes/AppointmentTypes';
import { Routes, Route } from "react-router-dom";
import Header from './Components/Header/Header';
import Slots from './Components/AvailableSlots/Slots';
import PatientInfo from './Components/PatientInfo/PatientInfo';
import AppointmentBook from './Components/PatientInfo/AppointmentBook';
import CancelAppointment from './Components/PatientInfo/CancelAppointment';
import RescheduleApp from './Components/RescheduleApp';
import CancelPage from './Components/PatientInfo/CancelPage';
import RescheduleApproved from './Components/AvailableSlots/RescheduleApproved';
import InsuranceTypes from './Components/AppointmentTypes/InsuranceTypes';

function App() {
  return (
    <div className="App">
      <Header/>
       <Routes>
          <Route exact path="/:id" element={<OnlineBooking/>} />
          <Route  path="/appTypes/:id" element={<AppointmentTypes/>} />
          <Route  path="/insuranceTypes" element={<InsuranceTypes/>} />
          <Route  path="/slots" element={<Slots/>} />
          <Route  path="/patientInfo" element={<PatientInfo/>} />
          <Route  path="/appointmentBook" element={<AppointmentBook/>} />
          <Route  path="/cancelAppointment/:id" element={<CancelAppointment/>} />
          <Route  path="/rescheduleAppointment/:id" element={<RescheduleApp/>} />
          <Route  path="/cancelAppointmentConfirmed" element={<CancelPage/>} />
          <Route  path="/rescheduleAppointmentConfirmed" element={<RescheduleApproved/>} />
          </Routes>
          {/* <OnlineBooking/> */}
    </div>
  );
}

export default App;
