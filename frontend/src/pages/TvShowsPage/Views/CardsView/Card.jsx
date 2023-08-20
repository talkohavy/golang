import React from 'react';
import CardDetails from './CardDetails';
import CardImage from './CardImage';

export default function Card({ image, name, type, language, runtime }) {
  return (
    <div className='flex items-start justify-between gap-2 border border-black cursor-pointer rounded-2xl h-56 px-5 py-6 col-span-12 md:col-span-6 lg:col-span-4 hover:bg-gray-200 active:bg-pink-200'>
      <CardImage image={image} />

      <CardDetails name={name} type={type} language={language} runtime={runtime} />
    </div>
  );
}
