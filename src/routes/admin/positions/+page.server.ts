import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import {
  createPositionSchema,
  editPositionSchema,
  deletePositionSchema
} from './components/forms/schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {
    createPositionForm: await superValidate(zod(createPositionSchema)),
    editPositionForm: await superValidate(zod(editPositionSchema)),
    deletePositionForm: await superValidate(zod(deletePositionSchema))
  };
};

export const actions: Actions = {
  createPositionEvent: async ({ request }) => {
    const form = await superValidate(request, zod(createPositionSchema));

    if (!form.valid) return fail(400, { form });

    console.log(form.data);
  },

  editPositionEvent: async ({ request }) => {
    const form = await superValidate(request, zod(editPositionSchema));

    if (!form.valid) return fail(400, { form });

    console.log(form.data);
  },

  deletePositionEvent: async ({ request }) => {
    const form = await superValidate(request, zod(deletePositionSchema));

    if (!form.valid) return fail(400, { form });

    console.log(form.data);
  }
};
