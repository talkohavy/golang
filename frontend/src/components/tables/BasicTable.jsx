import React, { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { useVirtual } from 'react-virtual';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import DefaultFilter from './DefaultFilter';
import IndeterminateCheckbox from './IndeterminateCheckbox';

const SORTING_ICONS = { asc: '🔼', desc: '🔽', none: '🟦' };
const ROW_SELECTION_MODES = {
  single: { enableRowSelection: true, enableMultiRowSelection: false },
  multi: { enableRowSelection: true, enableMultiRowSelection: true },
  none: { enableRowSelection: false },
};

/**
 * @param { import('./types').BasicTable } props
 * @param { any } ref
 */
function BasicTable(
  {
    columnDefs,
    rowData,
    defaultColumn,
    rowSelectionMode = 'none',
    searchText,
    setSearchText,
    renderTableFooter,
    onCellClick,
    onBottomReached,
    isFetching,
    className,
  },
  ref
) {
  // all useRefs:
  const tableParentRef = useRef(null);

  // all useStates:
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);

  // all useMemos:
  const data = useMemo(() => rowData, [rowData]);
  const columns = useMemo(
    () =>
      columnDefs.map((curItem, curIndex) => {
        if (curIndex === 0)
          return {
            ...curItem,
            header: ({ table, header }) => (
              <>
                <IndeterminateCheckbox
                  checked={table.getIsAllRowsSelected()}
                  indeterminate={table.getIsSomeRowsSelected()}
                  onChange={table.getToggleAllRowsSelectedHandler()}
                />
                <div className='w-full first-letter:uppercase'>{header.id}</div>
              </>
            ),
          };

        return curItem;
      }),
    [columnDefs]
  );

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement) => {
      if (containerRefElement && onBottomReached) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        if (scrollHeight - scrollTop - clientHeight < 300 && !isFetching) onBottomReached();
      }
    },
    [onBottomReached, isFetching]
  );

  //a check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  useEffect(() => {
    fetchMoreOnBottomReached(tableParentRef.current);
  }, [fetchMoreOnBottomReached]);

  // useReactTable:
  const tableInstance = useReactTable({
    data,
    columns,
    columnResizeMode: 'onChange',
    state: { sorting, rowSelection, columnFilters, globalFilter: searchText },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onGlobalFilterChange: setSearchText,
    onColumnFiltersChange: setColumnFilters,
    enableSorting: true,
    enableMultiSort: true,
    sortDescFirst: false,
    ...ROW_SELECTION_MODES[rowSelectionMode],
    enableGlobalFilter: true,
    enableColumnFilters: true,
    defaultColumn,
  });
  ref ??= {};
  ref.current = tableInstance;
  const { getHeaderGroups, getRowModel } = tableInstance;

  // all useCallbacks:
  const onHeaderClick = useCallback(
    (e, header) => e.target.tagName !== 'INPUT' && header.column.getToggleSortingHandler()(e),
    []
  );

  const { rows } = getRowModel();

  // Calculate virtual gaps:
  const rowVirtualizer = useVirtual({ parentRef: tableParentRef, size: rows.length, overscan: 10 });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;
  const virtualPaddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const virtualPaddingBottom =
    virtualRows.length > 0 ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0;

  if (isFetching) return <div>Fetching...</div>;

  return (
    <div className={clsx('overflow-auto flex flex-col', className)}>
      <div
        ref={tableParentRef}
        onScroll={(e) => fetchMoreOnBottomReached(e.target)}
        className='border border-gray-300 h-auto max-h-[300px] overflow-auto'
      >
        <table className='custom'>
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan} style={{ width: header.getSize() }}>
                    {header.isPlaceholder ? null : (
                      <div className='flex flex-col items-center'>
                        <div className='flex items-center justify-between w-full'>
                          <div className='flex items-center justify-between w-full select-none'>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </div>

                          {header.column.getCanSort() && header.column.columnDef.enableSorting ? (
                            <div className='cursor-pointer' onClick={(e) => onHeaderClick(e, header)}>
                              {SORTING_ICONS[header.column.getIsSorted()] ?? SORTING_ICONS.none}
                            </div>
                          ) : null}
                        </div>

                        {header.column.getCanFilter() && header.column.columnDef.enableColumnFilter ? (
                          <div>
                            <DefaultFilter table={tableInstance} column={header.column} />
                          </div>
                        ) : null}
                      </div>
                    )}
                    {header.column.getCanResize() && (
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
                      />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {virtualPaddingTop > 0 && (
              <tr>
                <td style={{ height: `${virtualPaddingTop}px` }} />
              </tr>
            )}
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index];
              return (
                <tr
                  key={row.id}
                  className={row.getIsSelected() ? '!bg-blue-400 !hover:bg-blue-300' : ''}
                  onClick={row.getCanSelect() ? row.getToggleSelectedHandler() : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      onClick={() => onCellClick?.({ cell, row })}
                      style={{ width: cell.column.getSize() || '100%' }}
                      // @ts-ignore
                      align={cell.column.columnDef.meta?.align}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
            {virtualPaddingBottom > 0 && (
              <tr>
                <td style={{ height: `${virtualPaddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {renderTableFooter?.({ ...tableInstance })}
    </div>
  );
}

const MemoedForwardedBasicTable = memo(forwardRef(BasicTable));

export default MemoedForwardedBasicTable;
