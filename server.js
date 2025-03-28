// Importando as dependências
const express = require("express");
const mongoose = require("mongoose");

// Importando mongoose

require('dotenv').config(); // Para usar variáveis de ambiente

// Conectar ao MongoDB no Railway
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("🔥 Conectado ao MongoDB no Railway!"))
.catch(err => console.error("Erro ao conectar ao MongoDB:", err));

// Definindo os Schemas
const AddressSchema = new mongoose.Schema({
  logadouro: String,
  number: String,
  cep: Number,
  city: String,
});

const DataAnimalSchema = new mongoose.Schema({
  name: String,
  age: Number,
  sex: String,
  race: String,
  product_consumer: String,
  dietary_restrcton: String,
});

const DataTutorSchema = new mongoose.Schema({
  protocol_Id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  phone: String,
  date: Date,
  address: AddressSchema,
  data_animale: DataAnimalSchema,
});

const StockGiftSchema = new mongoose.Schema({
  gift_id: mongoose.Schema.Types.ObjectId,
  name: String,
  type: String,
  quantity: Number,
  number_nf: Number,
});

const PackageSchema = new mongoose.Schema({
  size: String,
  quantity: Number,
});

const CreateTicketSchema = new mongoose.Schema({
  ticket_id: mongoose.Schema.Types.ObjectId,
  protocol_Id: mongoose.Schema.Types.ObjectId,
  gift_id: mongoose.Schema.Types.ObjectId,
  package: PackageSchema,
});

const ListTicketSchema = new mongoose.Schema({
  ticket_id: mongoose.Schema.Types.ObjectId,
  data_tutor: { name: String },
  protocol_Id: mongoose.Schema.Types.ObjectId,
  gift_id: mongoose.Schema.Types.ObjectId,
  date_register: Date,
  hours: Number,
  tracking_code: String,
});

const DataTutor = mongoose.model("DataTutor", DataTutorSchema);
const StockGift = mongoose.model("StockGift", StockGiftSchema);
const CreateTicket = mongoose.model("CreateTicket", CreateTicketSchema);
const ListTicket = mongoose.model("ListTicket", ListTicketSchema);

// Criando o servidor Express
const app = express();
app.use(express.json());

// Rotas CRUD básicas
app.post("/data-tutor", async (req, res) => {
  const dataTutor = new DataTutor(req.body);
  await dataTutor.save();
  res.send(dataTutor);
});

app.get("/data-tutor", async (req, res) => {
  const tutors = await DataTutor.find();
  res.send(tutors);
});

app.post("/stock-gift", async (req, res) => {
  const stockGift = new StockGift(req.body);
  await stockGift.save();
  res.send(stockGift);
});

app.post("/create-ticket", async (req, res) => {
  const ticket = new CreateTicket(req.body);
  await ticket.save();
  res.send(ticket);
});

app.get("/list-tickets", async (req, res) => {
  const tickets = await ListTicket.find();
  res.send(tickets);
});

// Iniciando o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
