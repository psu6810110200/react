import { useState, useEffect } from 'react';
import { Form, Input, Button, InputNumber, Select, message, Card, Spin } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const URL_BOOK = "/api/book";
const URL_CATEGORY = "/api/book-category";

export default function EditBookScreen() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, bookRes] = await Promise.all([
          axios.get(URL_CATEGORY),
          axios.get(`${URL_BOOK}/${id}`)
        ]);

        setCategories(catRes.data.map(cat => ({
          label: cat.name,
          value: cat.id
        })));

        const book = bookRes.data;
        form.setFieldsValue({
            ...book,
            categoryId: book.category?.id || book.categoryId 
        });

      } catch (error) {
        console.error('Error fetching data:', error);
        message.error("ไม่พบข้อมูลหนังสือ");
        navigate('/');
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [id, navigate, form]);

  const handleFinish = async (values) => {
    try {
      setIsLoading(true);
      await axios.patch(`${URL_BOOK}/${id}`, values);
      message.success("แก้ไขข้อมูลเรียบร้อย!");
      navigate('/');
    } catch (error) {
      console.error("Error updating book:", error);
      message.error("แก้ไขล้มเหลว");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) return <div style={{ textAlign: 'center', marginTop: 50 }}><Spin size="large" /></div>;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card title={`Edit Book (ID: ${id})`} style={{ width: 600 }}>
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="author" label="Author" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
            <Select options={categories} />
          </Form.Item>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Form.Item name="price" label="Price" rules={[{ required: true }]} style={{ flex: 1 }}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name="stock" label="Stock" rules={[{ required: true }]} style={{ flex: 1 }}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </div>

          <Form.Item>
            <Button onClick={() => navigate('/')} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={isLoading}>Update</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}