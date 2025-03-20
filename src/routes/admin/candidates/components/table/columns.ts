import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import type { CandidateTable } from './schema.js';
import ColumnHeader from '$lib/components/general/custom-table/components/column-header.svelte';
import RowActions from './components/row-actions.svelte';
import CandidateAvatar from './components/candidate-avatar.svelte';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/index.js';

export const columns: ColumnDef<CandidateTable>[] = [
  {
    accessorKey: 'avatar_path',
    header: ({ column }) => {
      return renderComponent(ColumnHeader<CandidateTable, unknown>, {
        column,
        title: 'Avatar'
      });
    },
    cell: ({ row }) => renderComponent(CandidateAvatar<CandidateTable>, { row }),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'first_name',
    header: ({ column }) => {
      return renderComponent(ColumnHeader<CandidateTable, unknown>, {
        column,
        title: 'First Name'
      });
    },
    cell: ({ row }) => {
      const positionNameSnippet = createRawSnippet<[string]>((getPositionName) => {
        const positionName = getPositionName();
        return {
          render: () => `<div class="w-full">${positionName}</div>`
        };
      });

      return renderSnippet(positionNameSnippet, row.getValue('first_name'));
    },
    enableSorting: false,
    enableHiding: false
  },

  {
    accessorKey: 'middle_name',
    header: ({ column }) => {
      return renderComponent(ColumnHeader<CandidateTable, unknown>, {
        column,
        title: 'Middle Name'
      });
    },
    cell: ({ row }) => {
      const positionNameSnippet = createRawSnippet<[string]>((getPositionName) => {
        const positionName = getPositionName();
        return {
          render: () => `<div class="w-full">${positionName}</div>`
        };
      });

      return renderSnippet(positionNameSnippet, row.getValue('middle_name'));
    },
    enableSorting: false,
    enableHiding: false
  },

  {
    accessorKey: 'last_name',
    header: ({ column }) => {
      return renderComponent(ColumnHeader<CandidateTable, unknown>, {
        column,
        title: 'Last Name'
      });
    },
    cell: ({ row }) => {
      const positionNameSnippet = createRawSnippet<[string]>((getPositionName) => {
        const positionName = getPositionName();
        return {
          render: () => `<div class="w-full">${positionName}</div>`
        };
      });

      return renderSnippet(positionNameSnippet, row.getValue('last_name'));
    },
    enableSorting: false,
    enableHiding: false
  },

  {
    accessorKey: 'gender',
    header: ({ column }) => {
      return renderComponent(ColumnHeader<CandidateTable, unknown>, {
        column,
        title: 'Gender'
      });
    },
    cell: ({ row }) => {
      const positionNameSnippet = createRawSnippet<[string]>((getPositionName) => {
        const positionName = getPositionName();
        return {
          render: () => `<div class="w-full">${positionName}</div>`
        };
      });

      return renderSnippet(positionNameSnippet, row.getValue('gender'));
    },
    enableSorting: false,
    enableHiding: false
  },

  {
    accessorKey: 'address',
    header: ({ column }) => {
      return renderComponent(ColumnHeader<CandidateTable, unknown>, {
        column,
        title: 'Address'
      });
    },
    cell: ({ row }) => {
      const positionNameSnippet = createRawSnippet<[string]>((getPositionName) => {
        const positionName = getPositionName();
        return {
          render: () => `<div class="w-full">${positionName}</div>`
        };
      });

      return renderSnippet(positionNameSnippet, row.getValue('address'));
    },
    enableSorting: false,
    enableHiding: false
  },

  {
    accessorKey: 'motto',
    header: ({ column }) => {
      return renderComponent(ColumnHeader<CandidateTable, unknown>, {
        column,
        title: 'Motto'
      });
    },
    cell: ({ row }) => {
      const positionNameSnippet = createRawSnippet<[string]>((getPositionName) => {
        const positionName = getPositionName();
        return {
          render: () => `<div class="w-full">${positionName}</div>`
        };
      });

      return renderSnippet(positionNameSnippet, row.getValue('motto'));
    },
    enableSorting: false,
    enableHiding: false
  },

  {
    header: ({ column }) => {
      return renderComponent(ColumnHeader<CandidateTable, unknown>, {
        column,
        title: 'Actions',
        class: 'justify-end flex'
      });
    },
    id: 'actions',
    cell: ({ row }) => renderComponent(RowActions<CandidateTable>, { row }),
    enableSorting: false,
    enableHiding: false
  }
];
