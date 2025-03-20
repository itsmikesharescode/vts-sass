<script lang="ts" module>
  import * as Select from '$lib/components/ui/select/index.js';
  import type { Snippet } from 'svelte';

  export type SelectPicker = {
    id: string;
    label: string;
    value: string;
  };

  interface Props {
    selections: SelectPicker[];
    selectedId: string;
    placeholder?: string;
    children: Snippet<[{ selected: SelectPicker }]>;
  }
</script>

<script lang="ts">
  let {
    selectedId = $bindable(),
    selections,
    placeholder = 'Select an option',
    children
  }: Props = $props();
</script>

<Select.Root type="single" bind:value={selectedId}>
  <Select.Trigger class="w-full">
    <span>{selections.find((s) => s.id === selectedId)?.label || placeholder}</span>
  </Select.Trigger>
  <Select.Content>
    {#each selections as selection}
      <Select.Item value={selection.id}>
        {@render children({ selected: selection })}
      </Select.Item>
    {/each}
  </Select.Content>
</Select.Root>
