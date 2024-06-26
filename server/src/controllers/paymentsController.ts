import { Request, Response } from 'express';
import Payments from '../models/Payments';

export const getPayments = async (req: Request, res: Response) => {
    try {
        const payments = await Payments.find().populate('staffId');
        res.json(payments);
    
        
    } catch (error:any) {
        res.status(500).json({ message: 'Failed to retrieve payments', error: error.message });
    }
};

export const createPayment = async (req: Request, res: Response) => {
    try {
      console.log('Create Payment Request Body:', req.body);
      const payment = new Payments(req.body);
      await payment.save();
      const populatedPayment = await Payments.findById(payment._id).populate('staffId');
      res.status(201).json(populatedPayment);
    } catch (error: any) {
      console.error('Error creating payment:', error.message);
      res.status(400).json({ message: 'Failed to create payment', error: error.message });
    }
  };

export const updatePayment = async (req: Request, res: Response) => {
    try {
        const { staffId, amount, date, status } = req.body;
        const payment = new Payments({ staffId, amount, date, status });
        await payment.save();
        res.status(201).json(payment);
    } catch (error:any) {
        console.error("Error creating payment:", error);
        res.status(400).json({ message: 'Failed to create payment', error: error.message });
    }
};

export const  deletePayment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const payment = await Payments.findByIdAndDelete(id)
        if (!payment) {
            return res.status(404).json({ message: 'Payment record not found' });
        }
        res.json({ message: 'Payment successfully deleted' });
    } catch (error:any) {
        res.status(500).json({ message: 'Failed to delete payment', error: error.message });
    }
}