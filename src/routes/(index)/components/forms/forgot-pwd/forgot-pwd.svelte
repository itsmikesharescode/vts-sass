<script lang="ts" module>
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { toast } from 'svelte-sonner';
  import { forgotPwdSchema, type ForgotPwdSchema } from '../schema';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import Button from '$lib/components/ui/button/button.svelte';
  import Loader from '$lib/components/general/spinners/loader/loader.svelte';
  interface Props {
    forgotPwdForm: SuperValidated<Infer<ForgotPwdSchema>>;
  }
</script>

<script lang="ts">
  let { forgotPwdForm }: Props = $props();

  const form = superForm(forgotPwdForm, {
    validators: zodClient(forgotPwdSchema),
    id: crypto.randomUUID(),
    onUpdate: async ({ result }) => {
      const { status, data } = result;

      switch (status) {
        case 200:
          toast.success(data.msg);
          break;

        case 401:
          toast.error(data.msg);
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;
</script>

<main class="container flex min-h-screen flex-col items-center justify-center">
  <section class="flex w-[320px] flex-col gap-4 rounded-lg bg-secondary p-4 md:w-[420px] md:p-10">
    <div class="flex flex-col">
      <span class="text-2xl font-semibold">Forgot Password</span>
      <span class="text-sm text-muted-foreground">Enter your email to reset your password</span>
    </div>
    <form method="POST" action="?/loginEvent" use:enhance class="flex flex-col gap-3">
      <Form.Field {form} name="email">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Email</Form.Label>
            <Input
              type="email"
              {...props}
              bind:value={$formData.email}
              placeholder="Enter your email"
            />
          {/snippet}
        </Form.Control>

        <Form.FieldErrors />
      </Form.Field>

      <Form.Button disabled={$submitting} class="relative w-full">
        <Loader isLoading={$submitting} />
        Reset Password
      </Form.Button>
    </form>

    <div class="mt-2 flex flex-col items-center gap-2">
      <div class="flex flex-col">
        <span class="text-center text-sm text-muted-foreground">Remember your password?</span>
        <Button variant="link" href="/">Log in here</Button>
      </div>
    </div>
  </section>
</main>
