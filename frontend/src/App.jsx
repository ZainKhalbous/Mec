
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import AdminPage from './pages/AdminPage/AdminPage';


function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
