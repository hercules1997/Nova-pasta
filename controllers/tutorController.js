import DataTutor from '../models/DataTutor.js';
import { validationResult } from 'express-validator';

// Função para criar um tutor
const createTutor = async (req, res) => {
  // Validação dos dados de entrada
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const tutor = new DataTutor(req.body);
    await tutor.save();
    res.status(201).json(tutor);
  } catch (error) {
    console.error(error); // Log do erro para análise
    res
      .status(500)
      .json({ message: 'Erro ao criar tutor', error: error.message });
  }
};

// Função para buscar todos os tutores com paginação
const getTutors = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Paginação: página e limite
    const tutors = await DataTutor.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await DataTutor.countDocuments(); // Total de tutores
    const totalPages = Math.ceil(total / limit); // Cálculo de páginas

    res.json({
      tutors,
      page,
      totalPages,
      total,
    });
  } catch (error) {
    console.error(error); // Log do erro para análise
    res
      .status(500)
      .json({ message: 'Erro ao buscar tutores', error: error.message });
  }
};

export { createTutor, getTutors };
