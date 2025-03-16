import { z } from 'zod';

const baseSchema = {
  position_name: z.string().min(1, 'Position name is required'),
  position_info: z.string().min(1, 'Position info is required')
};

export const createPositionSchema = z.object(baseSchema);
export const editPositionSchema = z.object(baseSchema).extend({
  id: z.string()
});

export const deletePositionSchema = z.object({
  id: z.string()
});

export type CreatePositionType = typeof createPositionSchema;
export type EditPositionType = typeof editPositionSchema;
export type DeletePositionType = typeof deletePositionSchema;
