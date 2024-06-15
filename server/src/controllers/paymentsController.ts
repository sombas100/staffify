import { Request, Response } from 'express';
import Payments from '../models/Payments';

export const getPayments = async (req: Request, res: Response) => {
    const payments = await Payments.find().populate('staffId');
    res.json(payments);
}

export const createPayments = async (req: Request, res: Response) => {
    const { staffId, amount, date, status } = req.body;
    const newPayment = new Payments({ staffId, amount, date, status });
    await newPayment.save();
    res.json(newPayment);
}