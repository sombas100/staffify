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
exports.deleteStaff = exports.updateStaff = exports.createStaff = exports.getStaff = void 0;
const Staff_1 = __importDefault(require("../models/Staff"));
const getStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const staff = yield Staff_1.default.find();
        res.json(staff);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to retrieve staff member', error: error.message });
    }
});
exports.getStaff = getStaff;
const createStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, role, salary } = req.body;
        const newStaff = new Staff_1.default({ name, role, salary });
        yield newStaff.save();
        res.json(newStaff);
    }
    catch (error) {
        console.error('Error creating staff member');
        res.status(400).json({ error: error.message });
    }
});
exports.createStaff = createStaff;
const updateStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const staff = yield Staff_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }
        res.json(staff);
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to update staff', error: error.message });
    }
});
exports.updateStaff = updateStaff;
const deleteStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const staff = yield Staff_1.default.findByIdAndDelete(id);
        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }
        res.json({ message: 'Staff member deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete staff', error: error.message });
    }
});
exports.deleteStaff = deleteStaff;
