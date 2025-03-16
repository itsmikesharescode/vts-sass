import { z } from 'zod';

const baseSchema = {
  email: z.string().email('Must enter a valid email address.')
};

export const signInSchema = z.object(baseSchema).extend({
  password: z.string().min(1, 'Must enter a password.')
});

export const signUpSchema = z
  .object(baseSchema)
  .extend({
    username: z.string().min(1, 'Must enter a username.'),
    password: z.string().min(8, 'Password must be at least 8 characters long.'),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match.'
  });

export const forgotPwdSchema = z.object(baseSchema);

export type SignInSchema = typeof signInSchema;
export type SignUpSchema = typeof signUpSchema;
export type ForgotPwdSchema = typeof forgotPwdSchema;
