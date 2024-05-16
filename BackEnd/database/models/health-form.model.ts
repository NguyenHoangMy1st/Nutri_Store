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
    weight: { type: String }, // Cân nặng của người dùng
    current_health_conditions: [{ type: String }],
    aiRecommendation: [{ type: String }], // Sản phẩm được gợi ý
  },
  {
    timestamps: true, // Tự động thêm trường createdAt và updatedAt
  }
)

export const HealthFormModel = mongoose.model('health_forms', HealthFormSchema)
