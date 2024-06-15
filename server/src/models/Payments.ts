import mongoose, { Schema, Document } from 'mongoose';

export interface IPayments extends Document {
    staffId: mongoose.Types.ObjectId;
    amount: number;
    date: Date;
    status: 'paid' | 'pending';
}

const PaymentsSchema: Schema = new Schema({
    staffId: { type: mongoose.Types.ObjectId, ref: 'Staff', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['paid', 'pending'], required: true }
})

export default mongoose.model<IPayments>('Payments', PaymentsSchema);