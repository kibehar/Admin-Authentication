import { Request, Response, NextFunction } from 'express';
import { hashPassword } from '../utils/authUtils';
import { adminUsers } from './adminUsersDB';  // Temporary user database (can be replaced with MongoDB later)

export const adminSignupController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, username, password, confirmationPassword } = req.body;

    // Check if username or email already exists
    const existingUser = adminUsers.find(
      (user) => user.username === username || user.email === email
    );

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Check if passwords match
    if (password !== confirmationPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Hash the password before saving
    const hashedPassword = await hashPassword(password);

    // Save the user (for now we use a temporary in-memory array)
    adminUsers.push({ firstName, lastName, email, username, password: hashedPassword });

    return res.status(201).json({ message: 'Admin user created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
