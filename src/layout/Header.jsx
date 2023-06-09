import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';
import { createIsLoggedContext } from '../App';

export default function Header() {
  const isLoggedContext = useContext(createIsLoggedContext);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    isLoggedContext.setAccount(null);
  };

  return (
    <header>
      <nav className='navigation'>
        {isLoggedContext.account ? null : (
          <>
            <Link to='/react-authorization/login'>Login</Link>
            <Link to='/react-authorization/register'>Register</Link>
          </>
        )}

        {isLoggedContext.account ? (
          <button className='logout' onClick={handleLogout}>
            Log out
          </button>
        ) : null}
      </nav>
    </header>
  );
}
