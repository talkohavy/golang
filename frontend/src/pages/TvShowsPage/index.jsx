import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import Input from '../../components/Input';
import BasicTable from '../../components/tables/BasicTable';
import TableFooter from '../../components/tables/DefaultTableFooter';
import { COLUMNS, destructResponseData } from './helpers';

export default function TvShowsPage() {
  const tableRef = useRef(null);

  const [searchText, setSearchText] = useState('');
  const [tvShows, setTvShows] = useState([]);

  /** @type { import('../../components/tables/types').DefaultColumn } */
  const defaultColumn = useMemo(() => ({ enableSorting: true, enableResizing: false, meta: { align: 'left' } }), []);

  useEffect(() => {
    const fetchShows = async (page) =>
      axios.get(`https://api.tvmaze.com/${searchText ? `search/shows?q=${searchText}` : 'shows'}`, {
        params: { page },
      });

    fetchShows()
      .then(({ data }) => {
        const shouldDestructResponseData = data?.[0].show;
        setTvShows(shouldDestructResponseData ? destructResponseData(data) : data);
      })
      .catch((error) => console.log(error));
  }, [searchText]);

  return (
    <div className='flex flex-col gap-10 w-full p-10'>
      <Input
        value={searchText}
        setValue={setSearchText}
        placeholder='Search...'
        debounceTime={2000}
        className='h-10 border max-w-[320px] border-black rounded-md p-1 text-lg'
      />

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
    </div>
  );
}
