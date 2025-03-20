<script lang="ts">
  import AdminSidebar from '$lib/components/general/sidebars/admin-sidebar.svelte';
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
  import { Separator } from '$lib/components/ui/separator/index.js';
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import DarkMode from '$lib/components/general/darkmode/darkmode.svelte';
  const { children } = $props();
</script>

<Sidebar.Provider>
  <AdminSidebar />
  <Sidebar.Inset class="min-w-0">
    <header
      class="flex h-16 shrink-0 items-center gap-2 border-b-[1px] transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
    >
      <div class="flex w-full items-center justify-between gap-2 px-4">
        <div class="flex items-center gap-2">
          <Sidebar.Trigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <span class="text-sm text-muted-foreground">Page title here</span>
        </div>
        <DarkMode />
      </div>
    </header>
    <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
      {@render children()}
    </div>
  </Sidebar.Inset>
</Sidebar.Provider>
