import React from 'react';
import clsx from 'clsx';

export default function Select({ value, setValue, options, placeholder = '', className = undefined }) {
  return (
    <select
      value={value}
      onChange={setValue}
      className={clsx('border h-8 rounded-md', className)}
      placeholder={placeholder}
    >
      {options.map(({ key, value, label }) => (
        <option key={key ?? value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
