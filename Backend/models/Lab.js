import mongoose from 'mongoose';

const labSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    difficulty: { type: String },
    duration: { type: String },
    thumbnail: { type: String },
    language: { type: String },
    rating: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

labSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Lab = mongoose.model('Lab', labSchema);
export default Lab;
