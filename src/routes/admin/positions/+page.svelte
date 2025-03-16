<script lang="ts" module>
  import CTable from '$lib/components/general/custom-table/ctable.svelte';
  import { columns } from './components/table/columns.js';
</script>

<script lang="ts">
  const data = [
    { id: crypto.randomUUID(), position_name: 'Position 1', position_info: 'Position 1 info' },
    { id: crypto.randomUUID(), position_name: 'Position 2', position_info: 'Position 2 info' }
  ];
</script>

<main>
  <CTable {columns} {data} />
</main>
