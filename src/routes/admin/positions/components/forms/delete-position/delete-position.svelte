<script lang="ts" module>
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Textarea } from '$lib/components/ui/textarea/index.js';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { deletePositionSchema, type DeletePositionType } from '../schema';
  import { toast } from 'svelte-sonner';
  import Loader from '$lib/components/general/spinners/loader/loader.svelte';
  import { usePositionRowState } from '../../table/row-state.svelte';
  interface Props {
    deletePositionForm: SuperValidated<Infer<DeletePositionType>>;
  }
</script>

<script lang="ts">
  let { deletePositionForm = $bindable() }: Props = $props();

  const rowState = usePositionRowState();

  const form = superForm(deletePositionForm, {
    validators: zodClient(deletePositionSchema),
    id: crypto.randomUUID(),
    onUpdate: async ({ result }) => {
      const { status, data } = result;

      switch (status) {
        case 200:
          toast.success(data.msg);
          form.reset();
          rowState.setActiveRow(null);
          rowState.delete = false;
          break;

        case 401:
          toast.error(data.msg);
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  $effect(() => {
    if (rowState.getActiveRow()) {
      $formData.id = rowState.getActiveRow()?.id;
    }
  });
</script>

<AlertDialog.Root
  bind:open={rowState.delete}
  onOpenChange={() => {
    form.reset();
    rowState.setActiveRow(null);
  }}
>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Delete Position</AlertDialog.Title>
      <AlertDialog.Description>
        Are you sure you want to delete this position?
      </AlertDialog.Description>
    </AlertDialog.Header>

    <form method="POST" action="?/deletePositionEvent" use:enhance>
      <input name="id" type="hidden" bind:value={$formData.id} />
      <AlertDialog.Footer>
        <AlertDialog.Cancel type="button">Cancel</AlertDialog.Cancel>
        <Form.Button disabled={$submitting} class="relative">
          <Loader isLoading={$submitting} />
          Delete Position
        </Form.Button>
      </AlertDialog.Footer>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
