import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { destructResponseData } from './helpers';
import TableView from './TableView';

const viewOptions = [
  { value: 'table', label: 'Table' },
  { value: 'cards', label: 'Cards' },
];

const viewRenderer = {
  table: (props) => <TableView {...props} />,
  cards: (props) => <TableView {...props} />,
};

export default function TvShowsPage() {
  const [viewType, setViewType] = useState(viewOptions[0].value);
  const [searchText, setSearchText] = useState('');
  const [tvShows, setTvShows] = useState([]);

  console.log('viewType is:', viewType);

  useEffect(() => {
    const fetchShows = async (page) =>
      axios.get(`https://api.tvmaze.com/${searchText ? `search/shows?q=${searchText}` : 'shows'}`, {
        params: { page },
      });

    // DO NOT initiate search for 1 letter! Only start searching from 2 letters up.
    if (searchText && searchText.length < 2) return;

    fetchShows()
      .then(({ data }) => {
        const shouldDestructResponseData = data?.[0].show;
        setTvShows(shouldDestructResponseData ? destructResponseData(data) : data);
      })
      .catch((error) => console.log(error));
  }, [searchText]);

  return (
    <div className='flex flex-col gap-10 w-full p-10'>
      <div className='flex items-center justify-between'>
        <Input
          value={searchText}
          setValue={setSearchText}
          placeholder='Search...'
          debounceTime={600}
          className='h-10 border max-w-[320px] border-black rounded-md p-1 text-lg'
        />

        <Select
          value={viewType}
          setValue={(e) => setViewType(e.target.value)}
          options={viewOptions}
          className='w-36 !h-10 border-black'
        />
      </div>

      {viewRenderer[viewType]({ tvShows })}
    </div>
  );
}
