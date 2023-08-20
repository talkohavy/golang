import { createColumnHelper } from '@tanstack/react-table';

function destructResponseData(data) {
  return data.map((item) => ({ ...item.show, score: item.score }));
}

/** @type { import('@tanstack/react-table').ColumnHelper<{ name: string, type: string, language: string, runtime: number }> } */
const columnHelper = createColumnHelper();

const COLUMNS = [
  columnHelper.accessor('name', { header: 'Show name' }),
  columnHelper.accessor('type', { header: 'Type' }),
  columnHelper.accessor('language', { header: 'Language' }),
  columnHelper.accessor('runtime', { header: 'Runtime' }),
];

export { COLUMNS, destructResponseData };
