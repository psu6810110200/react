import './App.css'
import axios from 'axios'
import LoginScreen from './LoginScreen';
import BookScreen from './BookScreen';
import { Routes, Route, Navigate } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:3000"

// 1. สร้าง Component สำหรับป้องกันเส้นทาง (Protected Route)
// ทำหน้าที่แยก Logic การตรวจสอบสิทธิ์ออกจากตัวหน้าจอ
const PrivateRoute = ({ children }) => {
  // ตรวจสอบว่ามี Token ใน Header หรือไม่ (จากการ Login)
  const isAuthenticated = axios.defaults.headers.common['Authorization'];

  // ถ้ามีสิทธิ์ -> ให้แสดงหน้าทำงาน (children)
  // ถ้าไม่มี -> บังคับเด้งกลับไปหน้า Login
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
 
  return (
    <Routes>
      {/* 2. หน้า Login (เข้าถึงได้ทั่วไป) */}
      <Route path="/login" element={<LoginScreen />} />

      {/* 3. หน้าทำงาน (ถูกแยกออกมาและป้องกันด้วย PrivateRoute) */}
      <Route 
        path="/" 
        element={
          <PrivateRoute>
            <BookScreen />
          </PrivateRoute>
        } 
      />

      {/* กรณีพิมพ์ URL มั่ว ให้เด้งไป Login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App