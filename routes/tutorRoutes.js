import express from 'express';
import { createTutor, getTutors } from '../controllers/tutorController.js';
import { body } from 'express-validator';

// Função para validar dados do tutor
const validateTutorData = [
  body('name').notEmpty().withMessage('O nome é obrigatório'),
  body('email').isEmail().withMessage('O email deve ser válido'),
  body('phone').notEmpty().withMessage('O telefone é obrigatório'),
  body('address').notEmpty().withMessage('O endereço é obrigatório'),
  // Adicione outras validações conforme necessário
];

const router = express.Router();

// Rota de criação de tutor com validação
router.post('/', validateTutorData, createTutor);
router.get('/', getTutors);

export default router;
