import mongoose, { Schema, Document } from 'mongoose';

export interface IAttendance extends Document {
    staffId: mongoose.Types.ObjectId;
    date: Date;
    status: 'present' | 'absent' | 'leave';
}

const AttendanceSchema: Schema = new Schema({
    staffId: { type: mongoose.Types.ObjectId, ref: 'Staff', required: true },
    date: { type: Date, required: true},
    status: { type: String, enum: ['present', 'absent', 'leave'], required: true},
});

export default mongoose.model<IAttendance>('Attendance', AttendanceSchema);