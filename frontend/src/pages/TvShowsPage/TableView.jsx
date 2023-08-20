import React, { useMemo, useRef } from 'react';
import BasicTable from '../../components/tables/BasicTable';
import TableFooter from '../../components/tables/DefaultTableFooter';
import { COLUMNS } from './helpers';

export default function TableView({ tvShows }) {
  const tableRef = useRef(null);
  /** @type { import('../../components/tables/types').DefaultColumn } */
  const defaultColumn = useMemo(() => ({ enableSorting: true, enableResizing: false, meta: { align: 'left' } }), []);

  return (
    <BasicTable
      ref={tableRef}
      columnDefs={COLUMNS}
      rowData={tvShows}
      defaultColumn={defaultColumn}
      rowSelectionMode='multi'
      renderTableFooter={(props) => <TableFooter {...props} />}
      className='items-start justify-center'
      // onBottomReached={throttledFetch}
      // isFetching={tvShowsLoading}
    />
  );
}
