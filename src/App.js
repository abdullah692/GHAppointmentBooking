import logo from './logo.svg';
// import './App.css';y
import OnlineBooking from './Components/OnlineBooking';
import AppointmentTypes from './Components/AppointmentTypes/AppointmentTypes';
import { Routes, Route } from "react-router-dom";
import Header from './Components/Header/Header';
import Slots from './Components/AvailableSlots/Slots';
import PatientInfo from './Components/PatientInfo/PatientInfo';
import AppointmentBook from './Components/PatientInfo/AppointmentBook';

function App() {
  return (
    <div className="App">
      <Header/>
       <Routes>
          <Route exact path="/" element={<OnlineBooking/>} />
          <Route  path="/appTypes/:id" element={<AppointmentTypes/>} />
          <Route  path="/slots" element={<Slots/>} />
          <Route  path="/patientInfo" element={<PatientInfo/>} />
          <Route  path="/appointmentBook" element={<AppointmentBook/>} />
          </Routes>
          {/* <OnlineBooking/> */}
    </div>
  );
}

export default App;
