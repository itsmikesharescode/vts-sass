<script lang="ts" module>
  import CTable from '$lib/components/general/custom-table/ctable.svelte';
  import { columns } from './components/table/columns.js';
  import { initCandidateRowState } from './components/table/row-state.svelte';
  import { boyURL, girlURL } from '$lib/utils.js';
  import CreateCandidate from './components/forms/create-candidate/create-candidate.svelte';
  import EditCandidate from './components/forms/edit-candidate/edit-candidate.svelte';
  import DeleteCandidate from './components/forms/delete-candidate/delete-candidate.svelte';
</script>

<script lang="ts">
  const { data } = $props();

  const datas = [
    {
      id: crypto.randomUUID(),
      first_name: 'First Name 1',
      middle_name: 'Middle Name 1',
      last_name: 'Last Name 1',
      address: 'Address 1',
      motto: 'Motto 1',
      gender: 'male',
      avatar_path: boyURL
    },
    {
      id: crypto.randomUUID(),
      first_name: 'First Name 2',
      avatar_path: girlURL,
      middle_name: 'Middle Name 2',
      last_name: 'Last Name 2',
      address: 'Address 2',
      motto: 'Motto 2',
      gender: 'female'
    }
  ];

  initCandidateRowState();
</script>

<main class="flex flex-col gap-4 py-4">
  <section class="flex justify-end">
    <CreateCandidate createCandidateForm={data.createCandidateForm} />
  </section>
  <CTable {columns} data={datas} />
</main>

<EditCandidate editCandidateForm={data.editCandidateForm} />
<DeleteCandidate deleteCandidateForm={data.deleteCandidateForm} />
