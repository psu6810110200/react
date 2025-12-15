import { useState } from 'react';
import { Button, Form, Input, Alert, Checkbox } from 'antd';
import axios from 'axios'

const URL_AUTH = "/api/auth/login"

export default function LoginScreen(props) {
  const [isLoading, setIsLoading] = useState(false)
  const [errMsg, setErrMsg] = useState(null)

  const handleLogin = async (formData) => {
    try{
      setIsLoading(true)
      setErrMsg(null)

      const { remember, ...loginPayload } = formData;
      const response = await axios.post(URL_AUTH, loginPayload);
      const token = response.data.access_token;

      if (remember) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token); 
      }

      axios.defaults.headers.common = { 'Authorization': `bearer ${token}` }
      
      window.location.href = '/';

    } catch(err) { 
      console.log(err)
      const message = err.response?.data?.message || err.message;
      setErrMsg(err.message)
    } finally { setIsLoading(false) }
  }

  return(
    <Form
      onFinish={handleLogin}
      autoComplete="off">
      {errMsg &&
        <Form.Item>
          <Alert message={errMsg} type="error" />
        </Form.Item>
      }

      <Form.Item
        label="Username"
        name="username"
        rules={[{required: true,}]}>
        <Input />
      </Form.Item>
      
      <Form.Item
        label="Password"
        name="password"
        rules={[{required: true},]}>
        <Input.Password />
      </Form.Item>

      <Form.Item 
        name="remember" 
        valuePropName="checked" 
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button 
           type="primary" 
           htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}