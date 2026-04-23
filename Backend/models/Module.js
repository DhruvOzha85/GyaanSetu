import mongoose from 'mongoose';

const lessonSchema = mongoose.Schema({
  title: String,
  duration: String,
  type: String, // video, lab, quiz
  completed: { type: Boolean, default: false }
});

const moduleSchema = mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    lessons: [lessonSchema],
  },
  {
    timestamps: true,
  }
);

moduleSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    // ensure lessons get id instead of _id too if needed
    if (ret.lessons) {
      ret.lessons = ret.lessons.map(l => {
        l.id = l._id;
        delete l._id;
        return l;
      });
    }
    return ret;
  }
});

const Module = mongoose.model('Module', moduleSchema);
export default Module;
