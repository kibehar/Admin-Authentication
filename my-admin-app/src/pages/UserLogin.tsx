import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

interface User {
  key: string;
  name: string;
  email: string;
  username: string;
  role: string;
  fatherName: string;
  isFirstLogin: boolean;
}

const UserLogin: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Hardcoded user for testing
  const validUser: User = {
    key: '1',
    name: 'JohnDoe',
    email: 'john@example.com',
    username: 'johndoe',
    role: 'Employee',
    fatherName: 'JohnSr',
    isFirstLogin: true, // Simulate first login
  };

  // Default password logic
  const defaultPassword = `${validUser.username}.${validUser.fatherName}@123`;

  const onFinish = (values: any) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const { usernameOrEmail, password } = values;

      // Check if username/email and password match
      if (
        (usernameOrEmail === validUser.username || usernameOrEmail === validUser.email) &&
        password === defaultPassword
      ) {
        if (validUser.isFirstLogin) {
          // Redirect to password reset page for first login
          navigate('/reset-password');
        } else {
          // Redirect to dashboard
          navigate('/user-dashboard');
        }
      } else {
        message.error('Incorrect username or password.');
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="bodys">
    <div className="user-login-container">
      <div className="user-login-form">
        <h1>User Login</h1>
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
            <Button type="primary" htmlType="submit" loading={loading}>
              Log In
            </Button>
          </Form.Item>
        </Form>

        {}
        <div className="footer">
          <span>Don't have an account? </span>
          <Button type="link" onClick={() => navigate('/user-signup')}>
            User Signup
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserLogin;