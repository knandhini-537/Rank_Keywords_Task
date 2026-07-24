import { Router } from 'express';
import { searchLocations, getPopularCities } from '../controllers/locationController';

const router = Router();

router.get('/search', searchLocations);
router.get('/cities', getPopularCities);

export default router;
