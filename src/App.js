import './App.css';
import React, { createContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Root from './layout/Root';
import Home from './pages/Home';

export const createIsLoggedContext = createContext();

function App() {
  const [account, setAccount] = useState(null);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='' element={<Root />}>
        <Route path='/login' element={!account ? <Login /> : <Navigate to='/home' />} />
        <Route path='/register' element={!account ? <Register /> : <Navigate to='/home' />} />
        <Route path='/home' element={account ? <Home /> : <Navigate to='/login' />} />
      </Route>
    )
  );

  return (
    <createIsLoggedContext.Provider value={{ account, setAccount }}>
      <div className='App'>
        <RouterProvider router={router} />
      </div>
    </createIsLoggedContext.Provider>
  );
}

export default App;
