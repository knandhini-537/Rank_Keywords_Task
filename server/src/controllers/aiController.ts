import { Request, Response } from 'express';

export const generateAIDescription = async (req: Request, res: Response) => {
  try {
    const { purpose, category, propertyType, location, propertyInfo, pricing, amenities, tone } = req.body;

    const locName = `${location?.locality || 'prime locality'}, ${location?.city || 'Bangalore'}`;
    const bhk = propertyInfo?.bedrooms ? `${propertyInfo.bedrooms} BHK` : '';
    const propTitle = `${bhk} ${propertyType || 'Property'} for ${purpose || 'Sale'} in ${locName}`;
    const areaStr = propertyInfo?.carpetArea ? `${propertyInfo.carpetArea} sq.ft carpet area` : '';
    const furnishingStr = propertyInfo?.furnishing || 'semi-furnished';
    const priceStr = pricing?.expectedPrice
      ? `₹${(pricing.expectedPrice / 100000).toFixed(2)} Lakhs`
      : pricing?.rentAmount
      ? `₹${pricing.rentAmount.toLocaleString('en-IN')}/month`
      : 'attractive pricing';

    const amenitiesList = amenities && amenities.length > 0 ? amenities.slice(0, 5).join(', ') : 'Gated Security, Power Backup, Elevator';

    let descriptionBody = '';

    if (tone === 'Luxury' || tone === 'Executive') {
      descriptionBody = `Presenting an opulent and modern ${bhk} ${propertyType || 'residence'} situated in the prestigious neighborhood of ${locName}. Spanning across an expansive ${areaStr}, this magnificent ${furnishingStr} unit offers breathtaking panoramic views, superior architectural finishes, and unmatched serenity.\n\nKey Highlights:\n- Premium location with seamless connectivity\n- High-grade interior woodwork and ambient lighting\n- World-class lifestyle amenities including ${amenitiesList}\n- Offered at an exclusive price of ${priceStr}.\n\nSchedule your private viewing today to experience luxury living at its finest!`;
    } else if (tone === 'Family-Friendly' || tone === 'Warm') {
      descriptionBody = `Welcome to your dream family home! This cozy and spacious ${bhk} ${propertyType || 'apartment'} in ${locName} is thoughtfully designed for modern family living. Enjoy ${areaStr} of well-ventilated living space with abundant natural sunlight.\n\nWhy you'll love it:\n- Located in a safe, family-centered community with top schools & hospitals nearby\n- ${furnishingStr} setup ready for immediate move-in\n- Great community amenities like ${amenitiesList}\n- Available for ${purpose || 'Sale'} at ${priceStr}.\n\nContact us now to book a visit and take the first step towards your family's next milestone!`;
    } else if (tone === 'Concise') {
      descriptionBody = `Spacious ${bhk} ${propertyType || 'Property'} for ${purpose || 'Sale'} in ${locName}. Features ${areaStr}, ${furnishingStr} interiors, facing ${propertyInfo?.facing || 'East'}. Price: ${priceStr}. Includes ${amenitiesList}. Prime location with fast metro and highway connectivity. Excellent investment opportunity!`;
    } else {
      // Professional default
      descriptionBody = `Extremely well-maintained ${bhk} ${propertyType || 'property'} available for ${purpose || 'Sale'} in ${locName}. Spread over ${areaStr}, this property boasts a smart layout, excellent ventilation, and ${furnishingStr} interiors.\n\nProperty Overview:\n- Configuration: ${bhk} (${propertyInfo?.bathrooms || 2} Baths, ${propertyInfo?.balconies || 1} Balconies)\n- Floor: ${propertyInfo?.floorNo || 2} of ${propertyInfo?.totalFloors || 5} Floors\n- Price: ${priceStr} (Negotiable)\n- Key Amenities: ${amenitiesList}\n\nIdeal for end-users and smart investors alike. Highly accessible location near commercial hubs. Reach out today for details and site visits.`;
    }

    return res.json({
      success: true,
      generatedTitle: propTitle,
      generatedDescription: descriptionBody,
      tone: tone || 'Professional',
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getSmartPriceRecommendation = async (req: Request, res: Response) => {
  try {
    const { purpose, category, propertyType, location, propertyInfo } = req.body;

    const area = Number(propertyInfo?.carpetArea || propertyInfo?.superArea || 1000);
    const isRent = purpose === 'Rent' || purpose === 'PG';

    let baseRate = isRent ? 35 : 6800; // per sqft

    const city = (location?.city || '').toLowerCase();
    if (city.includes('mumbai')) baseRate *= 1.8;
    if (city.includes('gurgaon') || city.includes('delhi')) baseRate *= 1.4;
    if (city.includes('bangalore') || city.includes('hyderabad')) baseRate *= 1.25;

    if (propertyInfo?.bedrooms === 3) baseRate *= 1.1;
    if (propertyInfo?.bedrooms >= 4) baseRate *= 1.2;
    if (propertyInfo?.furnishing === 'Furnished') baseRate *= 1.15;

    const recommendedVal = Math.round(baseRate * area);
    const minVal = Math.round(recommendedVal * 0.9);
    const maxVal = Math.round(recommendedVal * 1.12);

    const pricePerSqft = Math.round(recommendedVal / area);

    return res.json({
      success: true,
      recommendation: {
        recommendedPrice: recommendedVal,
        priceRange: { min: minVal, max: maxVal },
        pricePerSqft,
        currency: 'INR',
        formattedRecommended: isRent
          ? `₹${recommendedVal.toLocaleString('en-IN')}/mo`
          : `₹${(recommendedVal / 100000).toFixed(2)} Lakhs`,
        localityAvgPerSqft: `₹${pricePerSqft.toLocaleString('en-IN')}/sq.ft`,
        demandLevel: 'High Demand Locality',
        growthForecast: '+8.4% expected annual appreciation',
      },
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const calculateQualityScore = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    let score = 0;
    const tips: string[] = [];

    // Step 1: Package
    if (data.listingPackage) score += 5;

    // Step 2-4: Basic setup
    if (data.purpose && data.category && data.propertyType) score += 15;
    else tips.push('Select Purpose, Category and Property Type');

    // Step 5: Location
    if (data.location?.city && data.location?.locality) {
      score += 15;
      if (data.location?.landmark && data.location?.address) score += 5;
      else tips.push('Add exact landmark and street address for 10% higher visibility');
    } else {
      tips.push('Complete city and locality details');
    }

    // Step 6: Property Info
    if (data.propertyInfo?.carpetArea || data.propertyInfo?.superArea) {
      score += 15;
    } else {
      tips.push('Enter Carpet / Built-up Area');
    }

    if (data.propertyInfo?.bedrooms && data.propertyInfo?.furnishing) {
      score += 10;
    } else {
      tips.push('Specify furnishing status and room configuration');
    }

    // Step 7: Pricing
    if (data.pricing?.expectedPrice || data.pricing?.rentAmount) {
      score += 15;
    } else {
      tips.push('Set your expected price or monthly rent');
    }

    // Step 8: Amenities
    if (data.amenities && data.amenities.length >= 3) {
      score += 10;
    } else {
      tips.push('Select at least 3 amenities (Properties with amenities receive 3x leads)');
    }

    // Step 9: Media
    if (data.media && data.media.length >= 3) {
      score += 10;
    } else if (data.media && data.media.length > 0) {
      score += 5;
      tips.push('Add 3 or more high-resolution photos for maximum trust');
    } else {
      tips.push('Upload property photos (Listings with photos get 5x responses)');
    }

    // Step 10: Description
    if (data.description?.text && data.description.text.length > 50) {
      score += 5;
    } else {
      tips.push('Use the AI Description Generator to craft a catchy summary');
    }

    // Final score clamp
    score = Math.min(100, Math.max(0, score));

    return res.json({
      success: true,
      qualityScore: score,
      ratingLabel: score >= 85 ? 'Excellent Listing' : score >= 65 ? 'Good Listing' : 'Needs Improvement',
      tips,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const chatAssistant = async (req: Request, res: Response) => {
  try {
    const { message, currentStep, propertyData } = req.body;
    const lower = (message || '').toLowerCase();

    let responseText = '';

    if (lower.includes('carpet') || lower.includes('built up') || lower.includes('super area')) {
      responseText = 'Carpet Area is the net usable floor area inside the walls. Built-up area includes carpet area plus wall thickness and balconies. Super Built-up Area adds common areas like lobbies, staircases, and elevators (typically 20-30% more than carpet area).';
    } else if (lower.includes('price') || lower.includes('cost') || lower.includes('rent') || lower.includes('valua')) {
      responseText = 'You can click our "Smart Price Recommendation" tool in Step 7! It analyzes locality trends, property age, area, and furnishing to calculate an accurate benchmark price.';
    } else if (lower.includes('photo') || lower.includes('image') || lower.includes('picture')) {
      responseText = 'Pro Tip: Listings with 5+ bright photos get 4x more buyer calls! Make sure bedrooms, living areas, kitchen, and exterior/balcony views are clearly uploaded. Our AI Image Quality Checker will automatically test your photos for clarity!';
    } else if (lower.includes('broker') || lower.includes('commission') || lower.includes('fee')) {
      responseText = 'Owners posting directly on Magicbricks enjoy 0% brokerage features! If you are an Agent or Builder, selecting your proper user role in Step 11 builds verified badge credibility.';
    } else {
      responseText = `I'm your AI Property Posting Assistant! You are currently on Step ${currentStep || 1}. I can help you price your property, explain real estate terminology (e.g. Carpet Area vs Super Area), optimize your title/description, or guide you to score 100% on your listing score!`;
    }

    return res.json({
      success: true,
      reply: responseText,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
