
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import AdminPage from './pages/AdminPage/AdminPage';
import VolunteerPage from './pages/VolunteerPage/VolunteerPage';
import LoginPage from './pages/LoginPage/LoginPage';
import LandingPage from './pages/HomePage/HomePage';
import RegisterPage from './pages/RegisterationPage/RegistrationPage';


function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/donor" element={<VolunteerPage />} />
        <Route path="/login" element={<LoginPage />} />
         <Route path="/register" element={<RegisterPage />} />
         <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
