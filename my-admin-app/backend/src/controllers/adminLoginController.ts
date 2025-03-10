import { Request, Response } from 'express';
import Admin from '../models/Admin';

export const adminLoginController = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { usernameOrEmail, password } = req.body;

    const admin = await Admin.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    return res.status(500).json({ message: 'Error logging in admin', error });
  }
};
