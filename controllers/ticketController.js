import CreateTicket from '../models/CreateTicket.js';
import DataTutor from '../models/DataTutor.js';
import StockGift from '../models/StockGift.js';
import { body, validationResult } from 'express-validator';

// Validação de dados de entrada
const validateTicketData = [
  body('protocol_Id').notEmpty().withMessage('O protocolo é obrigatório'),
  body('gift_id').notEmpty().withMessage('O ID do brinde é obrigatório'),
  body('packageBox').notEmpty().withMessage('O pacote é obrigatório'),
];

// Função para criar um ticket
const createTicket = async (req, res) => {
  // Validar dados de entrada
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { protocol_Id, gift_id, packageBox } = req.body;

    // Verificar se o tutor existe
    const tutor = await DataTutor.findById(protocol_Id);
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor não encontrado' });
    }

    // Verificar se o brinde existe
    const gift = await StockGift.findById(gift_id);
    if (!gift) {
      return res.status(404).json({ message: 'Brinde não encontrado' });
    }

    // Verificar se já existe um ticket com o mesmo protocolo e brinde
    const existingTicket = await CreateTicket.findOne({ protocol_Id, gift_id });
    if (existingTicket) {
      return res
        .status(400)
        .json({ message: 'Ticket já foi criado para este tutor e brinde' });
    }

    // Criar o novo ticket
    const newTicket = new CreateTicket({
      protocol_Id,
      gift_id,
      packageBox,
      tracking_code: `TRK-${Date.now()}`,
    });

    // Salvar o ticket no banco de dados
    await newTicket.save();

    // Resposta de sucesso com o ticket criado
    res.status(201).json(newTicket);
  } catch (error) {
    console.error('Erro ao criar ticket:', error.message); // Log do erro com mensagem mais clara
    res
      .status(500)
      .json({ message: 'Erro ao criar ticket', error: error.message });
  }
};

// Função para buscar todos os tickets com paginação
const getTickets = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Paginação: página e limite

    const tickets = await CreateTicket.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await CreateTicket.countDocuments(); // Total de tickets
    const totalPages = Math.ceil(total / limit); // Cálculo de páginas

    res.json({
      tickets,
      page,
      totalPages,
      total,
    });
  } catch (error) {
    console.error('Erro ao buscar tickets:', error.message); // Log do erro com mensagem mais clara
    res
      .status(500)
      .json({ message: 'Erro ao buscar tickets', error: error.message });
  }
};

export { createTicket, getTickets, validateTicketData };
