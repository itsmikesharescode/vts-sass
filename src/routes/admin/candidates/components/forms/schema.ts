import { z } from 'zod';

const baseSchema = {
  avatar_path: z.string().optional(),
  first_name: z.string().min(1, 'First name is required'),
  middle_name: z.string().min(1, 'Middle name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  address: z.string().min(1, 'Address is required'),
  motto: z.string().min(1, 'Motto is required')
};

export const createCandidateSchema = z.object(baseSchema);
export const editCandidateSchema = z.object(baseSchema).extend({
  id: z.string(),
  avatar_path: z.string()
});

export const deleteCandidateSchema = z.object({
  id: z.string(),
  avatar_path: z.string()
});

export type CreateCandidateType = typeof createCandidateSchema;
export type EditCandidateType = typeof editCandidateSchema;
export type DeleteCandidateType = typeof deleteCandidateSchema;
