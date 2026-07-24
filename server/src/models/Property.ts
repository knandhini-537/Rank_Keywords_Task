import mongoose, { Schema, Document } from 'mongoose';

export interface IPropertyMedia {
  url: string;
  filename: string;
  category: 'Photo' | 'Video' | 'Floorplan';
  tag?: string;
  qualityScore?: number;
  qualityBadge?: string;
}

export interface IProperty extends Document {
  owner: mongoose.Types.ObjectId | string;
  listingPackage: 'Free' | 'Silver' | 'Gold' | 'Platinum';
  purpose: 'Sale' | 'Rent' | 'PG';
  category: 'Residential' | 'Commercial' | 'Agricultural';
  propertyType: string;
  location: {
    city: string;
    locality: string;
    landmark?: string;
    address: string;
    pincode: string;
  };
  propertyInfo: {
    bedrooms?: number;
    bathrooms?: number;
    balconies?: number;
    floorNo?: number;
    totalFloors?: number;
    carpetArea?: number;
    superArea?: number;
    areaUnit?: string;
    furnishing?: 'Unfurnished' | 'Semi-Furnished' | 'Furnished';
    ageOfProperty?: string;
    facing?: string;
    possessionStatus?: string;
    openSides?: number;
    washrooms?: number;
    boundaryWall?: boolean;
  };
  pricing: {
    expectedPrice?: number;
    rentAmount?: number;
    securityDeposit?: number;
    maintenance?: number;
    pricePerSqft?: number;
    isNegotiable?: boolean;
    allInclusive?: boolean;
  };
  amenities: string[];
  media: IPropertyMedia[];
  description: {
    text: string;
    title: string;
    aiGenerated?: boolean;
    tone?: string;
  };
  contactDetails: {
    userRole: 'Owner' | 'Agent' | 'Builder';
    name: string;
    email: string;
    phone: string;
    hidePhone?: boolean;
    contactTime?: string;
  };
  qualityScore: number;
  qualityTips?: string[];
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema: Schema = new Schema(
  {
    owner: { type: Schema.Types.Mixed, required: true },
    listingPackage: { type: String, enum: ['Free', 'Silver', 'Gold', 'Platinum'], default: 'Free' },
    purpose: { type: String, enum: ['Sale', 'Rent', 'PG'], required: true },
    category: { type: String, enum: ['Residential', 'Commercial', 'Agricultural'], required: true },
    propertyType: { type: String, required: true },
    location: {
      city: { type: String, required: true },
      locality: { type: String, required: true },
      landmark: { type: String, default: '' },
      address: { type: String, default: '' },
      pincode: { type: String, default: '' },
    },
    propertyInfo: {
      bedrooms: Number,
      bathrooms: Number,
      balconies: Number,
      floorNo: Number,
      totalFloors: Number,
      carpetArea: Number,
      superArea: Number,
      areaUnit: { type: String, default: 'sq.ft' },
      furnishing: String,
      ageOfProperty: String,
      facing: String,
      possessionStatus: String,
      openSides: Number,
      washrooms: Number,
      boundaryWall: Boolean,
    },
    pricing: {
      expectedPrice: Number,
      rentAmount: Number,
      securityDeposit: Number,
      maintenance: Number,
      pricePerSqft: Number,
      isNegotiable: { type: Boolean, default: false },
      allInclusive: { type: Boolean, default: false },
    },
    amenities: [{ type: String }],
    media: [
      {
        url: String,
        filename: String,
        category: { type: String, enum: ['Photo', 'Video', 'Floorplan'], default: 'Photo' },
        tag: String,
        qualityScore: Number,
        qualityBadge: String,
      },
    ],
    description: {
      text: { type: String, default: '' },
      title: { type: String, default: '' },
      aiGenerated: { type: Boolean, default: false },
      tone: { type: String, default: 'Professional' },
    },
    contactDetails: {
      userRole: { type: String, enum: ['Owner', 'Agent', 'Builder'], default: 'Owner' },
      name: String,
      email: String,
      phone: String,
      hidePhone: { type: Boolean, default: false },
      contactTime: String,
    },
    qualityScore: { type: Number, default: 0 },
    qualityTips: [{ type: String }],
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  },
  { timestamps: true }
);

export default mongoose.model<IProperty>('Property', PropertySchema);
