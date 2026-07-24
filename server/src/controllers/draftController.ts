import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Draft from '../models/Draft';

// In-memory fallback draft storage for zero-dependency execution
const memoryDrafts: Record<string, any> = {};

export const saveDraft = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id || 'demo-user-123';
    const { stepIndex, formData } = req.body;

    const draftData = {
      user: userId,
      stepIndex: stepIndex || 1,
      formData: formData || {},
      lastSavedAt: new Date()
    };

    memoryDrafts[userId] = draftData;

    try {
      await Draft.findOneAndUpdate(
        { user: userId },
        draftData,
        { upsert: true, new: true }
      );
    } catch (e) {
      // In-memory fallback active
    }

    return res.json({
      success: true,
      message: 'Draft saved successfully',
      draft: draftData
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getDraft = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id || 'demo-user-123';
    let draft = memoryDrafts[userId];

    try {
      const dbDraft = await Draft.findOne({ user: userId });
      if (dbDraft) {
        draft = dbDraft;
      }
    } catch (e) {}

    return res.json({
      success: true,
      draft: draft || null
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteDraft = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id || 'demo-user-123';
    delete memoryDrafts[userId];

    try {
      await Draft.deleteOne({ user: userId });
    } catch (e) {}

    return res.json({ success: true, message: 'Draft cleared successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
