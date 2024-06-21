"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStaff = exports.updateStaff = exports.createStaff = exports.getStaff = void 0;
const Staff_1 = __importDefault(require("../models/Staff"));
const getStaff = async (req, res) => {
    try {
        const staff = await Staff_1.default.find();
        res.json(staff);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to retrieve staff member', error: error.message });
    }
};
exports.getStaff = getStaff;
const createStaff = async (req, res) => {
    try {
        const { name, role, salary } = req.body;
        const newStaff = new Staff_1.default({ name, role, salary });
        await newStaff.save();
        res.json(newStaff);
    }
    catch (error) {
        console.error('Error creating staff member');
        res.status(400).json({ error: error.message });
    }
};
exports.createStaff = createStaff;
const updateStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const staff = await Staff_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }
        res.json(staff);
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to update staff', error: error.message });
    }
};
exports.updateStaff = updateStaff;
const deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const staff = await Staff_1.default.findByIdAndDelete(id);
        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }
        res.json({ message: 'Staff member deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete staff', error: error.message });
    }
};
exports.deleteStaff = deleteStaff;
