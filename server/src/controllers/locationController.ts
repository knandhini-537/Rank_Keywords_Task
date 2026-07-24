import { Request, Response } from 'express';

const MOCK_LOCATIONS = [
  // Bangalore
  { city: 'Bangalore', locality: 'HSR Layout', landmarks: ['BDA Complex', 'Sector 1 Park', 'Agara Lake'], pincode: '560102', state: 'Karnataka', popular: true },
  { city: 'Bangalore', locality: 'Indiranagar', landmarks: ['100 Feet Road', 'Metro Station', 'Toit'], pincode: '560038', state: 'Karnataka', popular: true },
  { city: 'Bangalore', locality: 'Koramangala', landmarks: ['Forum Mall', '5th Block', 'Sony Signal'], pincode: '560095', state: 'Karnataka', popular: true },
  { city: 'Bangalore', locality: 'Whitefield', landmarks: ['ITPL', 'Phoenix Marketcity', 'Hope Farm'], pincode: '560066', state: 'Karnataka', popular: true },
  { city: 'Bangalore', locality: 'Electronic City', landmarks: ['Infosys Campus', 'Phase 1', 'Toll Plaza'], pincode: '560100', state: 'Karnataka', popular: true },
  { city: 'Bangalore', locality: 'Bellandur', landmarks: ['Ecospace', 'Outer Ring Road', 'Central Mall'], pincode: '560103', state: 'Karnataka', popular: true },
  
  // Mumbai
  { city: 'Mumbai', locality: 'Bandra West', landmarks: ['Linking Road', 'Carter Road', 'Bandstand'], pincode: '400050', state: 'Maharashtra', popular: true },
  { city: 'Mumbai', locality: 'Andheri East', landmarks: ['MIDC', 'Chaka Metro Station', 'Airport Road'], pincode: '400069', state: 'Maharashtra', popular: true },
  { city: 'Mumbai', locality: 'Powai', landmarks: ['Hiranandani Gardens', 'IIT Bombay', 'Powai Lake'], pincode: '400076', state: 'Maharashtra', popular: true },
  { city: 'Mumbai', locality: 'Lower Parel', landmarks: ['Phoenix Mills', 'World Trade Center', 'Currey Road'], pincode: '400013', state: 'Maharashtra', popular: true },

  // Delhi NCR
  { city: 'Gurgaon', locality: 'DLF Phase 5', landmarks: ['Golf Course Road', 'Horizon Center', 'Club 5'], pincode: '122002', state: 'Haryana', popular: true },
  { city: 'Gurgaon', locality: 'Cyber City', landmarks: ['Cyber Hub', 'IndusInd Metro', 'Ambience Mall'], pincode: '122008', state: 'Haryana', popular: true },
  { city: 'Noida', locality: 'Sector 62', landmarks: ['Fortis Hospital', 'Logix Cyber Park', 'Noida Electronic City'], pincode: '201301', state: 'Uttar Pradesh', popular: true },

  // Hyderabad
  { city: 'Hyderabad', locality: 'Gachibowli', landmarks: ['DLF Cyber City', 'ORR Junction', 'IIIT Hyderabad'], pincode: '500032', state: 'Telangana', popular: true },
  { city: 'Hyderabad', locality: 'Hitech City', landmarks: ['Cyber Towers', 'Mindspace', 'Inorbit Mall'], pincode: '500081', state: 'Telangana', popular: true },

  // Pune
  { city: 'Pune', locality: 'Kharadi', landmarks: ['EON IT Park', 'World Trade Center', 'Radisson Blu'], pincode: '411014', state: 'Maharashtra', popular: true },
  { city: 'Pune', locality: 'Baner', landmarks: ['High Street', 'Balewadi Phata', 'Biodiversity Park'], pincode: '411045', state: 'Maharashtra', popular: true }
];

export const searchLocations = async (req: Request, res: Response) => {
  try {
    const query = (req.query.q as string || '').toLowerCase().trim();
    if (!query) {
      return res.json({ success: true, locations: MOCK_LOCATIONS.filter(l => l.popular) });
    }

    const matches = MOCK_LOCATIONS.filter(item => 
      item.city.toLowerCase().includes(query) ||
      item.locality.toLowerCase().includes(query) ||
      item.landmarks.some(lm => lm.toLowerCase().includes(query)) ||
      item.pincode.includes(query)
    );

    return res.json({
      success: true,
      locations: matches.length > 0 ? matches : MOCK_LOCATIONS.slice(0, 5)
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getPopularCities = async (req: Request, res: Response) => {
  const cities = Array.from(new Set(MOCK_LOCATIONS.map(l => l.city)));
  return res.json({ success: true, cities });
};
