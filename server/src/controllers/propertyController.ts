import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Property from '../models/Property';
import fs from 'fs';
import path from 'path';

const DB_FILE_PATH = path.join(__dirname, '../../uploads/properties_db.json');

// Helper to load persistent properties from file
const loadPropertiesFromFile = (): any[] => {
  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading properties DB file:', e);
  }
  return initialSeedProperties;
};

// Helper to save properties to file
const savePropertiesToFile = (props: any[]) => {
  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(props, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error writing properties DB file:', e);
  }
};

const initialSeedProperties = [
  {
    _id: 'prop_demo_1',
    owner: 'demo-user-123',
    listingPackage: 'Gold',
    purpose: 'Sale',
    category: 'Residential',
    propertyType: 'Flat/Apartment',
    location: {
      city: 'Bangalore',
      locality: 'HSR Layout Sector 1',
      landmark: 'Near Agara Lake',
      address: '27th Main Road',
      pincode: '560102',
    },
    propertyInfo: {
      bedrooms: 3,
      bathrooms: 3,
      balconies: 2,
      floorNo: 4,
      totalFloors: 12,
      carpetArea: 1650,
      superArea: 1980,
      areaUnit: 'sq.ft',
      furnishing: 'Furnished',
      ageOfProperty: '1-3 Years',
      facing: 'East',
      possessionStatus: 'Ready to Move',
    },
    pricing: {
      expectedPrice: 16500000,
      maintenance: 3500,
      pricePerSqft: 10000,
      isNegotiable: true,
    },
    amenities: ['Gated Security', 'Swimming Pool', 'Gymnasium', 'Power Backup', 'Clubhouse', 'Covered Parking', 'Elevator'],
    media: [
      {
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
        filename: 'living_room.jpg',
        category: 'Photo',
        tag: 'Living Room',
        qualityScore: 95,
        qualityBadge: 'HD Clarity',
      },
    ],
    description: {
      title: 'Luxury 3 BHK Furnished Flat in HSR Layout',
      text: 'Spacious and sunlit 3 BHK flat situated in a premium high-rise gated society in HSR Layout Sector 1.',
      aiGenerated: true,
      tone: 'Luxury',
    },
    contactDetails: {
      userRole: 'Owner',
      name: 'Sriram Owner',
      email: 'sriram@example.com',
      phone: '+91 98765 43210',
      hidePhone: false,
    },
    qualityScore: 95,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'prop_demo_2',
    owner: 'agent-user-456',
    listingPackage: 'Silver',
    purpose: 'Rent',
    category: 'Residential',
    propertyType: 'Villa',
    location: {
      city: 'Bangalore',
      locality: 'Indiranagar',
      landmark: 'Near 100 Feet Road',
      address: '12th Main Road',
      pincode: '560038',
    },
    propertyInfo: {
      bedrooms: 4,
      bathrooms: 4,
      balconies: 3,
      floorNo: 1,
      totalFloors: 2,
      carpetArea: 3200,
      superArea: 3800,
      areaUnit: 'sq.ft',
      furnishing: 'Semi-Furnished',
      ageOfProperty: '0-1 Years',
      facing: 'North-East',
      possessionStatus: 'Ready to Move',
    },
    pricing: {
      rentAmount: 120000,
      securityDeposit: 600000,
      maintenance: 5000,
      pricePerSqft: 37,
      isNegotiable: true,
    },
    amenities: ['Gated Security', 'Private Garden', 'Power Backup', 'Covered Parking', 'Pet Friendly'],
    media: [
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
        filename: 'villa_ext.jpg',
        category: 'Photo',
        tag: 'Exterior',
        qualityScore: 98,
        qualityBadge: 'HD Quality',
      },
    ],
    description: {
      title: 'Independent 4 BHK Luxury Villa in Indiranagar',
      text: 'Exclusive independent 4 BHK villa with private lush garden, modern architectural layout, and ample parking space.',
      aiGenerated: true,
      tone: 'Executive',
    },
    contactDetails: {
      userRole: 'Agent',
      name: 'Rahul Agent',
      email: 'rahul.agent@example.com',
      phone: '+91 91234 56789',
      hidePhone: false,
    },
    qualityScore: 90,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'prop_demo_3',
    owner: 'builder-user-789',
    listingPackage: 'Platinum',
    purpose: 'Sale',
    category: 'Commercial',
    propertyType: 'Office Space',
    location: {
      city: 'Gurgaon',
      locality: 'DLF Cyber City',
      landmark: 'Near Horizon Center',
      address: 'Golf Course Road',
      pincode: '122002',
    },
    propertyInfo: {
      bedrooms: 0,
      bathrooms: 2,
      carpetArea: 2500,
      superArea: 3100,
      areaUnit: 'sq.ft',
      furnishing: 'Furnished',
      facing: 'North',
    },
    pricing: {
      expectedPrice: 35000000,
      maintenance: 12000,
      pricePerSqft: 14000,
      isNegotiable: true,
    },
    amenities: ['Gated Security', '24/7 Power Backup', 'Elevator / Lift', 'EV Charging Station', 'Visitor Parking'],
    media: [
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
        filename: 'office_space.jpg',
        category: 'Photo',
        tag: 'Interior',
        qualityScore: 94,
        qualityBadge: 'HD Quality',
      },
    ],
    description: {
      title: 'Grade A Commercial Office Space in DLF Cyber City',
      text: 'Fully furnished corporate office space in DLF Cyber City with high-speed elevators, 100% power backup, and modern conference rooms.',
      aiGenerated: true,
      tone: 'Professional',
    },
    contactDetails: {
      userRole: 'Builder',
      name: 'DLF Cyber Developers',
      email: 'sales@dlfcyber.com',
      phone: '+91 99887 76655',
      hidePhone: false,
    },
    qualityScore: 96,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const createProperty = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id || 'demo-user-123';
    const propertyData = req.body;

    const newProp = {
      ...propertyData,
      _id: 'prop_' + Date.now(),
      owner: userId,
      status: propertyData.status || 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const currentList = loadPropertiesFromFile();
    currentList.unshift(newProp);
    savePropertiesToFile(currentList);

    try {
      const propDoc = new Property(newProp);
      await propDoc.save();
    } catch (e) {}

    return res.status(201).json({
      success: true,
      message: 'Property created and published successfully!',
      property: newProp,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProperties = async (req: Request, res: Response) => {
  try {
    const { purpose, category, propertyType, city, search } = req.query;

    let results = loadPropertiesFromFile();

    try {
      const dbProps = await Property.find({ status: 'published' }).sort({ createdAt: -1 });
      if (dbProps && dbProps.length > 0) {
        results = dbProps;
      }
    } catch (e) {}

    if (purpose) {
      results = results.filter((p) => p.purpose?.toLowerCase() === (purpose as string).toLowerCase());
    }

    if (category && (category as string).toLowerCase() !== 'all') {
      results = results.filter((p) => p.category?.toLowerCase() === (category as string).toLowerCase());
    }

    if (propertyType) {
      results = results.filter((p) => p.propertyType?.toLowerCase() === (propertyType as string).toLowerCase());
    }

    if (city) {
      results = results.filter((p) => p.location?.city?.toLowerCase().includes((city as string).toLowerCase()));
    }

    if (search) {
      const q = (search as string).toLowerCase();
      results = results.filter(
        (p) =>
          p.description?.title?.toLowerCase().includes(q) ||
          p.location?.locality?.toLowerCase().includes(q) ||
          p.location?.city?.toLowerCase().includes(q) ||
          p.propertyType?.toLowerCase().includes(q) ||
          p.contactDetails?.name?.toLowerCase().includes(q)
      );
    }

    return res.json({
      success: true,
      count: results.length,
      properties: results,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getPropertyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const allProps = loadPropertiesFromFile();
    let prop = allProps.find((p) => p._id.toString() === id);

    try {
      const dbProp = await Property.findById(id);
      if (dbProp) prop = dbProp;
    } catch (e) {}

    if (!prop) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    return res.json({ success: true, property: prop });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserProperties = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id || 'demo-user-123';
    const allProps = loadPropertiesFromFile();
    let userProps = allProps.filter((p) => p.owner?.toString() === userId.toString());

    try {
      const dbProps = await Property.find({ owner: userId }).sort({ createdAt: -1 });
      if (dbProps && dbProps.length > 0) {
        userProps = dbProps;
      }
    } catch (e) {}

    return res.json({
      success: true,
      count: userProps.length,
      properties: userProps,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProperty = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    let allProps = loadPropertiesFromFile();
    allProps = allProps.filter((p) => p._id.toString() !== id.toString());
    savePropertiesToFile(allProps);

    try {
      await Property.findByIdAndDelete(id);
    } catch (e) {}

    return res.json({ success: true, message: 'Property deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
