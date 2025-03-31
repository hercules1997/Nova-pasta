import StockGift from '../models/StockGift.js';
import { body, validationResult } from 'express-validator';

const validateGiftData = [
  body('name').isString().withMessage('O nome do brinde deve ser uma string'),
  body('type').isString().withMessage('O tipo do brinde deve ser uma string'),
  body('quantity')
    .isNumeric()
    .withMessage('A quantidade do brinde deve ser um número'),
  body('number_nf')
    .isNumeric()
    .withMessage('O número da nota fiscal do brinde deve ser um número'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const createGift = async (req, res) => {
  try {
    const gift = new StockGift(req.body);
    await gift.save();
    res.status(201).json(gift);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar brinde', error });
  }
};


// Função para buscar brindes
const getGifts = async (req, res) => {
  try {
    const { name } = req.query;
    const query = name ? { name: { $regex: new RegExp(name, 'i') } } : {};

    const gifts = await StockGift.find(query);

    if (gifts.length === 0) {
      return res.status(404).json({ message: 'Nenhum brinde encontrado' });
    }

    res.status(200).json(gifts);
  } catch (error) {
    console.error('Erro ao buscar brindes:', error.message);
    res
      .status(500)
      .json({ message: 'Erro ao buscar brindes', error: error.message });
  }
};

export { getGifts, createGift, validateGiftData };
