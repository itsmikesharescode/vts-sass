<script lang="ts" module>
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import * as Form from '$lib/components/ui/form/index.js';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { deleteCandidateSchema, type DeleteCandidateType } from '../schema';
  import { toast } from 'svelte-sonner';
  import Loader from '$lib/components/general/spinners/loader/loader.svelte';
  import { useCandidateRowState } from '../../table/row-state.svelte';
  interface Props {
    deleteCandidateForm: SuperValidated<Infer<DeleteCandidateType>>;
  }
</script>

<script lang="ts">
  let { deleteCandidateForm = $bindable() }: Props = $props();

  const rowState = useCandidateRowState();

  const form = superForm(deleteCandidateForm, {
    validators: zodClient(deleteCandidateSchema),
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
    if (rowState.delete) {
      $formData.id = rowState.getActiveRow()?.id as string;
    }
  });
</script>

<AlertDialog.Root
  bind:open={rowState.delete}
  onOpenChange={() => {
    form.reset();
    rowState.setActiveRow(null);
    rowState.delete = false;
  }}
>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Delete Candidate</AlertDialog.Title>
      <AlertDialog.Description>
        Are you sure you want to delete this candidate?
      </AlertDialog.Description>
    </AlertDialog.Header>

    <form method="POST" action="?/deletePositionEvent" use:enhance>
      <input name="id" type="hidden" bind:value={$formData.id} />
      <AlertDialog.Footer>
        <AlertDialog.Cancel type="button">Cancel</AlertDialog.Cancel>
        <Form.Button disabled={$submitting} class="relative">
          <Loader isLoading={$submitting} />
          Delete Candidate
        </Form.Button>
      </AlertDialog.Footer>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
