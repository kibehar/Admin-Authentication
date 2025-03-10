import { Request, Response } from 'express';
import Admin from '../models/Admin';

export const adminSignupController = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { firstName, lastName, email, username, password, confirmationPassword } = req.body;

    if (password !== confirmationPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const newAdmin = new Admin({ firstName, lastName, email, username, password });
    await newAdmin.save();

    return res.status(201).json({ message: 'Admin user created successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error signing up admin', error });
  }
};
