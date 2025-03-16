<script lang="ts" module>
  import { cn } from '$lib/utils';
  import type { ClassNameValue } from 'tailwind-merge';
  import LoaderCircle from 'lucide-svelte/icons/loader-circle';

  interface Props {
    isLoading: boolean;
    class?: ClassNameValue;
  }
</script>

<script lang="ts">
  let { isLoading, class: className }: Props = $props();
</script>

{#if isLoading}
  <div
    class={cn('absolute inset-0 flex items-center justify-center rounded-lg bg-primary', className)}
  >
    <LoaderCircle class="animate-spin" />
  </div>
{/if}
