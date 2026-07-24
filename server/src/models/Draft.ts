import mongoose, { Schema, Document } from 'mongoose';

export interface IDraft extends Document {
  user: mongoose.Types.ObjectId | string;
  stepIndex: number;
  formData: Record<string, any>;
  lastSavedAt: Date;
}

const DraftSchema: Schema = new Schema({
  user: { type: Schema.Types.Mixed, required: true },
  stepIndex: { type: Number, default: 1 },
  formData: { type: Schema.Types.Mixed, default: {} },
  lastSavedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IDraft>('Draft', DraftSchema);
