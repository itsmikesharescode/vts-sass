import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const candidateTableSchema = z.object({
  id: z.string(),
  avatar_path: z.string(),
  first_name: z.string(),
  middle_name: z.string(),
  last_name: z.string(),
  address: z.string(),
  motto: z.string(),
  gender: z.string()
});

export type CandidateTable = z.output<typeof candidateTableSchema>;
