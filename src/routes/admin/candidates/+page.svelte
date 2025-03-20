<script lang="ts" module>
  import CTable from '$lib/components/general/custom-table/ctable.svelte';
  import { columns } from './components/table/columns.js';
  import CreateCandidate from './components/forms/create-candidate/create-candidate.svelte';
  import { initPositionRowState } from './components/table/row-state.svelte';
</script>

<script lang="ts">
  const { data } = $props();

  const datas = [
    { id: crypto.randomUUID(), position_name: 'Position 1', position_info: 'Position 1 info' },
    { id: crypto.randomUUID(), position_name: 'Position 2', position_info: 'Position 2 info' }
  ];

  initPositionRowState();
</script>

<main class="flex flex-col gap-4 py-4">
  <section class="flex justify-end">
    <CreateCandidate createCandidateForm={data.createCandidateForm} />
  </section>
  <CTable {columns} data={datas} />
</main>
<!-- 
<EditCandidate editCandidateForm={data.editCandidateForm} />
<DeleteCandidate deleteCandidateForm={data.deleteCandidateForm} /> -->
