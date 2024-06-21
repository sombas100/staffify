"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayment = exports.updatePayment = exports.createPayment = exports.getPayments = void 0;
const Payments_1 = __importDefault(require("../models/Payments"));
const getPayments = async (req, res) => {
    try {
        const payments = await Payments_1.default.find().populate('staffId');
        res.json(payments);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to retrieve payments', error: error.message });
    }
};
exports.getPayments = getPayments;
const createPayment = async (req, res) => {
    try {
        console.log('Create Payment Request Body:', req.body);
        const payment = new Payments_1.default(req.body);
        await payment.save();
        const populatedPayment = await Payments_1.default.findById(payment._id).populate('staffId');
        res.status(201).json(populatedPayment);
    }
    catch (error) {
        console.error('Error creating payment:', error.message);
        res.status(400).json({ message: 'Failed to create payment', error: error.message });
    }
};
exports.createPayment = createPayment;
const updatePayment = async (req, res) => {
    try {
        const { staffId, amount, date, status } = req.body;
        const payment = new Payments_1.default({ staffId, amount, date, status });
        await payment.save();
        res.status(201).json(payment);
    }
    catch (error) {
        console.error("Error creating payment:", error);
        res.status(400).json({ message: 'Failed to create payment', error: error.message });
    }
};
exports.updatePayment = updatePayment;
const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payments_1.default.findByIdAndDelete(id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment record not found' });
        }
        res.json({ message: 'Payment successfully deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete payment', error: error.message });
    }
};
exports.deletePayment = deletePayment;
