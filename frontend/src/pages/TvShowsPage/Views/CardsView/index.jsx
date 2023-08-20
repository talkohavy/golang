import React from 'react';
import Card from './Card';

export default function CardsView({ tvShows }) {
  return (
    <div className='flex justify-center items-center'>
      <div className='grid grid-cols-12 gap-4 lg:max-w-7xl'>
        {tvShows.map((item, i) => (
          <Card key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
