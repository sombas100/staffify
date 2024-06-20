import { Request, Response } from 'express';
import Staff from '../models/Staff';

export const getStaff = async (req: Request, res: Response) => {
    try {
        const staff = await Staff.find();
        res.json(staff);
        
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to retrieve staff member', error: error.message})
    }
    }

export const createStaff = async (req: Request, res: Response) => {
    try {
        const { name, role, salary } = req.body;
        const newStaff = new Staff({ name, role, salary})
        await newStaff.save();
        res.json(newStaff);
        
    } catch (error: any) {
        console.error('Error creating staff member');
        res.status(400).json({ error: error.message });
    }
}

export const updateStaff = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const staff = await Staff.findByIdAndUpdate(id, req.body, { new: true });
        if(!staff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }
        res.json(staff);
    } catch (error: any) {
        res.status(400).json({ message: 'Failed to update staff', error: error.message });
    }
}

export const deleteStaff = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const staff = await Staff.findByIdAndDelete(id);
        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }
        res.json({ message: 'Staff member deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to delete staff', error: error.message });
    }
}