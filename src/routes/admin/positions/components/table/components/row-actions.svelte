<script lang="ts" module>
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import Ellipsis from 'lucide-svelte/icons/ellipsis';
  import type { Row } from '@tanstack/table-core';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import type { PositionTable } from '../schema.js';
  import { goto } from '$app/navigation';
  import { usePositionRowState } from '../row-state.svelte';

  let { row }: { row: Row<PositionTable> } = $props();
  const rowState = usePositionRowState();
</script>

<div class="flex justify-end">
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      {#snippet child({ props })}
        <Button {...props} variant="ghost" class="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <Ellipsis />
          <span class="sr-only">Open Menu</span>
        </Button>
      {/snippet}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-[160px]" align="end">
      <DropdownMenu.Item
        onclick={async () => {
          rowState.setActiveRow(row.original);
          await goto(`/admin/positions?id=${row.original.id}`);
        }}
      >
        Edit
      </DropdownMenu.Item>
      <DropdownMenu.Item
        onclick={() => {
          rowState.setActiveRow(row.original);
          rowState.delete = true;
        }}
      >
        Delete
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</div>
