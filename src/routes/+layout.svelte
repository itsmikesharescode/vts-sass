<script lang="ts">
  import '../app.css';
  import { onNavigate } from '$app/navigation';
  import { ModeWatcher } from 'mode-watcher';
  import { Toaster } from '$lib/components/ui/sonner/index.js';

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });

  let { children } = $props();
</script>

<Toaster />
<ModeWatcher />
{@render children()}

<style>
  :global(html) {
    font-family: 'Prompt', sans-serif;
  }
</style>
