import mongoose, { Schema, Document } from 'mongoose';

export interface IMedia extends Document {
  filename: string;
  originalName: string;
  url: string;
  mimeType: string;
  size: number;
  category: 'Photo' | 'Video' | 'Floorplan';
  tag?: string; // e.g. Living Room, Bedroom, Exterior
  qualityScore?: number;
  qualityBadge?: string;
  qualityIssues?: string[];
  createdAt: Date;
}

const MediaSchema: Schema = new Schema({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  url: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  category: { type: String, enum: ['Photo', 'Video', 'Floorplan'], default: 'Photo' },
  tag: { type: String, default: 'General' },
  qualityScore: { type: Number, default: 85 },
  qualityBadge: { type: String, default: 'Good Clarity' },
  qualityIssues: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IMedia>('Media', MediaSchema);
