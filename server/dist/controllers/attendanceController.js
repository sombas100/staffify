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
exports.deleteAttendance = exports.updateAttendance = exports.createAttendance = exports.getAttendance = void 0;
const Attendance_1 = __importDefault(require("../models/Attendance"));
const getAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendance = yield Attendance_1.default.find().populate('staffId');
        res.json(attendance);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to retrieve attendance records', error: error.message });
    }
});
exports.getAttendance = getAttendance;
const createAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { staffId, date, status } = req.body;
        const attendance = new Attendance_1.default({ staffId, date, status });
        yield attendance.save();
        const populatedAttendance = yield Attendance_1.default.findById(attendance._id).populate('staffId');
        if (!populatedAttendance) {
            throw new Error('Failed to populate attendance record');
        }
        res.status(201).json(populatedAttendance);
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to create attendance record', error: error.message });
    }
});
exports.createAttendance = createAttendance;
const updateAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const attendance = yield Attendance_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (!attendance) {
            return res.status(400).json({ message: 'Attendance record not found' });
        }
        res.json(attendance);
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to update attendance record', error: error.message });
    }
});
exports.updateAttendance = updateAttendance;
const deleteAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const attendance = yield Attendance_1.default.findByIdAndDelete(id);
        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found ' });
        }
        res.json({ message: 'Attend record deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete attendance record', error: error.message });
    }
});
exports.deleteAttendance = deleteAttendance;
