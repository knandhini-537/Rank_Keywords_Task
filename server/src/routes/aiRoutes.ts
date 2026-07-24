import { Router } from 'express';
import {
  generateAIDescription,
  getSmartPriceRecommendation,
  calculateQualityScore,
  chatAssistant,
} from '../controllers/aiController';

const router = Router();

router.post('/generate-description', generateAIDescription);
router.post('/price-recommendation', getSmartPriceRecommendation);
router.post('/quality-score', calculateQualityScore);
router.post('/chat', chatAssistant);

export default router;
