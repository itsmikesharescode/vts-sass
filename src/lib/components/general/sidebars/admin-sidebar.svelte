<script lang="ts" module>
  import BookOpen from 'lucide-svelte/icons/book-open';
  import Bot from 'lucide-svelte/icons/bot';
  import ChartPie from 'lucide-svelte/icons/chart-pie';
  import FileInput from 'lucide-svelte/icons/file-input';
  import Frame from 'lucide-svelte/icons/frame';
  import Map from 'lucide-svelte/icons/map';
  import Settings2 from 'lucide-svelte/icons/settings-2';
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import type { ComponentProps } from 'svelte';
  import NavMain from './components/nav-main.svelte';
  import Profile from './components/profile.svelte';
  import SquareActivity from 'lucide-svelte/icons/square-activity';

  // This is sample data.
  const data = {
    user: {
      name: 'shadcn',
      email: 'm@example.com',
      avatar: '/avatars/shadcn.jpg'
    },
    navMain: [
      {
        title: 'Monitoring',
        url: '#',
        icon: SquareActivity,
        isActive: true,
        items: [
          {
            title: 'Dashboard',
            url: '/admin'
          },
          {
            title: 'Voting Logs',
            url: '/admin/voting-logs'
          },
          {
            title: 'Rankings',
            url: '/admin/rankings'
          }
        ]
      },
      {
        title: 'Entries',
        isActive: true,
        url: '#',
        icon: FileInput,
        items: [
          {
            title: 'Positions',
            url: '/admin/positions'
          },
          {
            title: 'Candidates',
            url: '/admin/candidates'
          }
        ]
      },
      {
        title: 'About The System',
        url: '#',
        icon: BookOpen,
        items: [
          {
            title: 'Introduction',
            url: '/admin/introduction'
          },
          {
            title: 'Get Started',
            url: '/admin/get-started'
          },
          {
            title: 'Tutorials',
            url: '/admin/tutorials'
          },
          {
            title: 'Changelog',
            url: '/admin/changelog'
          }
        ]
      }
    ],
    projects: [
      {
        name: 'Design Engineering',
        url: '#',
        icon: Frame
      },
      {
        name: 'Sales & Marketing',
        url: '#',
        icon: ChartPie
      },
      {
        name: 'Travel',
        url: '#',
        icon: Map
      }
    ]
  };
</script>

<script lang="ts">
  let {
    ref = $bindable(null),
    collapsible = 'icon',
    ...restProps
  }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
  <Sidebar.Header>
    <!--Header here-->
  </Sidebar.Header>
  <Sidebar.Content>
    <NavMain items={data.navMain} />
    <!-- <NavProjects projects={data.projects} /> -->
  </Sidebar.Content>
  <Sidebar.Footer>
    <Profile user={data.user} />
  </Sidebar.Footer>
  <Sidebar.Rail />
</Sidebar.Root>
