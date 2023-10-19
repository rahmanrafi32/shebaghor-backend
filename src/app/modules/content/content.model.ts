import { Schema, model } from 'mongoose';

type Content = {
  header: string;
  details: string;
};

const contentSchema = new Schema<Content>(
  {
    header: String,
    details: String,
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  }
);

const ContentModel = model('Content', contentSchema);

export default ContentModel;
