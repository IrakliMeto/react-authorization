import './App.css';
import React, { createContext, useState } from 'react';
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
      <Route path='/react-authorization' element={<Root />}>
        <Route
          path='/react-authorization/login'
          element={!account ? <Login /> : <Navigate to='/react-authorization/home' />}
        />
        <Route
          path='/react-authorization/register'
          element={!account ? <Register /> : <Navigate to='/react-authorization/home' />}
        />
        <Route
          path='/react-authorization/home'
          element={account ? <Home /> : <Navigate to='/react-authorization/login' />}
        />
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
