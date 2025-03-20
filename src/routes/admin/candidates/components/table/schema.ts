import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const positonTableSchema = z.object({
  id: z.string(),
  position_name: z.string(),
  position_info: z.string()
});

export type PositionTable = z.output<typeof positonTableSchema>;
