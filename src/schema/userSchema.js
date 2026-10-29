import { z } from 'zod';

export const userSchema = z.object({
  name: z
    .string('Name is required')
    .trim()
    .min(3, 'Username must be atleast 3 characters long')
    .max(20, 'Username cannot exceed 20 characters'),
  email: z
    .string('Email is required')
    .trim()
    .toLowerCase()
    .email('Invalid email format'),
});
