import mongoose, { Schema } from 'mongoose'

const HealthFormSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    sex: { type: String },
    height: { type: String }, // Chiều cao của người dùng
    age: { type: String },
    weight: { type: String },
    current_health_conditions: [{ type: String }],
    // dietary_restrictions: { type: String },
    aiRecommendation: [{ type: String }],
  },
  {
    timestamps: true,
  }
)

export const HealthFormModel = mongoose.model('health_forms', HealthFormSchema)
