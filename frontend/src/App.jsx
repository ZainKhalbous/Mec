
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import AdminPage from './pages/adminPage'

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
