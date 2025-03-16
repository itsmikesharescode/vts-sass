<script lang="ts" module>
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Textarea } from '$lib/components/ui/textarea/index.js';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { editPositionSchema, type EditPositionType } from '../schema';
  import { toast } from 'svelte-sonner';
  import Loader from '$lib/components/general/spinners/loader/loader.svelte';
  import { buttonVariants } from '$lib/components/ui/button/index.js';
  import { usePositionRowState } from '../../table/row-state.svelte';
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  interface Props {
    editPositionForm: SuperValidated<Infer<EditPositionType>>;
  }
</script>

<script lang="ts">
  let { editPositionForm = $bindable() }: Props = $props();

  const rowState = usePositionRowState();

  const form = superForm(editPositionForm, {
    validators: zodClient(editPositionSchema),
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

  const detectOpen = $derived(page.url.searchParams.get('id'));

  $effect(() => {
    if (detectOpen) {
      const activeRow = rowState.getActiveRow();

      if (activeRow) {
        $formData.id = activeRow.id;
        $formData.position_name = activeRow.position_name;
        $formData.position_info = activeRow.position_info;
      } else {
        //query the id to the database
      }
    }
  });
</script>

<AlertDialog.Root
  open={detectOpen !== null}
  onOpenChange={async () => {
    form.reset();
    await goto('/admin/positions');
  }}
>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Edit Position</AlertDialog.Title>
      <AlertDialog.Description>Fill the form below to edit a position.</AlertDialog.Description>
    </AlertDialog.Header>

    <form method="POST" action="?/editPositionEvent" use:enhance>
      <input name="id" type="hidden" bind:value={$formData.id} />
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
          Edit Position
        </Form.Button>
      </AlertDialog.Footer>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
