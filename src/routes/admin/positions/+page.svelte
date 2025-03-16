<script lang="ts" module>
  import CTable from '$lib/components/general/custom-table/ctable.svelte';
  import { columns } from './components/table/columns.js';
  import CreatePosition from './components/forms/create-position/create-position.svelte';
  import { initPositionRowState } from './components/table/row-state.svelte';
</script>

<script lang="ts">
  import EditPosition from './components/forms/edit-position/edit-position.svelte';

  const { data } = $props();

  const datas = [
    { id: crypto.randomUUID(), position_name: 'Position 1', position_info: 'Position 1 info' },
    { id: crypto.randomUUID(), position_name: 'Position 2', position_info: 'Position 2 info' }
  ];

  initPositionRowState();
</script>

<main class="flex flex-col gap-4 py-4">
  <section class="flex justify-end">
    <CreatePosition createPositionForm={data.createPositionForm} />
  </section>
  <CTable {columns} data={datas} />
</main>

<EditPosition editPositionForm={data.editPositionForm} />
