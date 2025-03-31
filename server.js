import express from 'express';
import connectDB from './config/db.js';
import tutorRoutes from './routes/tutorRoutes.js';
import giftRoutes from './routes/giftRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';

connectDB();

const app = express();
app.use(express.json());

app.use('/tutors', tutorRoutes);
app.use('/gifts', giftRoutes);
app.use('/tickets', ticketRoutes);

app.listen(3000, () => console.log('✅ Servidor rodando na porta 3000'));
