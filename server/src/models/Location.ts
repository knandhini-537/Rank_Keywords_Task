import mongoose, { Schema, Document } from 'mongoose';

export interface ILocation extends Document {
  city: string;
  locality: string;
  landmarks: string[];
  pincode: string;
  state: string;
  popular: boolean;
}

const LocationSchema: Schema = new Schema({
  city: { type: String, required: true, index: true },
  locality: { type: String, required: true, index: true },
  landmarks: [{ type: String }],
  pincode: { type: String, default: '' },
  state: { type: String, default: 'Karnataka' },
  popular: { type: Boolean, default: false }
});

export default mongoose.model<ILocation>('Location', LocationSchema);
