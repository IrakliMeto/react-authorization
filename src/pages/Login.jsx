import React, { useContext, useState } from 'react';

import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import { validateLogin } from '../validate/ValidateLogin';
import Input from '../components/Input';
import { createIsLoggedContext } from '../App';

export default function Login() {
  const [errorMessage, setErrorMessage] = useState(false);

  const isLoggedContext = useContext(createIsLoggedContext);

  const navigate = useNavigate();

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
          setErrorMessage(false);
          navigate('/react-authorization/home', { replace: true });
          isLoggedContext.setAccount(accountMatch);
        } else {
          setErrorMessage(true);
          isLoggedContext.setAccount(null);
        }
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
        error={formik.errors.email}
      />

      <Input
        name={'password'}
        id={'login-password'}
        type={'password'}
        placeholder={'password'}
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />

      {errorMessage && <p>Email Or Password isnot correct</p>}

      <input type='submit' value='Submit' />
    </form>
  );
}
