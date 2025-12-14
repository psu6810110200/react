import './App.css'
import axios from 'axios'
import LoginScreen from './LoginScreen';
import BookScreen from './BookScreen';
import { Routes, Route, Navigate } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:3000"

function App() {
 
  return (

    <Routes>

      <Route path="/login" element={<LoginScreen />} />

      <Route path="/" element={<BookScreen />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
