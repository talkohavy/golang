import React from 'react';

export default function CardDetails({ name, type, language, runtime }) {
  return (
    <div className='flex flex-col gap-y-2 text-base w-1/2'>
      <div>
        <strong>Name: </strong>
        <span>{name}</span>
      </div>

      <div>
        <strong>Type: </strong>
        <span>{type}</span>
      </div>

      <div>
        <strong>Language: </strong>
        <span>{language}</span>
      </div>

      <div>
        <strong>Runtime: </strong>
        <span>{runtime}</span>
      </div>
    </div>
  );
}
