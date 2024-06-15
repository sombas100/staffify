import mongoose, { Schema, Document } from 'mongoose';

export interface IStaff extends Document {
    name: string;
    role: string;
    salary: number;
}

const StaffSchema: Schema = new Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    salary: { type: Number, required: true },
})

export default mongoose.model<IStaff>('Staff', StaffSchema);