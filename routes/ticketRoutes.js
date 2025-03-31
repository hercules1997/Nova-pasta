import express from 'express';
import {
  createTicket,
  getTickets,
  validateTicketData,
} from '../controllers/ticketController.js';
import { validationResult } from 'express-validator';

const router = express.Router();

// Rota para criar um ticket com validação
router.post(
  '/',
  validateTicketData,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Passar para o próximo middleware, que é a criação do ticket
  },
  createTicket,
);

// Rota para buscar tickets
router.get('/', getTickets);

export default router;
