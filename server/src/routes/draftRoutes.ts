import { Router } from 'express';
import { saveDraft, getDraft, deleteDraft } from '../controllers/draftController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/save', authMiddleware, saveDraft);
router.get('/my-draft', authMiddleware, getDraft);
router.delete('/', authMiddleware, deleteDraft);

export default router;
