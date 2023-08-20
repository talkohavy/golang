import React from 'react';
import Button from '../../../components/Button';

export default function DefaultTableFooterButton({ onClick, isDisabled, text }) {
  return (
    <Button
      className='border rounded p-1 hover:bg-slate-200 active:bg-slate-300'
      onClick={onClick}
      isDisabled={isDisabled}
    >
      {text}
    </Button>
  );
}
