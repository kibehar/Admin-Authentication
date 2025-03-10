import { Request, Response } from 'express';

const tempMemory: Record<string, any> = {};

export const createUser = (req: Request, res: Response): Response => {
  const { id, name, email, password } = req.body;
  
  if (tempMemory[id]) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  tempMemory[id] = { id, name, email, password };
  
  return res.status(201).json({ message: 'User created successfully', user: tempMemory[id] });
};

export const editUser = (req: Request, res: Response): Response => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  if (!tempMemory[id]) {
    return res.status(404).json({ message: 'User not found' });
  }

  tempMemory[id] = { ...tempMemory[id], name, email, password };
  
  return res.status(200).json({ message: 'User updated successfully', user: tempMemory[id] });
};

export const deleteUser = (req: Request, res: Response): Response => {
  const { id } = req.params;

  if (!tempMemory[id]) {
    return res.status(404).json({ message: 'User not found' });
  }

  delete tempMemory[id];
  
  return res.status(200).json({ message: 'User deleted successfully' });
};
