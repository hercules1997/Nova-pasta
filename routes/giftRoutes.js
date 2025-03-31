import express from 'express';
import {
  createGift,
  getGifts,
  validateGiftData,
} from '../controllers/giftController.js';
const router = express.Router();

router.post('/gifts', validateGiftData, createGift);
router.get('/', getGifts);

export default router;
