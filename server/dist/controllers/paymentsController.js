"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayment = exports.updatePayment = exports.createPayment = exports.getPayments = void 0;
const Payments_1 = __importDefault(require("../models/Payments"));
const getPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payments = yield Payments_1.default.find().populate('staffId');
        res.json(payments);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to retrieve payments', error: error.message });
    }
});
exports.getPayments = getPayments;
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Create Payment Request Body:', req.body);
        const payment = new Payments_1.default(req.body);
        yield payment.save();
        const populatedPayment = yield Payments_1.default.findById(payment._id).populate('staffId');
        res.status(201).json(populatedPayment);
    }
    catch (error) {
        console.error('Error creating payment:', error.message);
        res.status(400).json({ message: 'Failed to create payment', error: error.message });
    }
});
exports.createPayment = createPayment;
const updatePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { staffId, amount, date, status } = req.body;
        const payment = new Payments_1.default({ staffId, amount, date, status });
        yield payment.save();
        res.status(201).json(payment);
    }
    catch (error) {
        console.error("Error creating payment:", error);
        res.status(400).json({ message: 'Failed to create payment', error: error.message });
    }
});
exports.updatePayment = updatePayment;
const deletePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const payment = yield Payments_1.default.findByIdAndDelete(id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment record not found' });
        }
        res.json({ message: 'Payment successfully deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete payment', error: error.message });
    }
});
exports.deletePayment = deletePayment;
