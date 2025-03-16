<script lang="ts" module>
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
</script>

<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import { toast } from 'svelte-sonner';

  interface Props {
    open: boolean;
  }

  let { open = $bindable() }: Props = $props();

  const handleLogout = async () => {
    if (!page.data.supabase) return;
    const { error } = await page.data.supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
      return;
    } else {
      toast.success('Logged out successfully come back again soon!');
      await goto('/');
      return;
    }
  };
</script>

<AlertDialog.Root bind:open>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>You are about to logout</AlertDialog.Title>
      <AlertDialog.Description>
        Press proceed to logout or cancel to stay logged in.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action onclick={handleLogout}>Proceed</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
