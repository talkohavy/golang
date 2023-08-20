import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { createColumnHelper } from '@tanstack/react-table';
import AnchorLink from '../../components/AnchorLink';
import Input from '../../components/Input';
import BasicTable from '../../components/tables/BasicTable';
import TableFooter from '../../components/tables/DefaultTableFooter/index';
import PageHeader from './PageHeader';

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

  /** @type { import('../../components/tables/types').DefaultColumn } */
  const defaultColumn = useMemo(() => ({ enableSorting: true, enableResizing: false, meta: { align: 'left' } }), []);

  // TODO: - how do we fetch repositories from the API?
  useEffect(() => {
    const fetchRepos = async () => axios.get('http://localhost:8000/repositories');

    fetchRepos()
      .then(({ data }) => setRepoList(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className='flex flex-1 flex-col p-10 gap-y-5'>
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
    </div>
  );
}

export default RepoList;
