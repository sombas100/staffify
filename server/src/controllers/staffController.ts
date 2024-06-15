import { Request, Response } from 'express';
import Staff from '../models/Staff';

export const getStaff = async (req: Request, res: Response) => {
    const staff = await Staff.find();
    res.json(staff);
}

export const createStaff = async (req: Request, res: Response) => {
    const { name, role, salary } = req.body;
    const newStaff = new Staff({ name, role, salary})
    await newStaff.save();
    res.json(newStaff);
}