
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import AdminPage from './pages/AdminPage/AdminPage';
import VolunteerPage from './pages/VolunteerPage/VolunteerPage';
import LoginPage from './pages/LoginPage/LoginPage';


function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/donor" element={<VolunteerPage />} />
         <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
