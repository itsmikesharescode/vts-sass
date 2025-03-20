<script lang="ts" module>
  import * as Avatar from '$lib/components/ui/avatar/index.js';
  import type { CandidateTable } from '../schema.js';
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import type { Row } from '@tanstack/table-core';
  let { row }: { row: Row<CandidateTable> } = $props();
</script>

<Avatar.Root>
  <Avatar.Image src={row.original.avatar_path} alt={row.original.first_name} />
  <Avatar.Fallback>{row.original.first_name.charAt(0)}</Avatar.Fallback>
</Avatar.Root>
