import { Router } from 'express';
import {
  createProperty,
  getProperties,
  getPropertyById,
  getUserProperties,
  deleteProperty,
} from '../controllers/propertyController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getProperties);
router.get('/my-listings', authMiddleware, getUserProperties);
router.get('/:id', getPropertyById);
router.post('/', authMiddleware, createProperty);
router.delete('/:id', authMiddleware, deleteProperty);

export default router;
