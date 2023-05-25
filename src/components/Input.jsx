import React from 'react';

import './Input.scss';

export default function Input({ id, name, type, placeholder, error, onChange, value }) {
  return (
    <div>
      <input
        className={`${error ? 'input-error' : ''} `}
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
