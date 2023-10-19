import mongoose, { Schema } from 'mongoose';

export type IServices = {
  name: string;
  image: string;
  price: string;
  category: string;
  whatsInclude: string[];
  whatsExclude: string[];
  reviews?: {
    reviewer: string;
    review: string;
  }[];
  details: string;
  ratings: string;
  serviceType: string;
};

const serviceSchema = new Schema<IServices>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    whatsInclude: {
      type: [String],
      required: true,
    },
    whatsExclude: {
      type: [String],
      required: true,
    },
    reviews: {
      type: [
        {
          reviewer: Schema.Types.String,
          review: Schema.Types.String,
        },
      ],
    },
    details: {
      type: String,
      required: true,
    },
    ratings: {
      type: String,
      default: '0',
    },
    serviceType: {
      type: String,
      default: 'regular',
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

const ServiceModel = mongoose.model<IServices>('Service', serviceSchema);

export default ServiceModel;
