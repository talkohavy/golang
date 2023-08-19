import React from 'react';

export default function MainWindow({ children }) {
  return (
    <div className='relative flex justify-center items-start overflow-x-hidden h-[calc(100%-160px)]'>{children}</div>
  );
}
