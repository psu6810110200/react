import './App.css'
import axios from 'axios'
import { Routes, Route, Navigate } from 'react-router-dom'; 
import LoginScreen from './LoginScreen';
import BookScreen from './BookScreen';
import AppLayout from './components/AppLayout';

axios.defaults.baseURL = "http://localhost:3000"

function App() {
  
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  if (token) {
    axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
  }

  return (
    <Routes>
      
      <Route path="/login" element={token ? <Navigate to="/" /> : <LoginScreen />} 
      />

      <Route element={<AppLayout />}></Route>
      <Route path="/" element={token ? <BookScreen /> : <Navigate to="/login" />} 
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App