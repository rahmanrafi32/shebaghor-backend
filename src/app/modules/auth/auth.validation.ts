import { z } from 'zod';
import { user } from '../../../enums/user';

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
export const createUser = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'email is required',
      })
      .refine((email) => emailRegex.test(email), {
        message: 'Invalid email format',
      }),
    firstName: z.string({
      required_error: 'First name is required',
    }),
    lastName: z.string({
      required_error: 'Last name is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
    houseNo: z
      .string({
        required_error: 'House no is required',
      })
      .optional(),
    roadNo: z
      .string({
        required_error: 'Road no is required',
      })
      .optional(),
    floor: z
      .string({
        required_error: 'Floor is required',
      })
      .optional(),
    area: z
      .string({
        required_error: 'Area is required',
      })
      .optional(),
    role: z
      .enum([...user] as [string, ...string[]], {
        required_error: 'proper role is required.',
      })
      .optional(),
    contactNo: z.string({
      required_error: 'contact no is required',
    }),
  }),
});

export const updateUser = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'email is required',
      })
      .refine((email) => emailRegex.test(email), {
        message: 'Invalid email format',
      })
      .optional(),
    firstName: z
      .string({
        required_error: 'First name is required',
      })
      .optional(),
    lastName: z
      .string({
        required_error: 'Last name is required',
      })
      .optional(),
    password: z
      .string({
        required_error: 'password is required',
      })
      .optional(),
    role: z
      .enum([...user] as [string, ...string[]], {
        required_error: 'proper role is required.',
      })
      .optional(),
    contactNo: z
      .string({
        required_error: 'contact no is required',
      })
      .optional(),
  }),
});

export const signInUser = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'email is required',
      })
      .refine((email) => emailRegex.test(email), {
        message: 'Invalid email format',
      }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
});
