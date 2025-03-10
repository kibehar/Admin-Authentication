import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const AdminSignup: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    console.log('Sending signup request to backend...', values);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/admin/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      console.log('Response received:', response); // Debugging

      const data = await response.json();
      console.log('Response data:', data); // Debugging

      if (response.ok) {
        message.success(data.message || 'Signup successful!');
        navigate('/admin-dashboard');
      } else {
        message.error(data.message || 'Signup failed.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      message.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bodys ">
      <div className="form-container">
        <h1>Admin Signup</h1>
        <Form onFinish={onFinish}>
          <Form.Item name="firstName" rules={[{ required: true, message: 'First name is required' }]}>
            <Input className="dash-input" placeholder="First Name" />
          </Form.Item>
          <Form.Item name="lastName" rules={[{ required: true, message: 'Last name is required' }]}>
            <Input className="dash-input" placeholder="Last Name" />
          </Form.Item>
          <Form.Item name="email" rules={[{ required: true, message: 'Email is required' }]}>
            <Input className="dash-input" placeholder="Email" />
          </Form.Item>
          <Form.Item name="username" rules={[{ required: true, message: 'Username is required' }]}>
            <Input className="dash-input" placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Password is required' }]}>
            <Input.Password className="dash-input" placeholder="Password" />
          </Form.Item>
          <Form.Item name="confirmationPassword" rules={[{ required: true, message: 'Please confirm your password' }]}>
            <Input.Password className="dash-input" placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="submit-button">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AdminSignup;
