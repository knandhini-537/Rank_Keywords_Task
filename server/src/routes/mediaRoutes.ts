import { Router } from 'express';
import { uploadMedia, checkImageQuality } from '../controllers/mediaController';
import { upload } from '../middleware/uploadMiddleware';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/upload', authMiddleware, upload.array('files', 10), uploadMedia);
router.post('/quality-check', authMiddleware, checkImageQuality);

export default router;
