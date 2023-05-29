import React from 'react';

import './Input.scss';

export default function Input({ id, name, type, placeholder, error, onChange, value }) {
  console.log('error:', error);
  return (
    <div>
      <input
        className={`input ${error ? 'input-error' : ''} `}
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {error ? <p className='error'>{error}</p> : ''}
    </div>
  );
}
