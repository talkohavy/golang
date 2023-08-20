import React from 'react';

export default function CardImage({ image, alt = '' }) {
  return (
    <img
      src={image.original}
      alt={alt}
      className='w-36 h-36 rounded object-cover border sm:w-44 sm:h-44'
      loading='lazy'
    />
  );
}
