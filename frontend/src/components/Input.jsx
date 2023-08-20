import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { wrapInDebounce } from '../utils/wrapInDebounce';

/**
 * @param {{
 *    value: any,
 *    setValue: (value) => void,
 *    placeholder?: string,
 *    debounceTime?: number,
 *    className?: string,
 * }} props
 */
export default function Input({ value: outerValue, setValue, placeholder, debounceTime, className, ...props }) {
  const [innerValue, setInnerValue] = useState(() => outerValue);

  useEffect(() => {
    setInnerValue(outerValue);
  }, [outerValue]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setOuterValue = useCallback(debounceTime ? wrapInDebounce(setValue, debounceTime) : setValue, [
    debounceTime,
    setValue,
  ]);

  return (
    <input
      {...props}
      value={innerValue}
      placeholder={placeholder}
      onChange={(e) => {
        setInnerValue(e.target.value);
        setOuterValue(e.target.value);
      }}
      className={clsx('w-full h-10 border border-black rounded-md px-1', className)}
    />
  );
}
