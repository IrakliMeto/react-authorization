import React, { useContext } from 'react';

import { createIsLoggedContext } from '../App';

export default function Home() {
  const AccountContext = useContext(createIsLoggedContext);

  return (
    <div>
      <h1>Information</h1>

      <p>Name :{AccountContext.account.firstName}</p>
      <p>Surname: {AccountContext.account.lastName}</p>
      <p>email: {AccountContext.account.email}</p>
    </div>
  );
}
