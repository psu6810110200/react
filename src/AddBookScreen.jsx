import { useState, useEffect } from 'react';
import { Form, Input, Button, InputNumber, Select, message, Card } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const URL_BOOK = "/api/book";
const URL_CATEGORY = "/api/book-category";

export default function AddBookScreen() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(URL_CATEGORY);
        setCategories(response.data.map(cat => ({
          label: cat.name,
          value: cat.id
        })));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleFinish = async (values) => {
    try {
      setIsLoading(true);
      await axios.post(URL_BOOK, values);
      message.success("เพิ่มหนังสือเรียบร้อย!");
      navigate('/'); // กลับหน้าหลัก
    } catch (error) {
      console.error("Error adding book:", error);
      message.error("เกิดข้อผิดพลาด");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card title="Add New Book" style={{ width: 600 }}>
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="author" label="Author" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
            <Select options={categories} placeholder="Select Category" />
          </Form.Item>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Form.Item name="price" label="Price" rules={[{ required: true }]} style={{ flex: 1 }}>
              <InputNumber style={{ width: '100%' }} min={0} />
            </Form.Item>

            <Form.Item name="stock" label="Stock" rules={[{ required: true }]} style={{ flex: 1 }}>
              <InputNumber style={{ width: '100%' }} min={0} />
            </Form.Item>
          </div>

          <Form.Item>
            <Button onClick={() => navigate('/')} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={isLoading}>Save</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}