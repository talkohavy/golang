import React from 'react';

export default function AnchorLink({ children, url, title }) {
  return (
    <a
      href={url}
      target='_blank'
      rel='noreferrer'
      title={title}
      className='text-blue-600 hover:text-red-500 visited:text-blue-600'
    >
      {children}
    </a>
  );
}
