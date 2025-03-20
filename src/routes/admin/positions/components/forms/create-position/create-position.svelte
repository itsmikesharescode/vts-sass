<script lang="ts" module>
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Textarea } from '$lib/components/ui/textarea/index.js';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { createPositionSchema, type CreatePositionType } from '../schema';
  import { toast } from 'svelte-sonner';
  import Loader from '$lib/components/general/spinners/loader/loader.svelte';
  import { buttonVariants } from '$lib/components/ui/button/index.js';
  import { usePositionRowState } from '../../table/row-state.svelte';
  interface Props {
    createPositionForm: SuperValidated<Infer<CreatePositionType>>;
  }
</script>

<script lang="ts">
  let { createPositionForm = $bindable() }: Props = $props();

  const rowState = usePositionRowState();

  const form = superForm(createPositionForm, {
    validators: zodClient(createPositionSchema),
    id: crypto.randomUUID(),
    onUpdate: async ({ result }) => {
      const { status, data } = result;

      switch (status) {
        case 200:
          toast.success(data.msg);
          form.reset();
          break;

        case 401:
          toast.error(data.msg);
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;
</script>

<AlertDialog.Root
  bind:open={rowState.open}
  onOpenChange={() => {
    form.reset();
  }}
>
  <AlertDialog.Trigger class={buttonVariants({ variant: 'default' })}>
    Create Position
  </AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Create Position</AlertDialog.Title>
      <AlertDialog.Description>
        Fill the form below to create a new position.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <form method="POST" action="?/createPositionEvent" use:enhance>
      <Form.Field {form} name="position_name">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Position Name</Form.Label>
            <Input {...props} bind:value={$formData.position_name} placeholder="Position Name" />
          {/snippet}
        </Form.Control>

        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="position_info">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Position Info</Form.Label>
            <Textarea
              {...props}
              bind:value={$formData.position_info}
              placeholder="Position Information ..."
            />
          {/snippet}
        </Form.Control>

        <Form.FieldErrors />
      </Form.Field>

      <AlertDialog.Footer>
        <AlertDialog.Cancel type="button">Cancel</AlertDialog.Cancel>
        <Form.Button disabled={$submitting} class="relative">
          <Loader isLoading={$submitting} />
          Create Position
        </Form.Button>
      </AlertDialog.Footer>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
