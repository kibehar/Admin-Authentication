import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const AdminLayout: React.FC = () => {
  return (
    <Layout className="admin-layout">
      {}
      <Header className="admin-header">
        <div className="logo">Admin Dashboard</div>
        <Menu className="admin-menu" theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/admin-dashboard">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/admin-dashboard/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/admin-dashboard/about">About</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/admin-dashboard/reports">Reports</Link>
          </Menu.Item>
        </Menu>
      </Header>

      {}
      <Content className="admin-content">
        <Outlet /> {}
      </Content>

      {}
      <Footer className="admin-footer">
        Admin Dashboard ©2023 Created by Your Company
      </Footer>
    </Layout>
  );
};

export default AdminLayout;