import React from 'react';
import Select from '../../Select';
import DefaultTableFooterButton from './DefaultTableFooterButton';

const RESULT_COUNT_OPTIONS = [
  { key: 1, value: 10, label: 'Show 10' },
  { key: 2, value: 20, label: 'Show 20' },
  { key: 3, value: 50, label: 'Show 50' },
  { key: 4, value: Number.MAX_SAFE_INTEGER, label: 'Show all' },
];

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
        <DefaultTableFooterButton text={'<<'} onClick={() => setPageIndex(0)} isDisabled={!getCanPreviousPage()} />
        <DefaultTableFooterButton text={'<'} onClick={previousPage} isDisabled={!getCanPreviousPage()} />
        <DefaultTableFooterButton text={'>'} onClick={nextPage} isDisabled={!getCanNextPage()} />
        <DefaultTableFooterButton
          text={'>>'}
          onClick={() => setPageIndex(getPageCount() - 1)}
          isDisabled={!getCanNextPage()}
        />

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
              setPageIndex(Math.max(page, 0));
            }}
            className='border p-1 rounded w-16 hover:border-blue-400 focus:border-blue-600'
          />
        </span>

        <Select
          value={getState().pagination.pageSize}
          setValue={(e) => {
            const pageSize = Number(e.target.value);
            setPageSize(isNaN(pageSize) ? Number.MAX_SAFE_INTEGER : pageSize);
          }}
          options={RESULT_COUNT_OPTIONS}
        />
      </div>

      <strong>Total results found: {getPrePaginationRowModel().rows.length}</strong>
    </div>
  );
}
