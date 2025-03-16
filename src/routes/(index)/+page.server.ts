import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { signInSchema, signUpSchema, forgotPwdSchema } from './components/forms/schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {
    signInForm: await superValidate(zod(signInSchema)),
    signUpForm: await superValidate(zod(signUpSchema)),
    forgotPwdForm: await superValidate(zod(forgotPwdSchema))
  };
};

export const actions: Actions = {
  loginEvent: async ({ request }) => {
    const form = await superValidate(request, zod(signInSchema));

    if (!form.valid) return fail(400, { form });

    console.log(form.data);
  },

  signUpEvent: async ({ request }) => {
    const form = await superValidate(request, zod(signUpSchema));

    if (!form.valid) return fail(400, { form });

    console.log(form.data);
  },

  forgotPwdEvent: async ({ request }) => {
    const form = await superValidate(request, zod(forgotPwdSchema));

    if (!form.valid) return fail(400, { form });
  }
};
