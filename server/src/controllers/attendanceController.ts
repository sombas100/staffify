import { Request, Response } from 'express';
import Attendance from '../models/Attendance';

export const getAttendance = async (req: Request, res: Response) => {
    const attendance = await Attendance.find().populate('staffId');
    res.json(attendance);
};

export const createAttendance = async (req: Request, res: Response) => {
    const { staffId, date, status } = req.body;
    const newAttendance = new Attendance({ staffId, date, status })
    await newAttendance.save();
    res.json(newAttendance);
};