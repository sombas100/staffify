"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAttendance = exports.updateAttendance = exports.createAttendance = exports.getAttendance = void 0;
const Attendance_1 = __importDefault(require("../models/Attendance"));
const getAttendance = async (req, res) => {
    try {
        const attendance = await Attendance_1.default.find().populate('staffId');
        res.json(attendance);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to retrieve attendance records', error: error.message });
    }
};
exports.getAttendance = getAttendance;
const createAttendance = async (req, res) => {
    try {
        const { staffId, date, status } = req.body;
        const attendance = new Attendance_1.default({ staffId, date, status });
        await attendance.save();
        const populatedAttendance = await Attendance_1.default.findById(attendance._id).populate('staffId');
        if (!populatedAttendance) {
            throw new Error('Failed to populate attendance record');
        }
        res.status(201).json(populatedAttendance);
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to create attendance record', error: error.message });
    }
};
exports.createAttendance = createAttendance;
const updateAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const attendance = await Attendance_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (!attendance) {
            return res.status(400).json({ message: 'Attendance record not found' });
        }
        res.json(attendance);
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to update attendance record', error: error.message });
    }
};
exports.updateAttendance = updateAttendance;
const deleteAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const attendance = await Attendance_1.default.findByIdAndDelete(id);
        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found ' });
        }
        res.json({ message: 'Attend record deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete attendance record', error: error.message });
    }
};
exports.deleteAttendance = deleteAttendance;
