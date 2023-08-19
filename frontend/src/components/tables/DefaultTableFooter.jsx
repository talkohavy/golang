import React from 'react';

const RESULTS_COUNT = [10, 20, 30, 40, 50];

/** @param { Partial<import('@tanstack/react-table').Table> } props */
export default function TableFooter({
  getState,
  getRowModel,
  getCanPreviousPage,
  getCanNextPage,
  getPageCount,
  getPrePaginationRowModel,
  setPageIndex,
  setPageSize,
  previousPage,
  nextPage,
}) {
  return (
    <div className='flex flex-col gap-y-3 items-start'>
      <div>{getRowModel().rows.length} Rows</div>

      <div className='flex items-center gap-2'>
        <button className='border rounded p-1' onClick={() => setPageIndex(0)} disabled={!getCanPreviousPage()}>
          {'<<'}
        </button>
        <button className='border rounded p-1' onClick={() => previousPage()} disabled={!getCanPreviousPage()}>
          {'<'}
        </button>
        <button className='border rounded p-1' onClick={() => nextPage()} disabled={!getCanNextPage()}>
          {'>'}
        </button>
        <button
          className='border rounded p-1'
          onClick={() => setPageIndex(getPageCount() - 1)}
          disabled={!getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className='flex items-center gap-1'>
          <div>Page</div>
          <strong>
            {getState().pagination.pageIndex + 1} of {getPageCount()}
          </strong>
        </span>
        <span className='flex items-center gap-1'>
          | Go to page:
          <input
            type='number'
            defaultValue={getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              setPageIndex(page);
            }}
            className='border p-1 rounded w-16'
          />
        </span>
        <select
          value={getState().pagination.pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className='border h-8 rounded-md'
        >
          {RESULTS_COUNT.map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      <strong>Total results found: {getPrePaginationRowModel().rows.length}</strong>
    </div>
  );
}
