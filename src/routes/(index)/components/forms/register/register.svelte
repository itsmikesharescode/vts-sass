<script lang="ts" module>
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { toast } from 'svelte-sonner';
  import { signUpSchema, type SignUpSchema } from '../schema';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import Button from '$lib/components/ui/button/button.svelte';
  import Loader from '$lib/components/general/spinners/loader/loader.svelte';

  interface Props {
    signUpForm: SuperValidated<Infer<SignUpSchema>>;
  }
</script>

<script lang="ts">
  let { signUpForm }: Props = $props();

  const form = superForm(signUpForm, {
    validators: zodClient(signUpSchema),
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
      <span class="text-2xl font-semibold">Register</span>
      <span class="text-sm text-muted-foreground">Fill the fields below to create an account</span>
    </div>
    <form method="POST" action="?/signUpEvent" use:enhance class="flex flex-col gap-3">
      <Form.Field {form} name="username">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Username</Form.Label>
            <Input
              type="text"
              {...props}
              bind:value={$formData.username}
              placeholder="Enter your username"
            />
          {/snippet}
        </Form.Control>

        <Form.FieldErrors />
      </Form.Field>

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

      <Form.Field {form} name="password">
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

      <Form.Field {form} name="confirmPassword">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Confirm Password</Form.Label>
            <Input
              type="password"
              {...props}
              bind:value={$formData.confirmPassword}
              placeholder="Confirm your password"
            />
          {/snippet}
        </Form.Control>

        <Form.FieldErrors />
      </Form.Field>
      <Form.Button disabled={$submitting} class="relative w-full">
        <Loader isLoading={$submitting} />
        Register
      </Form.Button>
    </form>

    <div class="mt-2 flex flex-col items-center gap-2">
      <div class="flex flex-col">
        <span class="text-center text-sm text-muted-foreground">Already have an account ?</span>
        <Button variant="link" href="/">Login here</Button>
      </div>
    </div>
  </section>
</main>
