<script lang="ts" module>
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Textarea } from '$lib/components/ui/textarea/index.js';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { editCandidateSchema, type EditCandidateType } from '../schema';
  import { toast } from 'svelte-sonner';
  import Loader from '$lib/components/general/spinners/loader/loader.svelte';
  import { useCandidateRowState } from '../../table/row-state.svelte';
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import SelectPicker from '$lib/components/general/pickers/select-picker.svelte';
  interface Props {
    editCandidateForm: SuperValidated<Infer<EditCandidateType>>;
  }
</script>

<script lang="ts">
  let { editCandidateForm = $bindable() }: Props = $props();

  const rowState = useCandidateRowState();

  const form = superForm(editCandidateForm, {
    validators: zodClient(editCandidateSchema),
    id: crypto.randomUUID(),
    onUpdate: async ({ result }) => {
      const { status, data } = result;

      switch (status) {
        case 200:
          toast.success(data.msg);
          form.reset();
          await goto('/admin/candidates');
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
        $formData.first_name = activeRow.first_name;
        $formData.middle_name = activeRow.middle_name;
        $formData.last_name = activeRow.last_name;
        $formData.address = activeRow.address;
        $formData.motto = activeRow.motto;
        $formData.gender = activeRow.gender as 'male' | 'female';
        $formData.avatar_path = activeRow.avatar_path;
        return () => {
          rowState.setActiveRow(null);
          console.log('CLEANED');
        };
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
    await goto('/admin/candidates');
  }}
>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Edit Candidate</AlertDialog.Title>
      <AlertDialog.Description>Fill the form below to edit a candidate.</AlertDialog.Description>
    </AlertDialog.Header>

    <form method="POST" action="?/editPositionEvent" use:enhance>
      <input name="id" type="hidden" bind:value={$formData.id} />
      <Form.Field {form} name="first_name">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>First Name</Form.Label>
            <Input {...props} bind:value={$formData.first_name} placeholder="First Name" />
          {/snippet}
        </Form.Control>

        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="middle_name">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Middle Name</Form.Label>
            <Input {...props} bind:value={$formData.middle_name} placeholder="Middle Name" />
          {/snippet}
        </Form.Control>

        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="last_name">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Last Name</Form.Label>
            <Input {...props} bind:value={$formData.last_name} placeholder="Last Name" />
          {/snippet}
        </Form.Control>

        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="gender">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Gender</Form.Label>
            <SelectPicker
              {...props}
              bind:selectedId={$formData.gender}
              placeholder="Gender"
              selections={[
                { id: 'male', label: 'Male', value: 'male' },
                { id: 'female', label: 'Female', value: 'female' }
              ]}
            >
              {#snippet children({ selected })}
                <span>{selected.label}</span>
              {/snippet}
            </SelectPicker>
          {/snippet}
        </Form.Control>

        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="address">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Address</Form.Label>
            <Input {...props} bind:value={$formData.address} placeholder="Address" />
          {/snippet}
        </Form.Control>

        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="motto">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Motto</Form.Label>
            <Textarea {...props} bind:value={$formData.motto} placeholder="Motto" />
          {/snippet}
        </Form.Control>

        <Form.FieldErrors />
      </Form.Field>

      <AlertDialog.Footer>
        <AlertDialog.Cancel type="button">Cancel</AlertDialog.Cancel>
        <Form.Button disabled={$submitting} class="relative">
          <Loader isLoading={$submitting} />
          Edit Candidate
        </Form.Button>
      </AlertDialog.Footer>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
