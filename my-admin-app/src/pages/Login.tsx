import React, { useState } from 'react';
import { Form, Input, Button, Modal, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import AdminCode from './AdminCode';

const AdminLogin: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const { usernameOrEmail, password } = values;

    console.log('Sending login request to backend...', values);

    try {
      const response = await fetch('http://localhost:3000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      const data = await response.json();

      if (response.ok) {
        message.success('Login successful!');
        navigate('/admin-dashboard');
      } else {
        message.error(data.message || 'Invalid username or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('Something went wrong. Please try again.');
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="bodys ">
      <div className="form-container">
        <h1>Admin Login</h1>
        <Form onFinish={onFinish}>
          <Form.Item
            name="usernameOrEmail"
            rules={[{ required: true, message: 'Please enter your username or email' }]}
          >
            <Input className="dash-input" placeholder="Username or Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password className="dash-input" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type="primary" htmlType="submit" className="submit-button">
                Log In
              </Button>
              <Button type="link" onClick={showModal} style={{ color: '#1890ff' }}>
                Signup
              </Button>
            </div>
          </Form.Item>
        </Form>

        {/* Admin Code Popup */}
        <Modal
          title="Admin Code Verification"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <AdminCode onSuccess={() => navigate('/admin-signup')} />
        </Modal>
      </div>
    </div>
  );
};

export default AdminLogin;
