import mongoose, { Schema, Document } from 'mongoose';

export interface IAIRecommendation extends Document {
  propertyId?: mongoose.Types.ObjectId;
  type: 'Price' | 'Description' | 'QualityScore' | 'Chat';
  inputData: Record<string, any>;
  outputData: Record<string, any>;
  createdAt: Date;
}

const AIRecommendationSchema: Schema = new Schema({
  propertyId: { type: Schema.Types.ObjectId, ref: 'Property' },
  type: { type: String, enum: ['Price', 'Description', 'QualityScore', 'Chat'], required: true },
  inputData: { type: Schema.Types.Mixed },
  outputData: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IAIRecommendation>('AIRecommendation', AIRecommendationSchema);
