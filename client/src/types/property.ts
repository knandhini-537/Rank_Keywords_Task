export type PurposeType = 'Sale' | 'Rent' | 'PG';

export type CategoryType = 'Residential' | 'Commercial' | 'Agricultural';

export type ListingPackageType = 'Free' | 'Silver' | 'Gold' | 'Platinum';

export interface PropertyLocation {
  city: string;
  locality: string;
  landmark?: string;
  address: string;
  pincode: string;
}

export interface PropertyInformation {
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
}

export interface PropertyPricing {
  expectedPrice?: number;
  rentAmount?: number;
  securityDeposit?: number;
  maintenance?: number;
  pricePerSqft?: number;
  isNegotiable?: boolean;
  allInclusive?: boolean;
}

export interface MediaItem {
  id?: string;
  url: string;
  filename: string;
  category: 'Photo' | 'Video' | 'Floorplan';
  tag?: string;
  qualityScore?: number;
  qualityBadge?: string;
  qualityIssues?: string[];
}

export interface PropertyDescription {
  title: string;
  text: string;
  aiGenerated?: boolean;
  tone?: string;
}

export interface ContactDetails {
  userRole: 'Owner' | 'Agent' | 'Builder';
  name: string;
  email: string;
  phone: string;
  hidePhone?: boolean;
  contactTime?: string;
}

export interface PropertyFormData {
  _id?: string;
  listingPackage: ListingPackageType;
  purpose: PurposeType;
  category: CategoryType;
  propertyType: string;
  location: PropertyLocation;
  propertyInfo: PropertyInformation;
  pricing: PropertyPricing;
  amenities: string[];
  media: MediaItem[];
  description: PropertyDescription;
  contactDetails: ContactDetails;
  qualityScore?: number;
  qualityTips?: string[];
  status?: 'draft' | 'published';
}
