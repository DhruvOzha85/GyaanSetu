import mongoose from 'mongoose';

const projectSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    difficulty: { type: String },
    duration: { type: String },
    thumbnail: { type: String },
    technologies: [String],
  },
  {
    timestamps: true,
  }
);

projectSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
