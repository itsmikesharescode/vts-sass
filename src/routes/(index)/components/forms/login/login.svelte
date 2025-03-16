<script lang="ts" module>
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { toast } from 'svelte-sonner';
  import { signInSchema, type SignInSchema } from '../schema';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import Button from '$lib/components/ui/button/button.svelte';
  import Loader from '$lib/components/general/spinners/loader/loader.svelte';
  interface Props {
    signInForm: SuperValidated<Infer<SignInSchema>>;
  }
</script>

<script lang="ts">
  let { signInForm }: Props = $props();

  const form = superForm(signInForm, {
    validators: zodClient(signInSchema),
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
      <span class="text-2xl font-semibold">Log in</span>
      <span class="text-sm text-muted-foreground">Log in to your account</span>
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

      <Form.Field {form} name="email">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Password</Form.Label>
            <Input
              type="password"
              {...props}
              bind:value={$formData.password}
              placeholder="Enter your password"
            />
          {/snippet}
        </Form.Control>

        <Form.FieldErrors />
      </Form.Field>
      <Form.Button disabled={$submitting} class="relative w-full">
        <Loader isLoading={$submitting} />
        Log in
      </Form.Button>
    </form>

    <div class="mt-2 flex flex-col items-center gap-2">
      <Button variant="link" href="/?q=forgot-pwd">Forgot Password ?</Button>

      <div class="flex flex-col">
        <span class="text-center text-sm text-muted-foreground">Don't have an account yet?</span>
        <Button variant="link" href="/?q=register">Create one here</Button>
      </div>
    </div>
  </section>
</main>
