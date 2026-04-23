import mongoose from 'mongoose';

const instructorSchema = mongoose.Schema({
  id: String,
  name: String,
  avatar: String,
  title: String,
});

const courseSchema = mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String },
    category: { type: String },
    level: { type: String },
    language: { type: String },
    price: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    studentsEnrolled: { type: Number, default: 0 },
    duration: { type: String },
    lessons: { type: Number, default: 0 },
    thumbnail: { type: String },
    instructor: instructorSchema,
    progress: { type: Number, default: 0 },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

// Map frontend mock string IDs to MongoDB _id transparently by returning _id as id
courseSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
