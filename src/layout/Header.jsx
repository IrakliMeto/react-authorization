import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';
import { createIsLoggedContext } from '../App';

export default function Header() {
  const isLoggedContext = useContext(createIsLoggedContext);

  return (
    <header>
      <nav className='navigation'>
        {isLoggedContext.account ? null : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
