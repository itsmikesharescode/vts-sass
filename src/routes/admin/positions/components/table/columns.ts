import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import type { PositionTable } from './schema.js';
import ColumnHeader from '$lib/components/general/custom-table/components/column-header.svelte';
import RowActions from './components/row-actions.svelte';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/index.js';

export const columns: ColumnDef<PositionTable>[] = [
  {
    accessorKey: 'position_name',
    header: ({ column }) => {
      return renderComponent(ColumnHeader<PositionTable, unknown>, {
        column,
        title: 'Position Name'
      });
    },
    cell: ({ row }) => {
      const positionNameSnippet = createRawSnippet<[string]>((getPositionName) => {
        const positionName = getPositionName();
        return {
          render: () => `<div class="w-full">${positionName}</div>`
        };
      });

      return renderSnippet(positionNameSnippet, row.getValue('position_name'));
    },
    enableSorting: false,
    enableHiding: false
  },

  {
    accessorKey: 'position_name',
    header: ({ column }) => {
      return renderComponent(ColumnHeader<PositionTable, unknown>, {
        column,
        title: 'Actions',
        class: 'justify-end flex'
      });
    },
    id: 'actions',
    cell: ({ row }) => renderComponent(RowActions<PositionTable>, { row }),
    enableSorting: false,
    enableHiding: false
  }
];
