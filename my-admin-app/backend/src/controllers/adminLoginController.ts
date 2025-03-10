import { Request, Response, NextFunction } from 'express';
import { comparePassword, generateToken } from '../utils/authUtils';
import { adminUsers } from './adminUsersDB';  

export const adminLoginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { usernameOrEmail, password } = req.body;

    const user = adminUsers.find(
      (user) => user.username === usernameOrEmail || user.email === usernameOrEmail
    );

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = generateToken(user.username);

    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
