import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { createColumnHelper } from '@tanstack/react-table';
import AnchorLink from './AnchorLink';
import Input from './Input';
import PageHeader from './PageHeader';
import BasicTable from './tables/BasicTable';
import TableFooter from './tables/DefaultTableFooter';

/**
 * @type { import('@tanstack/react-table').ColumnHelper<
 *  {
 *    name: string,
 *    description: string,
 *    html_url: string,
 * }> }
 */
const columnHelper = createColumnHelper();

const COLUMNS = [
  columnHelper.accessor('name', { header: 'Name' }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: (cellData) => cellData.getValue() || 'No description...',
  }),

  columnHelper.accessor('html_url', {
    header: 'Url',
    cell: (cellData) => {
      const value = cellData.getValue();
      return <AnchorLink url={value} title={value}>{`${value.substring(0, 80)}...`}</AnchorLink>;
    },
  }),
];

function RepoList() {
  const tableRef = useRef(null);

  const [searchText, setSearchText] = useState('');
  const [repoList, setRepoList] = useState([]);

  /** @type { import('./tables/types').DefaultColumn } */
  const defaultColumn = useMemo(() => ({ enableSorting: true, enableResizing: false, meta: { align: 'left' } }), []);

  // TODO: - how do we fetch repositories from the API?
  useEffect(() => {
    const fetchRepos = async () => axios.get('http://localho1st:8000/repositories');

    fetchRepos()
      .then(({ data }) => setRepoList(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <PageHeader />
      <div className='my-0 mx-16'></div>

      <Input
        value={searchText}
        setValue={(e) => setSearchText(e.target.value)}
        placeholder='Search...'
        className='max-w-xs'
      />

      <BasicTable
        ref={tableRef}
        columnDefs={COLUMNS}
        rowData={repoList}
        defaultColumn={defaultColumn}
        rowSelectionMode='multi'
        searchText={searchText}
        setSearchText={setSearchText}
        renderTableFooter={(props) => <TableFooter {...props} />}
      />
    </>
  );
}

export default RepoList;
