import mongoose from 'mongoose';

const PackageBoxSchema = new mongoose.Schema({
  size: String,
  quantity: Number,
});

const CreateTicketSchema = new mongoose.Schema({
  protocol_Id: mongoose.Schema.Types.ObjectId,
  gift_id: mongoose.Schema.Types.ObjectId,
  packageBox: PackageBoxSchema,
  date_register: { type: Date, default: Date.now },
  tracking_code: String,
});

export default mongoose.model('CreateTicket', CreateTicketSchema);
