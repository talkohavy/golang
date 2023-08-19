import React from 'react';
import clsx from 'clsx';

export default function Input({ type = 'text', value, setValue, placeholder = undefined, className = undefined }) {
  return (
    <input
      type={type}
      value={value}
      onChange={setValue}
      placeholder={placeholder}
      className={clsx('w-full h-10 border border-black rounded-md px-1', className)}
    />
  );
}
