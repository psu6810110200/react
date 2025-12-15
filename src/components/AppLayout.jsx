import { Layout, Button, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

export default function AppLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // ฟังก์ชัน Logout: ลบ Token แล้วโหลดหน้าใหม่เพื่อกลับไป Login
  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* ส่วนหัว (Header) */}
      <Header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', // ดันเนื้อหาให้ห่างกันซ้าย-ขวา
        padding: '0 20px',
        background: '#001529' 
      }}>
        {/* ฝั่งซ้าย: ชื่อร้านหนังสือ */}
        <div style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
          📚 Book Store
        </div>

        {/* ปุ่ม Logout */}
        <Button 
          type="primary" 
          danger 
          icon={<LogoutOutlined />} 
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Header>

      {/* ส่วนเนื้อหา (Content) */}
      <Content style={{ padding: '24px 48px' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 380,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* <Outlet /> คือจุดที่หน้า BookScreen จะมาโผล่ตรงนี้ */}
          <Outlet /> 
        </div>
      </Content>

      {/* ส่วนท้าย (Footer) */}
      <Footer style={{ textAlign: 'center' }}>
        Book Store App ©2025 Created by Me
      </Footer>
    </Layout>
  );
}