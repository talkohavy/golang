import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';

export default function IndeterminateCheckbox({ indeterminate, className = '', checked, ...rest }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      inputRef.current.indeterminate = !checked && indeterminate;
    }
  }, [indeterminate, checked]);

  return (
    <input ref={inputRef} type='checkbox' checked={checked} className={clsx('cursor-pointer', className)} {...rest} />
  );
}
