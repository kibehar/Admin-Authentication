import React, { useState } from 'react';
import { Table, Input, Button, Space, Modal, Form, Select, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';

interface User {
  key: string;
  name: string;
  email: string;
  username: string;
  role: string;
}

const Users: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  const [users, setUsers] = useState<User[]>([
    { key: '1', name: 'John Doe', email: 'john@example.com', username: 'johndoe', role: 'Employee' },
    { key: '2', name: 'Jane Smith', email: 'jane@example.com', username: 'janesmith', role: 'Customer' },
  ]);

  const columns: ColumnsType<User> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleCreateUser = () => {
    setIsCreateModalVisible(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    form.setFieldsValue(user); 
    setIsEditModalVisible(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalVisible(true);
  };

  const onCreateUser = (values: User) => {
    const newUser = { ...values, key: (users.length + 1).toString() };
    setUsers([...users, newUser]);
    setIsCreateModalVisible(false);
    message.success('User created successfully!');
  };

  const onEditUser = (values: User) => {
    const updatedUsers = users.map((user) =>
      user.key === selectedUser?.key ? { ...user, ...values } : user
    );
    setUsers(updatedUsers);
    setIsEditModalVisible(false);
    message.success('User updated successfully!');
  };

  const onDeleteUser = () => {
    const updatedUsers = users.filter((user) => user.key !== selectedUser?.key);
    setUsers(updatedUsers);
    setIsDeleteModalVisible(false);
    message.success('User deleted successfully!');
  };

  return (
    <div className="users-container">
      {}
      <div className="search-create-container">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreateUser}
          className="create-user-button"
        >
          Create User
        </Button>
        <Input
          placeholder="Search user"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {}
      <Table
        columns={columns}
        dataSource={filteredUsers.length > 0 ? filteredUsers : users}
        pagination={{ pageSize: 5 }}
      />

      {}
      <Modal
        title="Create User"
        visible={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={onCreateUser}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter the email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please enter the username' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please select the role' }]}
          >
            <Select>
              <Select.Option value="Employee">Employee</Select.Option>
              <Select.Option value="Customer">Customer</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {}
      <Modal
        title="Edit User"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={onEditUser}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter the email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please enter the username' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please select the role' }]}
          >
            <Select>
              <Select.Option value="Employee">Employee</Select.Option>
              <Select.Option value="Customer">Customer</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {}
      <Modal
        title="Delete User"
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onOk={onDeleteUser}
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </div>
  );
};

export default Users;