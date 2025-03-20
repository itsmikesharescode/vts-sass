<script lang="ts" module>
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Textarea } from '$lib/components/ui/textarea/index.js';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { createCandidateSchema, type CreateCandidateType } from '../schema';
  import { toast } from 'svelte-sonner';
  import Loader from '$lib/components/general/spinners/loader/loader.svelte';
  import { buttonVariants } from '$lib/components/ui/button/index.js';
  import { useCandidateRowState } from '../../table/row-state.svelte';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
  import SelectPicker from '$lib/components/general/pickers/select-picker.svelte';
  interface Props {
    createCandidateForm: SuperValidated<Infer<CreateCandidateType>>;
  }
</script>

<script lang="ts">
  let { createCandidateForm = $bindable() }: Props = $props();

  const rowState = useCandidateRowState();

  const form = superForm(createCandidateForm, {
    validators: zodClient(createCandidateSchema),
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
    Create Candidate
  </AlertDialog.Trigger>
  <AlertDialog.Content class="flex max-h-screen flex-col p-0">
    <AlertDialog.Header class="p-6 pb-2 ">
      <AlertDialog.Title>Create Candidate</AlertDialog.Title>
      <AlertDialog.Description>
        Fill the form below to create a new candidate.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <ScrollArea>
      <form
        method="POST"
        action="?/createCandidateEvent"
        use:enhance
        class="max-h-[calc(100vh-8rem)] px-6"
      >
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
                placeholder="Select a gender"
                selections={[
                  { id: 'male', label: 'Male', value: 'male' },
                  { id: 'female', label: 'Female', value: 'female' }
                ]}
                bind:selectedId={$formData.gender}
              >
                {#snippet children({ selected })}
                  <span>{selected.label}</span>
                {/snippet}
              </SelectPicker>
              <input type="hidden" name={props.name} value={$formData.gender} />
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

        <AlertDialog.Footer class="pb-6 pt-2">
          <AlertDialog.Cancel type="button">Cancel</AlertDialog.Cancel>
          <Form.Button disabled={$submitting} class="relative">
            <Loader isLoading={$submitting} />
            Create Candidate
          </Form.Button>
        </AlertDialog.Footer>
      </form>
    </ScrollArea>
  </AlertDialog.Content>
</AlertDialog.Root>
