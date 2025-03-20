import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import {
  createCandidateSchema,
  editCandidateSchema,
  deleteCandidateSchema
} from './components/forms/schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {
    createCandidateForm: await superValidate(zod(createCandidateSchema)),
    editCandidateForm: await superValidate(zod(editCandidateSchema)),
    deleteCandidateForm: await superValidate(zod(deleteCandidateSchema))
  };
};

export const actions: Actions = {
  createCandidateEvent: async ({ request }) => {
    const form = await superValidate(request, zod(createCandidateSchema));

    if (!form.valid) return fail(400, { form });

    console.log(form.data);
  },

  editCandidateEvent: async ({ request }) => {
    const form = await superValidate(request, zod(editCandidateSchema));

    if (!form.valid) return fail(400, { form });

    console.log(form.data);
  },

  deleteCandidateEvent: async ({ request }) => {
    const form = await superValidate(request, zod(deleteCandidateSchema));

    if (!form.valid) return fail(400, { form });

    console.log(form.data);
  }
};
