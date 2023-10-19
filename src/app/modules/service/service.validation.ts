import { z } from 'zod';

const ReviewSchema = z.object({
  reviewer: z.string(),
  review: z.string(),
});

const ServiceSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    image: z.string().min(1),
    price: z.string().min(1),
    category: z.string().min(1),
    whatsInclude: z.array(z.string()).min(1),
    whatsExclude: z.array(z.string()).min(1),
    reviews: z.array(ReviewSchema).optional(),
    details: z.string().min(1),
    ratings: z.string().min(1).optional(),
    serviceType: z.string().min(1),
  }),
});

export default ServiceSchema;
