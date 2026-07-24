import { PropertyFormData } from '../types/property';

export const isStepValid = (stepNum: number, data: PropertyFormData): boolean => {
  switch (stepNum) {
    case 1:
      // Package, Purpose, Category, Property Type
      return !!(data.listingPackage && data.purpose && data.category && data.propertyType);
    case 2:
      // Location (City and Locality)
      return !!(data.location?.city && data.location?.locality && data.location.locality.trim().length > 0);
    case 3:
      // Property Info & Pricing
      const areaOk = !!(data.propertyInfo?.carpetArea || data.propertyInfo?.superArea);
      const priceOk = !!(data.pricing?.expectedPrice || data.pricing?.rentAmount);
      const bhkOk = data.category === 'Residential' ? !!data.propertyInfo?.bedrooms : true;
      return areaOk && priceOk && bhkOk;
    case 4:
      // Amenities & Media Upload
      const amenitiesOk = data.amenities && data.amenities.length > 0;
      const mediaOk = data.media && data.media.length > 0;
      return amenitiesOk && mediaOk;
    case 5:
      // Description & Contact Details
      const descOk = !!(data.description?.title && data.description?.text && data.description.text.trim().length > 10);
      const contactOk = !!(data.contactDetails?.name && data.contactDetails?.email && data.contactDetails?.phone);
      return descOk && contactOk;
    case 6:
      // Final Review
      return [1, 2, 3, 4, 5].every((s) => isStepValid(s, data));
    default:
      return false;
  }
};

export const getMissingStepFields = (stepNum: number, data: PropertyFormData): string[] => {
  const missing: string[] = [];
  switch (stepNum) {
    case 1:
      if (!data.listingPackage) missing.push('Listing Package');
      if (!data.purpose) missing.push('Purpose (Sale/Rent/PG)');
      if (!data.category) missing.push('Category (Residential/Commercial/Agricultural)');
      if (!data.propertyType) missing.push('Property Type');
      break;
    case 2:
      if (!data.location?.city) missing.push('City');
      if (!data.location?.locality) missing.push('Locality / Neighborhood');
      break;
    case 3:
      if (data.category === 'Residential' && !data.propertyInfo?.bedrooms) missing.push('Bedrooms (BHK)');
      if (!data.propertyInfo?.carpetArea && !data.propertyInfo?.superArea) missing.push('Carpet / Super Area');
      if (!data.pricing?.expectedPrice && !data.pricing?.rentAmount) missing.push('Expected Price or Rent Amount');
      break;
    case 4:
      if (!data.amenities || data.amenities.length === 0) missing.push('Select at least 1 Amenity');
      if (!data.media || data.media.length === 0) missing.push('Upload at least 1 Photo');
      break;
    case 5:
      if (!data.description?.title) missing.push('Listing Title');
      if (!data.description?.text) missing.push('Property Description');
      if (!data.contactDetails?.name) missing.push('Full Name');
      if (!data.contactDetails?.email) missing.push('Email Address');
      if (!data.contactDetails?.phone) missing.push('Phone Number');
      break;
  }
  return missing;
};
