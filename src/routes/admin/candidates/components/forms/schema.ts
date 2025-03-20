import { z } from 'zod';

const baseSchema = {
  first_name: z.string().min(1, 'First name is required'),
  middle_name: z.string().min(1, 'Middle name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  address: z.string().min(1, 'Address is required'),
  motto: z.string().min(1, 'Motto is required'),
  gender: z.string().refine((val) => val === 'male' || val === 'female', {
    message: 'Gender must be either male or female'
  })
};

export const createCandidateSchema = z.object(baseSchema);
export const editCandidateSchema = z.object(baseSchema).extend({
  id: z.string(),
  avatar_path: z.string()
});

export const deleteCandidateSchema = z.object({
  id: z.string()
});

export type CreateCandidateType = typeof createCandidateSchema;
export type EditCandidateType = typeof editCandidateSchema;
export type DeleteCandidateType = typeof deleteCandidateSchema;
