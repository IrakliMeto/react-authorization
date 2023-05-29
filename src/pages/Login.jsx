import React, { useContext, useState, useLayoutEffect } from 'react';

import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import { validateLogin } from '../validate/ValidateLogin';
import Input from '../components/Input';
import { createIsLoggedContext } from '../App';

import './Form.scss';

export default function Login() {
  const [errorMessage, setErrorMessage] = useState(false);

  const isLoggedContext = useContext(createIsLoggedContext);

  const navigate = useNavigate();

  useLayoutEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      isLoggedContext.setAccount(parsedUser);
      navigate('/react-authorization/home');
    } else {
      navigate('/react-authorization/login');
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: validateLogin,

    onSubmit: (values) => {
      const formData = Cookies.get('formData');

      if (formData) {
        const parsedFormData = JSON.parse(formData);
        const accountMatch = parsedFormData.find((item) => {
          return values.email === item.email && values.password === item.password;
        });

        if (accountMatch) {
          console.log('jemala');

          setErrorMessage(false);
          navigate('/react-authorization/home');

          localStorage.setItem('loggedInUser', JSON.stringify(accountMatch));
          isLoggedContext.setAccount(accountMatch);
        } else {
          isLoggedContext.setAccount(null);
          setErrorMessage(true);
        }
      } else {
        isLoggedContext.setAccount(null);
        setErrorMessage(true);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        name={'email'}
        id={'login-email'}
        type={'email'}
        placeholder={'email address'}
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email || errorMessage}
      />

      <Input
        name={'password'}
        id={'login-password'}
        type={'password'}
        placeholder={'password'}
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password || errorMessage}
      />

      {errorMessage && <p className='error'>Email or Password is not correct</p>}

      <input className='submit' type='submit' value='Submit' />
    </form>
  );
}
