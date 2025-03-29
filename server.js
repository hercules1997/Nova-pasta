require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); // Permite trabalhar com JSON no body das requisições

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 Conectado ao MongoDB no Railway!"))
  .catch((err) => console.error("❌ Erro ao conectar no MongoDB:", err));

/* ==================== SCHEMAS ==================== */
// 📌 Schema para Tutor e Animal
const tutorSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  date: Date,
  address: {
    logradouro: String,
    number: String,
    cep: Number,
    city: String,
  },
  data_animale: {
    name: String,
    age: Number,
    sex: String,
    race: String,
    product_consumer: String,
    dietary_restriction: String,
  },
});
const Tutor = mongoose.model("Tutor", tutorSchema);

// 📌 Schema para Estoque de Brindes
const stockGiftSchema = new mongoose.Schema({
  name: String,
  type: String,
  quantity: Number,
  number_nf: Number,
});
const StockGift = mongoose.model("StockGift", stockGiftSchema);

// 📌 Schema para Tickets
const ticketSchema = new mongoose.Schema({
  protocol_Id: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor" },
  gift_id: { type: mongoose.Schema.Types.ObjectId, ref: "StockGift" },
  package: {
    size: String,
    quantity: Number,
  },
  date_register: { type: Date, default: Date.now },
  tracking_code: String,
});
const Ticket = mongoose.model("Ticket", ticketSchema);

/* ==================== ROTAS ==================== */

// 📌 Criar um novo Tutor e Animal
app.post("/data-tutor", async (req, res) => {
  try {
    const newTutor = new Tutor(req.body);
    await newTutor.save();
    res.status(201).json(newTutor);
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar tutor", error });
  }
});

// 📌 Criar um novo Brinde no Estoque
app.post("/stock-gifts", async (req, res) => {
  try {
    const newGift = new StockGift(req.body);
    await newGift.save();
    res.status(201).json(newGift);
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar brinde", error });
  }
});

app.post("/stock-gifts", async (req, res) => {
  console.log("Recebendo requisição para adicionar brinde:", req.body); // Log da requisição
  try {
    const newGift = new StockGift(req.body);
    await newGift.save();
    console.log("Brinde adicionado com sucesso:", newGift); // Log de sucesso
    res.status(201).json(newGift);
  } catch (error) {
    console.error("Erro ao adicionar brinde:", error); // Log do erro
    res.status(500).json({ message: "Erro ao adicionar brinde", error });
  }
});

// 📌 Criar um novo Ticket
app.post("/create-ticket", async (req, res) => {
  try {
    const newTicket = new Ticket(req.body);
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar ticket", error });
  }
});

// 📌 Listar todos os Tickets
app.get("/list-ticket", async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("protocol_Id", "name")
      .populate("gift_id", "name");
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar tickets", error });
  }
});

/* ==================== INICIAR SERVIDOR ==================== */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
