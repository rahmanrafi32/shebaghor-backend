import mongoose, { Schema, model } from 'mongoose';

type IFeedbackModel = {
  feedbackerId: mongoose.Schema.Types.ObjectId;
  feedback: string;
};

const feedbackSchema = new Schema<IFeedbackModel>(
  {
    feedbackerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  }
);

const Feedback = model<IFeedbackModel>('Feedback', feedbackSchema);

export default Feedback;
