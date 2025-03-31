import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
  logradouro: String,
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
  dietary_restriction: String,
});

const DataTutorSchema = new mongoose.Schema({
  protocol_Id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  phone: String,
  date: Date,
  address: AddressSchema,
  data_animal: DataAnimalSchema,
});

export default mongoose.model('DataTutor', DataTutorSchema);
