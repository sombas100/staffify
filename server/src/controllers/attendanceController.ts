import { Request, Response } from 'express';
import Attendance from '../models/Attendance';

export const getAttendance = async (req: Request, res: Response) => {
    try {
        const attendance = await Attendance.find().populate('staffId');
        res.json(attendance);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to retrieve attendance records', error: error.message });
    }
};

export const createAttendance = async (req: Request, res: Response) => {
    try {
        const attendance = new Attendance(req.body);
        await attendance.save();
        res.status(201).json(attendance);
    } catch (error:any) {
       res.status(400) .json({ message: 'Failed to create attendance record', error: error.message });
    }
};

export const updateAttendance = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const attendance = await Attendance.findByIdAndUpdate(id, req.body, { new: true });
        if (!attendance) {
            return res.status(400).json({ message: 'Attendance record not found' });
        }
        res.json(attendance);
    } catch (error:any) {
        res.status(400).json({ message: 'Failed to update attendance record', error: error.message });
    }
};

export const deleteAttendance = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const attendance = await Attendance.findByIdAndDelete(id);
        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found '});
        }
        res.json({ message: 'Attend record deleted successfully' });
    } catch (error:any) {
        res.status(500).json({ message: 'Failed to delete attendance record', error: error.message });
    }
}

