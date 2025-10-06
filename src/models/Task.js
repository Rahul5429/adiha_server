import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  deadline: { type: Date },
  status: { type: String, enum: ['completed', 'incomplete'], default: 'incomplete' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' }
}, { timestamps: true })

export default mongoose.model('Task', taskSchema)
