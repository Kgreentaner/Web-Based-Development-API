import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  campus: { type: String, required: true },
  workshop: { type: String }
});

export default mongoose.model('Request', RequestSchema);